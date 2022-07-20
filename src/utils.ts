import {GithubContributorItem, OwnerRepoItem, SvgConfig, UserConfig} from './types';


/**
 * Automatic center filling
 * @param {number} childrenLen
 * @param {SvgConfig} svgConfig
 *
*/
export const autoCenter = (childrenLen: number, svgConfig: SvgConfig) => {
  const { svgWidth, outSize } = svgConfig
  if (childrenLen * outSize < svgWidth) {
    return (svgWidth - outSize * childrenLen) / 2
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
