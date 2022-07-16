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
}
export interface ConfigItem {
  [key: string]: UserConfig
}

export interface OwnerRepoItem {
  owner: string
  repo: string
}