import { SVG_WIDTH, SVG_HEIGHT, OUT_SIZE, FONT_SIZE, BASE_SIZE } from "."
import { imagePathToBase64 } from "./image"
import { UserItem } from "./types"
import { autoCenter, getByteLen, getImageX, getImageY, getTextX, getTextY } from "./utils"

export const svgStart = (width = SVG_WIDTH, height = SVG_HEIGHT) => {
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
export const svgBlock = async (userItem: UserItem, xIndex: number, yIndex: number, childrenLen: number): Promise<string> => {
  let authorStrLen = getByteLen(userItem.author)

  // image
  const imageX = getImageX(yIndex) + autoCenter(childrenLen)
  const imageY = getImageY(xIndex) // TODO
  const imageHeight = BASE_SIZE
  const imageWidth = BASE_SIZE

  let author: string = userItem.author

  let fontScale = Math.floor(BASE_SIZE / 7)
  if (BASE_SIZE < authorStrLen * 7) {
    author = author.slice(0, fontScale - 1) + '...'// TODO
    authorStrLen = fontScale
  }

  // text
  const textX = getTextX(yIndex) + autoCenter(childrenLen);
  const textY = getTextY(xIndex)

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
  let SVGText = `<text x="${textX}" y="${textY}" text-anchor="middle">${author}</text>`
  if (BASE_SIZE <= 50 || FONT_SIZE < 20) {
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


export const handleList = async (splitList: (UserItem | UserItem[])[]) => {
  let userBlockData = ''
  await Promise.all(splitList.map(async (item, xIndex) => {
    if (Array.isArray(item)) {
      await Promise.all(item.map(async (child, yIndex) => {
        const childBlock = await svgBlock(child, xIndex, yIndex, item.length)
        userBlockData += childBlock
      })
      )
    } else {
      // BUG =? 当过小时候计算错误
      // item.author = xIndex + '-a'
      const currentBlock = await svgBlock(item, 0, xIndex, splitList.length) // ? BUG? 文字和图片对不齐了
      // ? BUG? 文字和图片对不齐了
      // ? BUG? 文字和图片对不齐了
      // ? BUG? 文字和图片对不齐了1
      userBlockData += currentBlock
    }
  }))
  return userBlockData
}