import { imagePathToBase64 } from "./image"
import { ImageXYItem, SvgConfig, UserItem, XYItem } from "./types"
import { autoCenter, getImageX, getImageY, getTextX, getTextY } from "./utils"

export const svgStart = (width: number, height: number) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`
}

export const svgEnd = () => `</svg>`


// TODO
export const svgNoFound = () => {

}

/**
 * generate svg block string
 * @param {UserItem} userItem
 * @param {number} xyItem 
 * @param {number} svgConfig
*/
export const svgBlockANode = async (userItem: UserItem, xyItem: XYItem, childrenLen: number, svgConfig: SvgConfig): Promise<string> => {

  const { xIndex, yIndex } = xyItem

  // image
  const imageX = getImageX(yIndex, svgConfig) + autoCenter(childrenLen, svgConfig)
  const imageY = getImageY(xIndex, svgConfig)

  // if BASE_SIZE too small,or font-size less than 20
  // hidden svg > text node
  let SVGText = '';
  if (svgConfig.baseSize >= 50 && svgConfig.fontSize >= 20) {
    SVGText = renderTextNode(childrenLen, xyItem, userItem, svgConfig)
  }

  const SVGData = `
  <a xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://github.com/${userItem.author}" target="_blank" id="${userItem.author}">
    ${await renderImageNode({ imageX, imageY }, userItem, svgConfig)}
    ${SVGText}
  </a>
`
  return SVGData

}

export const svgBlockImage = async (userItem: UserItem, xyItem: XYItem, childrenLen: number, svgConfig: SvgConfig): Promise<string> => {
  const { xIndex, yIndex } = xyItem
  // image
  const imageX = getImageX(yIndex, svgConfig) + autoCenter(childrenLen, svgConfig)
  const imageY = getImageY(xIndex, svgConfig)
  const imageXYItem = { imageX, imageY }
  return await renderImageNode(imageXYItem, userItem, svgConfig)
}

// isRadius = false
export const svgBlockCircle = async (userItem: UserItem, xyItem: XYItem, childrenLen: number, svgConfig: SvgConfig): Promise<string> => {
  const { xIndex, yIndex } = xyItem
  const imageX = getImageX(yIndex, svgConfig) + autoCenter(childrenLen, svgConfig)
  const imageY = getImageY(xIndex, svgConfig)

  return `
    <clipPath id="${userItem.author}">
      <rect x="${imageX}" y="${imageY}" width="${svgConfig.baseSize}" height="${svgConfig.baseSize}" rx="50%" ry="50%" />
    </clipPath>
  `
}

// render svg image node
const renderImageNode = async (imageXYItem: ImageXYItem, userItem: UserItem, svgConfig: SvgConfig) => {
  const { imageX, imageY } = imageXYItem
  const imageHeight = svgConfig.baseSize
  const imageWidth = svgConfig.baseSize
  const localImagePath = 'public/avatars/' + userItem.id + '.jpg'
  const base64Image = await imagePathToBase64(localImagePath)
  const imageBase64Data = 'data:image/PNG;base64,' + base64Image
  const clipPath = svgConfig.isRadius ? `clip-path="url(#${userItem.author})"` : ''
  return ` <image x="${imageX}" y="${imageY}" width="${imageWidth}" height="${imageHeight}" ${clipPath} xlink:href="${imageBase64Data}"/>`
}

// render svg text node
const renderTextNode = (childrenLen: number, xyItem: XYItem, userItem: UserItem, svgConfig: SvgConfig) => {
  const { xIndex, yIndex } = xyItem
  const textX = getTextX(yIndex, svgConfig) + autoCenter(childrenLen, svgConfig);
  const textY = getTextY(xIndex, svgConfig)
  return `<text x="${textX}" y="${textY}" text-anchor="middle">${userItem.author}</text>`
}

// rectangle avatar
export const asyncHandleUsersSVG = async (splitList: (UserItem | UserItem[])[], config: SvgConfig) => {
  let userBlockData = ''
  await Promise.all(splitList.map(async (item, xIndex) => {
    if (Array.isArray(item)) {
      await Promise.all(item.map(async (child, yIndex) => {
        const childBlock = await svgBlockANode(child, { xIndex, yIndex }, item.length, config)
        userBlockData += childBlock
      })
      )
    } else {
      const currentBlock = await svgBlockANode(item, { xIndex: 0, yIndex: xIndex }, splitList.length, config)
      userBlockData += currentBlock
    }
  }))
  return userBlockData
}


// circle avatar
export const asyncHandlerUserDefsSVG = async (splitList: (UserItem | UserItem[])[], config: SvgConfig) => {
  let userBlockData = ''
  await Promise.all(splitList.map(async (item, xIndex) => {
    if (Array.isArray(item)) {
      await Promise.all(item.map(async (child, yIndex) => {
        const childBlock = await svgBlockCircle(child, { xIndex, yIndex }, item.length, config)
        userBlockData += childBlock
      })
      )
    } else {
      const currentBlock = await svgBlockCircle(item, { xIndex: 0, yIndex: xIndex }, splitList.length, config)
      userBlockData += currentBlock
    }
  }))
  return userBlockData
}