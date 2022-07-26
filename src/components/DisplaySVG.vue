<script setup lang="ts">
/**
 * @TODO editable the user input code?
 * */
import {computed,readonly, inject, ref,toRaw} from 'vue'
import {sortBy} from 'lodash'
import {Download} from '@element-plus/icons-vue'
import {getOwnerRepo, getTotalList, axiosGet} from '@/utils'
import {mockData} from '../mock'
import docsZhCN from '../../repos/vuejs-translations/docs-zh-cn.svg'
import {UserConfig, UserItem} from "@/types";
import {generateUserListSVG} from "@/core/app";

const {defaultRepo, defaultRepoConfig, setDefaultRepo} = inject('defaultRepo')

const defaultSort = sortBy(mockData, (o) => -o.total) || []
const sortList = getTotalList(defaultSort, defaultRepoConfig)

/* ******************** ref ******************* */
const svgData = ref(docsZhCN)
const loading = ref(false)
const originData = ref(sortList || [])

/* ******************** computed ************** */
const isRepo = computed(() => {
  const {owner, repo} = getOwnerRepo(defaultRepo.value)
  return !!(owner && repo);
})
/* ******************** function ************** */
const onSearch = () => {
  const {owner, repo} = getOwnerRepo(defaultRepo.value)
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

const onChange = (t: string) => {
  console.info('t=>', t);
}

const downloadSVG = () => {
  let blob = new Blob([svgData.value], {type: 'text/plain'});
  let vNode = document.createDocumentFragment();
  const linkNode = document.createElement('a')
  vNode.appendChild(linkNode)
  linkNode.innerHTML = defaultRepo.value + '.svg';
  linkNode.href = window.URL.createObjectURL(blob);
  linkNode.download = defaultRepo.value + '.svg';
  linkNode.click()
}

const getGithubContributors = async (repoKey: string) => {
  // TODO
  const testItem = {
    "total": 6,
    "author": "kiaking",
    "avatar": "https://avatars.githubusercontent.com/u/3753672?v=4",
    "id": 3753672
  }

  await generate(defaultRepo.value, defaultRepoConfig.value, sortList)// .slice(0,20)
  // try {
  //   loading.value = true
  //   const resp = await axiosGet(`http://api.github.com/repos/${repoKey}/stats/contributors`)
  //   if (Array.isArray(resp)) {
  //     // originData.value = sortBy(resp, (o) => o.total); TODO
  //     const cleanData = getTotalList(resp, defaultRepoConfig)
  //     console.info('cleanData=>', cleanData)
  //     await generate(defaultRepo, defaultRepoConfig, cleanData)
  //   }
  // } catch (err) {
  //   console.error('get repo stats contributors err=>', err)
  // } finally {
  //   loading.value = false
  // }
}

const generate = async (repo: string, userConfig: UserConfig, contributors: UserItem[]) => {

  console.time('generate time');
  // const tasks = await Promise.allSettled(contributors.map(async userItem => {
  //   return await loadImage(userItem)
  //   await saveSVG(repo, userConfig, contributors)
  // }))
  // TODO 比较 循环里有两个异步链快还是 两个循环里分别一个异步链
  const svgStr = await generateUserListSVG(contributors, userConfig)
  svgData.value = svgStr
  console.timeEnd('generate time');
}


</script>

<template>
  <div class="searchBody">
    <el-input v-loading.fullscreen.lock="loading" size="large" v-model="defaultRepo"
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

  <!--  <img src="https://avatars.githubusercontent.com/u/3753672?v=4" alt="">-->
  <div class="display-body">
    <div class="display-content">
      <el-alert v-if="isRepo" center show-icon :title="`the ${ defaultRepo } repository contributors demo.`"
                type="success" :closable="false"/>
      <el-alert v-else center show-icon :title="`the ${ defaultRepo } repository contributors demo.`"
                type="warning"
                :closable="false"/>
    </div>

    <!-- TODO: add svg display loading  -->
    <div v-if="isRepo" v-loading="loading" v-html="svgData" class="divSVG"></div>
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
</style>
