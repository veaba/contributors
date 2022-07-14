import path from 'path'
import crypto from 'crypto'
import fs from 'fs'
import { BASE_SIZE, FONT_SIZE, OUT_SIZE } from '.';


export const readMD5 = (userId: number) => {
  const buffer1 = fs.readFileSync(path.join(__dirname, `../avatars/${userId}.jpg`), 'utf-8');
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

export const getImageX = (yIndex: number) => {
  return (BASE_SIZE * yIndex) + ((FONT_SIZE) * yIndex)
}

export const getImageY = (xIndex: number) => {
  const compensationY = (xIndex * FONT_SIZE * 2)  // Compensation height
  return (BASE_SIZE * xIndex) + (FONT_SIZE * xIndex) + compensationY
}


/**
 * Scale factor = 7
 * 
*/
export const getTextX = (textLen: number, yIndex: number) => {
  const textScaleLen = textLen * 7
  const halfTextWidth = Math.ceil(textScaleLen / 2)
  const leftWidth = Math.ceil(BASE_SIZE - textScaleLen) / 2
  const initLeft = leftWidth + halfTextWidth
  return (yIndex * BASE_SIZE + FONT_SIZE) + initLeft
}

export const getTextY = (xIndex: number) => {
  return ((xIndex + 1) * (BASE_SIZE + FONT_SIZE + FONT_SIZE)) + FONT_SIZE * xIndex
}

