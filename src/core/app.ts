import {chunk} from 'lodash';
import {svgStart, svgEnd, asyncHandleUsersSVG, asyncHandlerUserDefsSVG} from './svg';
import {UserConfig, UserItem} from '@/types';

// global constants
const SVG_WIDTH = 800;
const FONT_SIZE = 20
const BASE_SIZE = 100

export const generateUserListSVG = async (userList: UserItem[], config: UserConfig) => {

  // split => two-dimensional array
  let splitList: UserItem[] | UserItem[][] = userList

  const svgWidth = config.width || SVG_WIDTH
  // const svgHeight = config.height
  const baseSize = config.size || BASE_SIZE
  const fontSize = config.fontSize || FONT_SIZE

  const isRadius = config.isRadius !== false // default need radius => 50%;
  const outSize = fontSize + baseSize
  const oneRowMax = Math.floor(svgWidth / outSize)

  // split new array
  if (userList.length > oneRowMax) {
    splitList = chunk(userList, oneRowMax)
  }

  // TODO => 計算不對
  console.info('splitList=>', splitList, splitList.length + 1, outSize + 5);
  const svgHeight = (splitList.length + 1) * (outSize + 5)

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
  if (config.isRadius === undefined || config.isRadius) {
    return `${svgStart(svgWidth, svgHeight)}
  <defs>
  ${await asyncHandlerUserDefsSVG(splitList, svgConfig)}

  </defs>
${await asyncHandleUsersSVG(splitList, svgConfig)}
${svgEnd()}
    `
  } else if (!config.isRadius) {
    const userBlockData = await asyncHandleUsersSVG(splitList, svgConfig)
    return `${svgStart(svgWidth, svgHeight)}
    ${userBlockData}
${svgEnd()}
    `
  }
  return ''
}
