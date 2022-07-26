// import config from '../../config'
// import { resolve } from 'path'
// import { saveSVG } from './app';
// import { writeFile, access } from "node:fs/promises" // access
// import { downloadAvatar, getRepoData } from './github';
// import { MD5Item, UserItem } from '../types';
// // import { isHasFile, readMD5 } from "../utils"
//
// import md5JSON from '../../public/avatars/avatarsMD5.json'
//
// const md5s: any = md5JSON
//
// interface TypesContributors {
//   repo: string;
// }
//
// const updateAvatars = async (sortList: UserItem[]) => {
//   await Promise.all(sortList.map(async userItem => {
//
//     const isHas = await isHasFile(resolve(__dirname, `../public/avatars/${userItem.id}.jpg`))
//     if (!isHas) {
//       return await downloadAvatar(userItem)
//     }
//   }))
// }
//
// // export const serverStart = async () => {
// //   const now = Date.now()
// //   console.log('开始=>', new Date())
// //
// //   console.time('task=>')
// //   const repos = Object.keys(config)
// //   // const reposConfigs = Object.values(config)
// //
// //   await Promise.all(repos.map(async repo => {
// //     const repoConfig = config[repo]
// //     const repoList = await getRepoData(repo, repoConfig)
// //     await updateAvatars(repoList)
// //     await saveSVG(repo, repoList)
// //   }))
// //
// //   console.timeEnd('task=>')
// //   console.log('结束=>', new Date(), Date.now() - now)
// //
// // }
//
// // serverStart()
