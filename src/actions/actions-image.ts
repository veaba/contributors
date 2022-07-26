import { readFile } from 'node:fs/promises'
export const imagePathToBase64 = async (imagePath: string) => {
  const imageBuffer = await readFile(imagePath)
  return imageBuffer.toString('base64')
}
