import axios from "axios"
import { access } from "node:fs/promises"
import { constants } from 'fs'
import { resolve } from 'path'
import { MD5Item, UserConfig, UserItem } from "./types"
import { sortBy } from 'lodash'
import { data } from '../../tests/mock'
import { getTotalList, readMD5 } from "./utils"
import md5JSON from '../../public/avatars/avatarsMD5.json'


const md5s: any = md5JSON

// https://api.github.com/repos/vuejs-translations/docs-zh-cn/stats/contributors
export const getRepoData = async (repoKey: string, repoConfig: UserConfig) => {
  // const { owner, repo } = getOwnerRepo(repoKey)
  // const resData = await 

  let repData = []
  // try {
  //   const resp = await axios.get(`http://api.github.com/repos/${repoKey}/stats/contributors`)
  //   if (resp?.data){
  //     repData = resp.data ||[]
  //   }
  // }catch(err){
  //   console.error('err=>',err)
  // // }
  // repData = getTotalList(data, repoConfig)

  // const sortList = sortBy(repData, (item) => -item.total)
  // console.log('repData=>', sortList)

  // get contributors avatar to public/avatars

  // 1、TODO check local has been save ?

  // 2、TODO 通过存在，则通过 md5 判断，一致则略过

  // 3、TODO 不一致则拉去

  // 4、TODO if not, get remote data and save to public/avatars

  // 5、TODO 存储一份本地 avatars 映射的 md5 list


  // console.log('repoData=>', resData)

  const sortList = [
    {
      total: 2,
      author: 'veaba',
      avatar: 'https://avatars.githubusercontent.com/u/8652596?v=4',
      id: 8652596
    }
  ]
  await Promise.all(sortList.map(async item => {
    const accessPath = resolve(__dirname, `../public/avatars/${item.id}.jpg`)
    console.log('accessPath=>', accessPath)
    let checkAvatar = false;
    // try {
    //   await access(accessPath, constants.F_OK)
    //   checkAvatar = true
    // } catch (readErr) {
    //   console.error('readErr=>', readErr)
    // }


    const md5Item: MD5Item = md5s[item.id] || {}
    const { filename } = md5Item
    let { md5 } = md5Item
    if (md5) {
      const readAvatarMD5 = await readMD5(filename)
      // 两个 md5 不相等，需要 download 文件，并更改 md5 的值
      if (readAvatarMD5 !== md5) {
        md5 = readAvatarMD5

        // TODO download 
      }
    } else {
      await downloadAvatar(item)
    }
    console.log('==>',)



    // if (checkAvatar) {
    //   console.info('文件存在=>')

    //   // const md5 = await readMD5(item.id)
    //   console.log('md5=>', md5)
    //   console.log('md5JSON=>', md5JSON)

    //   // TODO
    // } else {
    //   console.info('文件不存在=>')
    // }


  }))
}

// TODO
export const downloadAvatar = async (userItem: UserItem) => {
  //   try {
  //   const resp = await axios.get(`http://api.github.com/repos/${repoKey}/stats/contributors`)
  //   if (resp?.data){
  //     repData = resp.data ||[]
  //   }
  // }catch(err){
  //   console.error('err=>',err)
  // // }
  
  // download 文件
}