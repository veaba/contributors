<script setup lang="ts">
/**
 * @TODO editable the user input code?
 * */
import {computed, inject, ref, toRaw} from 'vue'
import {sortBy} from 'lodash'
import {Download} from '@element-plus/icons-vue'
import {axiosGet, getOwnerRepo, getTotalList} from '@/utils'
import {mockData} from '../mock'
import docsZhCN from '../../repos/vuejs-translations/docs-zh-cn.svg'
import {GithubContributorItem, UserConfig, UserItem} from "@/types";
import {generateUserListSVG} from "@/core/generate";
// import {loadImage} from "@/core/svg";

const {defaultRepo, defaultRepoConfig} = inject('defaultRepo')

const defaultSort = sortBy(mockData, (o) => -o.total) || []
const sortList = getTotalList(defaultSort, defaultRepoConfig)

/* ******************** ref ******************* */
const searchRepo = ref(defaultRepo.value)
const svgData = ref(docsZhCN as string)
const loading = ref(false)
const originData = ref(sortList || [])
const contributorList = ref([] as GithubContributorItem[]) // from api not sort
const isNoFountSearchRepo = ref(false) // repo is 404
const isNoContributors = ref(false) // if the repo no contributors

/* ******************** computed ************** */
const isRepo = computed(() => {
  const {owner, repo} = getOwnerRepo(searchRepo.value)
  return !!(owner && repo);
})
/* ******************** function ************** */
const onSearch = () => {
  const {owner, repo} = getOwnerRepo(searchRepo.value)
  if (!owner || !repo) {
    ElNotification({
      title: 'Please check it',
      type: 'error',
      message: 'it\'s a legal Github repo, it should be link: vuejs-translations/docs-zh-cn'
    })
    return
  }
  getGithubContributors(`${owner}/${repo}`)
}

// TODO 有些迟滞
const onChange = (v: string) => {
  if (v !== defaultRepo.value) {
    svgData.value = ''
  } else if (!v) {
    isNoContributors.value = false
    isNoFountSearchRepo.value = false
  }
}

const downloadSVG = () => {
  let blob = new Blob([svgData.value], {type: 'text/plain'});
  let vNode = document.createDocumentFragment();
  const linkNode = document.createElement('a')
  vNode.appendChild(linkNode)
  linkNode.innerHTML = searchRepo.value + '.svg';
  linkNode.href = window.URL.createObjectURL(blob);
  linkNode.download = searchRepo.value + '.svg';
  linkNode.click()
}

const init = async () => {
  loading.value = true
  isNoFountSearchRepo.value = false
  isNoContributors.value = false
}
const getGithubContributors = async (repoKey: string) => {
  // TODO test
  // await generate(searchRepo.value, defaultRepoConfig.value, sortList.slice(0, 60))// .slice(0,20)
  try {
    await init()
    const resp = await axiosGet(`http://api.github.com/repos/${repoKey}/stats/contributors`)
    if (Array.isArray(resp)) {
      isNoFountSearchRepo.value = false
      isNoContributors.value = false
      contributorList.value = resp
      const sortTotalList = sortBy(resp, (o) => -o.total);
      originData.value = sortTotalList
      const cleanData = getTotalList(sortTotalList, defaultRepoConfig)
      await generate(searchRepo, defaultRepoConfig, cleanData)

    } else {
      // if resp = {}
      contributorList.value = []
      originData.value = []
      svgData.value = ''
      isNoFountSearchRepo.value = false
      isNoContributors.value = true

    }
  } catch (err) {
    console.error('get repo stats contributors err=>', err)
    // Request failed with status code 404
    isNoContributors.value = true
    isNoFountSearchRepo.value = true

  } finally {
    loading.value = false
  }
}

const generate = async (repo: string, userConfig: UserConfig, contributors: UserItem[]) => {
  console.time('generate time');
  svgData.value = await generateUserListSVG(contributors, userConfig)
  console.timeEnd('generate time');
}


</script>

<template>
  <div class="searchBody">
    <el-input v-loading.fullscreen.lock="loading" size="large" v-model="searchRepo"
              placeholder="Please input a repo: {owner}/{repo}" @change="onChange">
      <template #append>
        <div class="el-button--primary--">
          <ElButton type="primary" :disabled="loading" :loading="loading" @click="onSearch">Go</ElButton>
        </div>
      </template>
    </el-input>
  </div>

  <div v-if="isRepo && svgData" class="download-group">
    <el-button type="success" :icon="Download" round @click="downloadSVG">Download the SVG</el-button>
  </div>

  <div class="display-body">
    <div class="display-content">
      <el-alert v-if="isRepo" center show-icon :title="`The { ${ searchRepo } } repository contributors demo.`"
                type="success" :closable="false"/>
      <el-alert v-else-if="!searchRepo.length" center show-icon :title="`Please input repository name`"
                type="warning"
                :closable="false"/>
      <el-alert v-else center show-icon :title="`This { ${ searchRepo } },is an invalid repository address.`"
                type="warning"
                :closable="false"/>
    </div>

    <!-- TODO: add svg display loading  -->
    <div v-if="isRepo" class="divSVG">
      <div v-if="svgData.length" v-loading="loading" v-html="svgData"></div>
    </div>

    <!-- no contributors   -->
    <div v-if="isNoContributors" class="no-contributors">
      <el-result
          icon="warning"
          title="Ops, 😓"
          :sub-title="`Unable to find contributors for { ${searchRepo} } repository`"
      />
    </div>
  </div>

</template>


<style lang="scss" scoped>
.searchBody {
  width: 400px;
  margin: 100px auto 40px;
}

.display-body {
  text-align: center;
  padding: 20px 0;

  .display-content {
    width: 1000px;
    margin: 0 auto;
    padding-bottom: 60px;

  }
}

.download-group {
  text-align: center;
  margin: 50px;
}

.no-contributors {
  width: 320px;
  height: 320px;
  margin: 0 auto;
  background: #fff;
  border-radius: 50%;
  box-shadow: var(--el-box-shadow-dark);
}
</style>
