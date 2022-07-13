
// 1. get the repo's contributors list
// 2. generate svg
// 3. save to local
// 4. 根据仓库地址，会保存头像在本地，如果通过actions 触发后，通过对比，本地存在头像则不会再更新
// 4.1 第4点中，bug：如果用户更新，则还是旧头像。出现用户头像，除非用头像生成 md5 存储作为指纹
// import { http } from 'node:http'

import { readMD5, getByteLen } from './utils'
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer'

interface TypesContributors {
  repo: string;
}

const getContributorsList = (params: TypesContributors) => {

}

// God      => 如何计算居中
// 啊哈哈哈  => 何计算居中
// TODO 根据文字计算长度=> getByteLen
// TODO 横向有多少个
// TODO 头像长度==>
const generateSVG = () => {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 1518" width="800" height="1518">
  <style>
    .sponsorkit-name{
      border: 1px solid red;
    }
  </style>
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

const generateAvatarMD5Log = () => {

}

const saveSVG = async (filename: string) => {

  try {
    const controller = new AbortController();
    const { signal } = controller;
    const svgStr = generateSVG()
    const data = new Uint8Array(Buffer.from(svgStr))

    console.log('data=>', data)

    const promiseWrite = writeFile(filename, svgStr, { encoding: 'utf-8' })
    controller.abort();

    await promiseWrite;
  }
  catch (error) {

  }
}

const needUpdateUserAvatar = () => {

}


saveSVG('vuejs.svg')


