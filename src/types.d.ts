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
  ignoreTotal?: number
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

export interface TotalMap {
  [k: string]: any
}

export interface GithubWeeksItem {
  w: number
  a: number
  d: number
  c: number
}

interface GithubAuthorItem {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}
export interface GithubContributorItem {
  total: number
  weeks: GithubWeeksItem[]
  author: GithubAuthorItem
}

export interface MD5Item {
  filename: string
  md5: string
}