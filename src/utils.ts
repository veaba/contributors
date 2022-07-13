import path from 'path'
import crypto from 'crypto'
import fs from 'fs'

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