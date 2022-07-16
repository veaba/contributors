
// 1. get the repo's contributors list
// 2. generate svg
// 3. save to local
// 4. 根据仓库地址，会保存头像在本地，如果通过actions 触发后，通过对比，本地存在头像则不会再更新
// 4.1 第4点中，bug：如果用户更新，则还是旧头像。出现用户头像，除非用头像生成 md5 存储作为指纹
// import { http } from 'node:http'

import { writeFile } from 'node:fs/promises';
import { chunk } from 'lodash';
import { svgStart, svgEnd, asyncHandleUsersSVG } from './svg';
import { listTen } from '../../tests/mock'
import { UserConfig, UserItem } from './types';
import { getOwnerRepo } from './utils';

import config from '../../config'

interface TypesContributors {
  repo: string;
}

// global constants
const SVG_WIDTH = 800;
const SVG_HEIGHT = 370;
const FONT_SIZE = 0
const BASE_SIZE = 100
// const OUT_SIZE = FONT_SIZE + BASE_SIZE
// const ONE_ROW_MAX = Math.floor(SVG_WIDTH / OUT_SIZE) // max of one row

const getContributorsList = (params: TypesContributors) => {

}

const needUpdateUserAvatar = () => {

}

const generateAvatarMD5Log = () => {

}

const generateUserListSVG = async (userList: UserItem[], config: UserConfig) => {

  // split => two dimensional array 
  let splitList: UserItem[] | UserItem[][] = userList

  const svgWidth = config.width || SVG_WIDTH
  const svgHeight = config.height || SVG_HEIGHT
  const baseSize = config.size || BASE_SIZE
  const fontSize = config.fontSize || FONT_SIZE

  const outSize = fontSize + baseSize
  const oneRowMax = Math.floor(svgWidth / outSize)

  // split new array
  if (userList.length > oneRowMax) {
    splitList = chunk(userList, oneRowMax)
  }

  const userBlockData = await asyncHandleUsersSVG(splitList, {
    baseSize,
    fontSize,
    oneRowMax,
    outSize,
    svgWidth,
    svgHeight
  })

  return `${svgStart(svgWidth, svgHeight)}
  ${userBlockData}
  ${svgEnd()}
  `
}

const saveSVG = async (ownerRepo: string) => {

  const { owner, repo } = getOwnerRepo && getOwnerRepo(ownerRepo) || {}
  if (!owner || !repo) {
    console.error('Invalid repo address:', ownerRepo)
    return
  }

  const options: UserConfig = config[ownerRepo]

  try {
    const controller = new AbortController();
    const svgStr = await generateUserListSVG(listTen, options)
    const filename = `./repos/${owner}/${repo}.svg`
    const promiseWrite = writeFile(filename, svgStr, { encoding: 'utf-8' })
    controller.abort();
    await promiseWrite;
  }
  catch (error) {
    console.error('err=>', error)
  }
}


const ownerRepo = 'veaba/contributors';
saveSVG(ownerRepo)


