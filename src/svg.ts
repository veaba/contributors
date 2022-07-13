import { SVG_WIDTH, SVG_HEIGHT, OUT_SIZE, FONT_SIZE } from "."
import { UserItem } from "./types"

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
 * @param {number} rowIndex 行
 * @param {number} columnIndex 列 
 * <a xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://github.com/veaba1" class="sponsorkit-link" target="_blank" id="withastro">
    <image x="220" y="0" width="100" height="100" xlink:href="https://avatars.githubusercontent.com/u/8652596?s=64&amp;v=4"/>
    <text x="290" y="120" text-anchor="middle" class="sponsorkit-name" fill="red">God</text>
  </a>
* @columnIndex ???
* 
*/

export const svgBlock = (userItem: UserItem, rowIndex: number, columnIndex: number,): string => {

  const fontSize = 10; // TODO
  const baseSize = 100; // TODO
  const outSize = OUT_SIZE

  // image
  const imageX = rowIndex * OUT_SIZE // TODO
  const imageY = 0 // TODO
  const imageHeight = 100 // TODO
  const imageWidth = 100 // TODO
  const avatarSize = 64 // TODO 

  // text
  const textX = 290;
  const textY = 120;



  return `
  <a xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://github.com/${userItem.author}" target="_blank" id="${userItem.author}">
    <image x="${imageX}" y="${imageY}" width="${imageWidth}" height="${imageHeight}" xlink:href="https://avatars.githubusercontent.com/u/${userItem.id}?s=${avatarSize}&amp;v=4"/>
    <text x="${textX}" y="${textY}" text-anchor="middle">${userItem.author}</text>
  </a>
  `
}