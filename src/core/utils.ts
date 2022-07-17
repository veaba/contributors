import crypto from 'crypto'
import fs from 'fs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'path'
import { GithubContributorItem, OwnerRepoItem, SvgConfig, TotalMap, UserConfig } from './types';


// TODO
export const readMD5 = async (filename) => {
  const avatarPath = resolve(__dirname, `../public/avatars/${filename}`)
  const buffer1 = await readFile(avatarPath, 'utf-8');
  const hash = crypto.createHash('md5');
  hash.update(buffer1, 'utf8');
  const md5 = hash.digest('hex');
  return md5
}

export const getByteLen = (value: string) => {
  let len = 0;
  for (let i = 0; i < value.length; i++) {
    const doubleLang = value.charAt(i);

    // is chinese
    if (doubleLang.match(/[^\x00-\xff]/ig) != null) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}

/**
 * Automatic center filling
 * @param {number} childrenLen
 * @param {SvgConfig} svgConfig
 * 
*/
export const autoCenter = (childrenLen: number, svgConfig: SvgConfig) => {
  const { svgWidth, outSize } = svgConfig
  if (childrenLen * outSize < svgWidth) {
    const autoToCenterX = (svgWidth - outSize * childrenLen) / 2
    return autoToCenterX
  }
  return 0
}

export const getImageX = (yIndex: number, svgConfig: SvgConfig) => {
  const { outSize } = svgConfig
  return outSize * yIndex
}

export const getImageY = (xIndex: number, svgConfig: SvgConfig) => {
  const { baseSize, fontSize } = svgConfig
  return (baseSize + fontSize * 2) * xIndex
}

export const getTextX = (yIndex: number, svgConfig: SvgConfig) => {
  const { baseSize, outSize } = svgConfig
  return (baseSize / 2) + outSize * yIndex
}

export const getTextY = (xIndex: number, svgConfig: SvgConfig) => {
  const { outSize, fontSize } = svgConfig
  return (outSize) * (xIndex + 1) + (xIndex * fontSize)
}


export const getOwnerRepo = (ownerRepo: string): OwnerRepoItem => {
  const ownerRepoSplit = ownerRepo.split('/')
  if (ownerRepoSplit.length && ownerRepoSplit.length === 2) {
    const [owner = '', repo = ''] = ownerRepoSplit
    return { owner, repo }
  }
  return { owner: '', repo: '' }
}

// get clean data for github api
export const getTotalList = (data: GithubContributorItem[], repoConfig: UserConfig) => {
  const cleanList = []
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    // filter total && ignore
    if (Number(repoConfig.ignoreTotal) <= item.total && !repoConfig.ignore.includes(item.author.login)) {
      cleanList.push({
        total: item.total,
        author: item.author.login,
        avatar: item.author.avatar_url,
        id: item.author.id,
      })
    }
  }

  return cleanList
}
