import config from '../../config'
import { getRepoData } from './github';

interface TypesContributors {
  repo: string;
}

const getContributorsList = (params: TypesContributors) => {

}

const needUpdateUserAvatar = () => {

}

const generateAvatarMD5Log = () => {

}

export const serverStart = async () => {
  const repos = Object.keys(config)
  // const reposConfigs = Object.values(config)

  await Promise.all(repos.map(async repo => {
    const repoConfig = config[repo]
    await getRepoData(repo, repoConfig)
  }))

}

serverStart()