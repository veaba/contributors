export interface UserItem {
  total: number
  author: string;
  avatar: string
  id: number
}

export interface UserConfig {
  ignore: Array<string> // github login user
  height: number
  width: number
  fontSize: number
  size: number
  isRadius?: boolean
}
export interface ConfigItem {
  [key: string]: UserConfig
}

export interface OwnerRepoItem {
  owner: string
  repo: string
}

export interface SvgConfig {
  baseSize: number
  fontSize: number
  oneRowMax: number
  svgWidth: number
  svgHeight: number
  outSize: number
  isRadius: boolean
}

export interface XYItem {
  xIndex: number
  yIndex: number
}

export interface ImageXYItem {
  imageX: number
  imageY: number
}