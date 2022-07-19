import axios from "axios"

import { createWriteStream } from 'node:fs'
import { resolve } from 'path'
import { MD5Item, UserConfig, UserItem } from "./types"
import { sortBy } from 'lodash'
import { data } from '../../tests/mock'
import { getTotalList, getOwnerRepo, readMD5 } from "./utils"




/**
 * get contributors avatar to public/avatars
 * 
 * 1、TODO check local has been save ?
 * 
 * 2、TODO 通过存在，则通过 md5 判断，一致则略过
 * 
 * 3、TODO 不一致则拉取
 * 
 * 4、TODO if not, get remote data and save to public/avatars
 * 
 * 5、TODO 存储一份本地 avatars 映射的 md5 list
 * 
*/
export const getRepoData = async (repoKey: string, repoConfig: UserConfig): Promise<UserItem[]> => {
  const { owner, repo } = getOwnerRepo(repoKey)

  let repData = []
  try {
    const resp = await axios.get(`http://api.github.com/repos/${repoKey}/stats/contributors`)
    if (resp?.data) {
      repData = resp.data || []
    }
  } catch (err) {
    console.error('get repo stats contributors err=>')
  }
  repData = getTotalList(data, repoConfig)

  const sortList = sortBy(repData, (item) => -item.total)
  return sortList
}


export const downloadAvatar = async (userItem: UserItem) => {
  try {
    const resp = await axios.get(`https://avatars.githubusercontent.com/u/${userItem.id}?v=4`, {
      responseType: "stream"
    })

    if (resp?.status === 200) {
      const writer = createWriteStream(resolve(__dirname, `../public/avatars/${userItem.id}.jpg`),)
      resp.data.pipe(writer)
      return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
      })
    }
  } catch (err) {
    console.error('err=>', err)
  }
}
