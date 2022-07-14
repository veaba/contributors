
// 1. get the repo's contributors list
// 2. generate svg
// 3. save to local
// 4. 根据仓库地址，会保存头像在本地，如果通过actions 触发后，通过对比，本地存在头像则不会再更新
// 4.1 第4点中，bug：如果用户更新，则还是旧头像。出现用户头像，除非用头像生成 md5 存储作为指纹
// import { http } from 'node:http'

import { readMD5, getByteLen } from './utils'
import { writeFile } from 'node:fs/promises';
import { chunk } from 'lodash';
import { Buffer } from 'node:buffer'
import { svgStart, svgEnd, svgBlock } from './svg';
import { listTen } from './mock'
import { UserItem } from './types';

import config from '../config'

interface TypesContributors {
  repo: string;
}

// global constants
export const SVG_WIDTH = 800;
export const SVG_HEIGHT = 1518;
export const FONT_SIZE = 10
export const BASE_SIZE = 50
export const OUT_SIZE = FONT_SIZE + BASE_SIZE
// 一行多少个
const ONE_ROW_MAX = Math.ceil(SVG_WIDTH / (FONT_SIZE + OUT_SIZE))

console.log('ONE_ROW_MAX=>', ONE_ROW_MAX)

const getContributorsList = (params: TypesContributors) => {

}

// God      => 如何计算居中
// 啊哈哈哈  => 何计算居中
// TODO 根据文字计算长度=> getByteLen
// TODO 横向有多少个
// TODO 头像长度==>
const generateSVG = (userList: UserItem[]) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 1518" width="800" height="1518">

  <a xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://github.com/veaba" class="sponsorkit-link" target="_blank" id="withastro">
    <image x="0" y="0" width="100" height="100" xlink:href="https://avatars.githubusercontent.com/u/8652596?s=64&amp;v=4"/>
    <text x="50" y="120" text-anchor="middle" class="sponsorkit-name" fill="currentColor">veaba</text>
  </a>
  <a xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://github.com/veaba1" class="sponsorkit-link" target="_blank" id="withastro">
    <image x="110" y="0" width="100" height="100" xlink:href="https://avatars.githubusercontent.com/u/8652596?s=64&amp;v=4"/>
    <text x="160" y="120" text-anchor="middle" class="sponsorkit-name" fill="currentColor">哈哈哈哈sadasd</text>
  </a>

  <a xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://github.com/veaba1" class="sponsorkit-link" target="_blank" id="withastro">
    <image x="220" y="0" width="100" height="100" xlink:href="https://avatars.githubusercontent.com/u/8652596?s=64&amp;v=4"/>
    <text x="290" y="120" text-anchor="middle" class="sponsorkit-name" fill="red">God</text>
  </a>
</svg>`
}

const generateUserListSVG = (userList: UserItem[]) => {

  let userBlockData = ''

  // split => Two dimensional array 
  let splitList: UserItem[] | UserItem[][] = userList

  if (userList.length > ONE_ROW_MAX) {
    // how many row 
    // const row = Math.ceil(userList.length / ONE_ROW_MAX)
    // split new array
    splitList = chunk(userList, ONE_ROW_MAX) // row = 3? len = 10? [[3],[3],[3],[1]]
  }

  console.log(splitList)

  // TODO 处理折行问题？
  splitList.forEach((item: UserItem[] | UserItem, xIndex: number) => {
    if (Array.isArray(item)) {
      item.forEach((child, yIndex) => {
        const childBlock = svgBlock(child, xIndex, yIndex)
        userBlockData += childBlock
      })
    } else {
      // BUG =? 当过小时候计算错误
      item.author =xIndex+'-a'
      const currentBlock = svgBlock(item, 0, xIndex)  // ? BUG? 文字和图片对不齐了
      userBlockData += currentBlock
    }
  })

  return `${svgStart()}
  ${userBlockData}
  ${svgEnd()}
  `
}

// 递归处理
// const recursivelyHandleData = (list) =>{
//   list.forEach((item, xIndex) => {
//     if (Array.isArray(item)) {
//       item.forEach((child, yIndex) => {

//       })
//     } else {
//       const currentBlock = svgBlock(item, xIndex, yIndex = 0)
//       userBlockData += currentBlock
//     }
//   })
// }

const generateAvatarMD5Log = () => {

}

const saveSVG = async (filename: string) => {

  try {
    const controller = new AbortController();
    const { signal } = controller;
    const svgStr = generateUserListSVG(listTen)
    // const svgStr = generateSVG()
    // const data = new Uint8Array(Buffer.from(svgStr))
    console.log('一行有多少个=>', ONE_ROW_MAX)

    const promiseWrite = writeFile(filename, svgStr, { encoding: 'utf-8' })
    controller.abort();

    await promiseWrite;
  }
  catch (error) {

  }
}

const needUpdateUserAvatar = () => {

}


saveSVG('vuejs1.svg')


