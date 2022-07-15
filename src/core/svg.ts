import { SVG_WIDTH, SVG_HEIGHT, OUT_SIZE, FONT_SIZE, BASE_SIZE } from "."
import { imagePathToBase64 } from "./image"
import { UserItem } from "./types"
import { getByteLen, getImageX, getImageY, getTextX, getTextY } from "./utils"

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
export const svgBlock = async (userItem: UserItem, xIndex: number, yIndex: number,): Promise<string> => {
  let authorStrLen = getByteLen(userItem.author)

  // image
  const imageX = getImageX(yIndex)// TODO
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
  const textX = getTextX(yIndex); // 根据 author 长度和字符来计算 x
  const textY = getTextY(xIndex)

  console.log(
    `     (xIndex,yIndex)       => ( ${xIndex}, ${yIndex} )
     (getImageX,getImageY) => ( ${imageX}, ${imageY} )
     (getTextX,getTextY)   => ( ${textX}, ${textY} )`
  )

  console.log('\n')

  // 100 长度
  // 10 字符长度
  // 70 x 20
  // 最右边 100 + 70/2
  // 100/2 + 70/2

  const avatarURL = 'http://127.0.0.1:3000/avatars/'
  // const avatarURL = ' https://avatars.githubusercontent.com/u/'

  const localImagePath = 'public/avatars/' + userItem.id + '.jpg'

  const base64Image = await imagePathToBase64(localImagePath)

  const imageBase64Data = 'data:image/PNG;base64,' + base64Image

  // 名字的长度px

  const namePx = (authorStrLen * 7) + 'px'

  console.log('author=>', author)

  // 如果 BASE_SIZE 过小，则不需要显示文字
  let SVGText = `<text x="${textX}" y="${textY}" text-anchor="middle">${author}</text>`
  if (BASE_SIZE <= 50) {
    SVGText = ''
  }

  const aSVGData = `
      <a xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://github.com/${userItem.author}" target="_blank" id="${userItem.author}">
        <image x="${imageX}" y="${imageY}" width="${imageWidth}" height="${imageHeight}" xlink:href="${imageBase64Data}"/>
        ${SVGText}
      </a>
      `
  // <text x="${textX}" y="${textY}" text-anchor="middle">${author}</text>
  return aSVGData
}


export const handleList = async (splitList: (UserItem | UserItem[])[]) => {
  let userBlockData = ''
  await Promise.all(splitList.map(async (item, xIndex) => {
    if (Array.isArray(item)) {
      await Promise.all(item.map(async (child, yIndex) => {
        const childBlock = await svgBlock(child, xIndex, yIndex)
        userBlockData += childBlock
      })
      )
    } else {
      // BUG =? 当过小时候计算错误
      // item.author = xIndex + '-a'
      const currentBlock = await svgBlock(item, 0, xIndex) // ? BUG? 文字和图片对不齐了
      // ? BUG? 文字和图片对不齐了
      // ? BUG? 文字和图片对不齐了
      // ? BUG? 文字和图片对不齐了1
      userBlockData += currentBlock
    }
  }))
  return userBlockData
}