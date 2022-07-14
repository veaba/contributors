import { SVG_WIDTH, SVG_HEIGHT, OUT_SIZE, FONT_SIZE, BASE_SIZE } from "."
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
 * <a xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://github.com/veaba1" class="sponsorkit-link" target="_blank" id="withastro">
    <image x="220" y="0" width="100" height="100" xlink:href="https://avatars.githubusercontent.com/u/8652596?s=64&amp;v=4"/>
    <text x="290" y="120" text-anchor="middle" class="sponsorkit-name" fill="red">God</text>
  </a>
* @yIndex ???
* 
*/

export const svgBlock = (userItem: UserItem, xIndex: number, yIndex: number,): string => {
  // console.log('svgBlock xIndex,yIndex=> (', xIndex, ',', yIndex, ')')

  const fontSize = FONT_SIZE; // TODO
  const baseSize = BASE_SIZE; // TODO
  const outSize = OUT_SIZE

  const authorStrLen = getByteLen(userItem.author)

  // image
  const imageX = getImageX(yIndex)// TODO
  const imageY = getImageY(xIndex) // TODO
  const imageHeight = BASE_SIZE
  const imageWidth = BASE_SIZE
  const avatarSize = 64

  // text
  const textX = getTextX(authorStrLen,yIndex); // 根据 author 长度和字符来计算 x
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

  const avatarURL = 'http://127.0.0.1:5173/'
  // const avatarURL = ' https://avatars.githubusercontent.com/u/'
  return `
  <a xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://github.com/${userItem.author}" target="_blank" id="${userItem.author}">
    <image x="${imageX}" y="${imageY}" width="${imageWidth}" height="${imageHeight}" xlink:href="${avatarURL}${userItem.id}.jpg?s=${avatarSize}&amp;v=4"/>
    <text x="${textX}" y="${textY}" text-anchor="middle">${userItem.author}</text>
  </a>
  `
}
// 