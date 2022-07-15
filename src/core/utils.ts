import path from 'path'
import crypto from 'crypto'
import fs from 'fs'
import { BASE_SIZE, FONT_SIZE, ONE_ROW_MAX, SVG_WIDTH } from '.';
import console from 'console';


export const readMD5 = (userId: number) => {
  const buffer1 = fs.readFileSync(`../avatars/${userId}.jpg`, 'utf-8');
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
 * 如果长度是小于的，则会启动居中
 * 
*/
export const autoCenter = (childrenLen: number) => {
  if (childrenLen < ONE_ROW_MAX) {
    const autoToCenterX = (BASE_SIZE + FONT_SIZE) * (ONE_ROW_MAX - childrenLen) / 2
    return autoToCenterX
  }
  return 0
}

export const getImageX = (yIndex: number) => {
  return (BASE_SIZE + FONT_SIZE) * yIndex
}

export const getImageY = (xIndex: number) => {
  return (BASE_SIZE + FONT_SIZE * 2) * xIndex
}


/**
 * Scale factor = 7
 * 
*/
export const getTextX = (yIndex: number) => {
  return (BASE_SIZE / 2) + (BASE_SIZE + FONT_SIZE) * yIndex
}

export const getTextY = (xIndex: number) => {
  return (BASE_SIZE + FONT_SIZE) * (xIndex + 1) + (xIndex * FONT_SIZE)
}
