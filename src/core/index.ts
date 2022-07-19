import config from '../../config'
import { resolve } from 'path'
import { saveSVG } from './app';
import { writeFile, access } from "node:fs/promises" // access
import { downloadAvatar, getRepoData } from './github';
import { MD5Item, UserItem } from './types';
import { isHasFile, readMD5 } from "./utils"

import md5JSON from '../../public/avatars/avatarsMD5.json'

const md5s: any = md5JSON

interface TypesContributors {
  repo: string;
}

const updateAvatars = async (sortList: UserItem[]) => {
  await Promise.all(sortList.map(async userItem => {

    const isHas = await isHasFile(resolve(__dirname, `../public/avatars/${userItem.id}.jpg`))
    if (!isHas) {
      return await downloadAvatar(userItem)
    }
    // const md5Item: MD5Item = md5s[userItem.id] || {}
    // const filename = md5Item.filename || userItem.id + '.jpg'
    // let { md5 } = md5Item
    // TODO 开销较大，暂时移除
    // if (md5) {
    //   // const readAvatarMD5 = await readMD5(filename)
    //   // // 两个 md5 不相等，需要 download 文件，并更改 md5 的值
    //   // if (readAvatarMD5 !== md5) {
    //   //   md5 = readAvatarMD5
    //   //   await downloadAvatar(userItem)
    //   //   md5Item.md5 = readAvatarMD5
    //   //   const buffer = Buffer.from(JSON.stringify(md5s));
    //   //   await writeFile(resolve(__dirname, `../public/avatars/avatarsMD5.json`), buffer, 'utf-8')
    //   // }
    //   return Promise.resolve()
    // } else {
    //   md5s[userItem.id] = {
    //     filename: `${userItem.id}.jpg`,
    //     md5: await readMD5(filename)
    //   }
    //   await downloadAvatar(userItem)
    //   const buffer = Buffer.from(JSON.stringify(md5s));
    //   await writeFile(resolve(__dirname, `../public/avatars/avatarsMD5.json`), buffer, 'utf-8')
    //   return Promise.resolve()
    // }
  }))
}

export const serverStart = async () => {
  const now = Date.now()
  console.log('开始=>', new Date())

  console.time('task=>')
  const repos = Object.keys(config)
  // const reposConfigs = Object.values(config)

  await Promise.all(repos.map(async repo => {
    const repoConfig = config[repo]
    const repoList = await getRepoData(repo, repoConfig)
    await updateAvatars(repoList)
    await saveSVG(repo, repoList)
  }))

  console.timeEnd('task=>')
  console.log('结束=>', new Date(), Date.now() - now)


}

serverStart()
