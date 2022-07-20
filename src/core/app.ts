
// 1. get the repo's contributors list
// 2. generate svg
// 3. save to local
// 4. 根据仓库地址，会保存头像在本地，如果通过actions 触发后，通过对比，本地存在头像则不会再更新
// 4.1 第4点中，bug：如果用户更新，则还是旧头像。出现用户头像，除非用头像生成 md5 存储作为指纹
// import { http } from 'node:http'

import { writeFile } from 'node:fs/promises';
import { chunk } from 'lodash';
import { svgStart, svgEnd, asyncHandleUsersSVG, asyncHandlerUserDefsSVG } from './svg';
import { listTen } from '../../tests/mock'
import { UserConfig, UserItem } from '../types';
import { getOwnerRepo } from '../utils';

import config from '../../config'
import console from 'node:console';

// global constants
const SVG_WIDTH = 800;
const SVG_HEIGHT = 370;
const FONT_SIZE = 0
const BASE_SIZE = 100

const generateUserListSVG = async (userList: UserItem[], config: UserConfig) => {

  // split => two dimensional array
  let splitList: UserItem[] | UserItem[][] = userList

  const svgWidth = config.width || SVG_WIDTH
  const svgHeight = config.height || SVG_HEIGHT
  const baseSize = config.size || BASE_SIZE
  const fontSize = config.fontSize || FONT_SIZE

  const isRadius = config.isRadius !== false // default need radius => 50%;
  const outSize = fontSize + baseSize
  const oneRowMax = Math.floor(svgWidth / outSize)

  // split new array
  if (userList.length > oneRowMax) {
    splitList = chunk(userList, oneRowMax)
  }

  const svgConfig = {
    baseSize,
    fontSize,
    oneRowMax,
    outSize,
    svgWidth,
    svgHeight,
    isRadius,
  }

  // radius
  if (config.isRadius === undefined || config.isRadius === true) {
    return `${svgStart(svgWidth, svgHeight)}
  <defs>
  ${await asyncHandlerUserDefsSVG(splitList, svgConfig)}

  </defs>
${await asyncHandleUsersSVG(splitList, svgConfig)}
${svgEnd()}
    `
  } else if (config.isRadius === false) {
    const userBlockData = await asyncHandleUsersSVG(splitList, svgConfig)
    return `${svgStart(svgWidth, svgHeight)}
    ${userBlockData}
${svgEnd()}
    `
  }
  return ''
}

export const saveSVG = async (ownerRepo: string, repoUserList: UserItem[]) => {
  console.log('saveSVG=>', ownerRepo, repoUserList.length)
  const { owner, repo } = getOwnerRepo && getOwnerRepo(ownerRepo) || {}
  if (!owner || !repo) {
    console.error('Invalid repo address:', ownerRepo)
    return
  }

  const userConfig: UserConfig = config[ownerRepo]
  try {
    // const controller = new AbortController();
    const svgStr = await generateUserListSVG(repoUserList, userConfig)

    const filename = `./repos/${owner}/${repo}.svg`
    await writeFile(filename, svgStr, { encoding: 'utf-8' })
  } catch (error) {
    console.error('err=>', error)
  }
}

// saveSVG('veaba/contributors',listTen)
// saveSVG('vuejs-translations/docs-zh-cn',listTen)
