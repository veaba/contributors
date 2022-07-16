import { imagePathToBase64 } from "./image"
import { SvgConfig, UserItem } from "./types"
import { autoCenter, getByteLen, getImageX, getImageY, getTextX, getTextY } from "./utils"

export const svgStart = (width: number, height: number) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`
}

export const svgEnd = () => {
  return `</svg>`
}

// TODO
export const svgNoFound = () => {

}



/**
 * generate svg block string
 * @param userItem
 * @param {number} xIndex 行
 * @param {number} yIndex 列 
* @yIndex ???
* 
*/
export const svgBlock = async (userItem: UserItem, xIndex: number, yIndex: number, childrenLen: number, svgConfig: SvgConfig): Promise<string> => {
  const { baseSize, fontSize } = svgConfig

  // image
  const imageX = getImageX(yIndex, svgConfig) + autoCenter(childrenLen, svgConfig)
  const imageY = getImageY(xIndex, svgConfig) // TODO
  const imageHeight = baseSize
  const imageWidth = baseSize

  // text
  const textX = getTextX(yIndex, svgConfig) + autoCenter(childrenLen, svgConfig);
  const textY = getTextY(xIndex, svgConfig)

  console.log(
    `     (xIndex,yIndex)       => ( ${xIndex}, ${yIndex} )
     (getImageX,getImageY) => ( ${imageX}, ${imageY} )
     (getTextX,getTextY)   => ( ${textX}, ${textY} )`
  )

  console.log('\n')

  const localImagePath = 'public/avatars/' + userItem.id + '.jpg'
  const base64Image = await imagePathToBase64(localImagePath)
  const imageBase64Data = 'data:image/PNG;base64,' + base64Image

  // if BASE_SIZE too small,or font-size less than 20
  // hidden svg > text node
  let SVGText = `<text x="${textX}" y="${textY}" text-anchor="middle">${userItem.author}</text>`
  if (baseSize <= 50 || fontSize < 20) {
    SVGText = ''
  }

  const aSVGData = `
      <a xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://github.com/${userItem.author}" target="_blank" id="${userItem.author}">
        <image x="${imageX}" y="${imageY}" width="${imageWidth}" height="${imageHeight}" xlink:href="${imageBase64Data}"/>
        ${SVGText}
      </a>
      `
  return aSVGData
}


export const asyncHandleUsersSVG = async (splitList: (UserItem | UserItem[])[], config: SvgConfig) => {
  let userBlockData = ''
  await Promise.all(splitList.map(async (item, xIndex) => {
    if (Array.isArray(item)) {
      await Promise.all(item.map(async (child, yIndex) => {
        const childBlock = await svgBlock(child, xIndex, yIndex, item.length, config)
        userBlockData += childBlock
      })
      )
    } else {
      const currentBlock = await svgBlock(item, 0, xIndex, splitList.length, config) // ? BUG? 文字和图片对不齐了
      userBlockData += currentBlock
    }
  }))
  return userBlockData
}