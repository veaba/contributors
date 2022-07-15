import path from 'path'
import { readFile } from 'node:fs/promises'
/**
 * save image locally
 * 
*/

/**
 * locally image to base64
 * 
*/
export const imagePathToBase64 = async (imagePath: string) => {
  const imageBuffer = await readFile(imagePath)
  return imageBuffer.toString('base64')
}