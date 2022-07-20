<script setup lang="ts">
import {ref} from 'vue'
import {ElButton, ElInput, ElNotification} from 'element-plus'
import axios from 'axios'
import {sortBy} from 'lodash'
import {BottomRight} from '@element-plus/icons-vue'
import {getOwnerRepo, getTotalList} from '@/utils'
import {mockData} from '../mock'

import veabaSvg from '../../repos/veaba/contributors.svg'
import docsZhCN from '../../repos/vuejs-translations/docs-zh-cn.svg'
import circleSVG from '../assets/circle.svg'

const veabaSvgData = veabaSvg
const docsZhCNData = docsZhCN
const circleSVGData = circleSVG

const defaultSort = sortBy(mockData, (o) => -o.total) || []
const sortList = getTotalList(defaultSort, {ignoreTotal: 0, ignore: []})
/* ******************** ref ******************* */
const repo = ref('vuejs-translations/docs-zh-cn')
const loading = ref(false)
const originData = ref(sortList || [])

const onSearch = () => {
  const {owner, repo: repoName} = getOwnerRepo(repo.value)
  if (!owner || !repoName) {
    ElNotification({
      title: 'Please check it',
      type: 'error',
      message: 'it\'s a legal Github repo, it should be link: vuejs-translations/docs-zh-cn'
    })
    return
  }
  getGithubContributors(`${owner}/${repoName}`)
}

const onChange = (t: string) => {
  console.info('t=>', t);
}


const getGithubContributors = async (repoKey: string) => {
  let repData = []
  try {
    loading.value = true
    const resp = await axios.get(`http://api.github.com/repos/${repoKey}/stats/contributors`)
    if (resp?.data) {
      repData = resp.data || []
      // console.log('sort totalList=>', _.sortBy(totalList, function (o) { return o.total }))
      originData.value = sortBy(repData, (o) => o.total);
      // const cleanData = getTotalList(repData)
    }
    loading.value = false
    console.log('res data==>', resp)
  } catch (err) {
    console.error('get repo stats contributors err=>', err)
  }
}
</script>
<template>
  <div class="searchBody">
    <el-input v-loading.fullscreen.lock="loading" size="large" v-model="repo"
              placeholder="Please input a repo: {owner}/{repo}"
              @change="onChange">
      <template #append>
        <ElButton type="primary" :disabled="loading" :loading="loading" @click="onSearch">Go</ElButton>
      </template>
    </el-input>
  </div>

  <h1> SVG veaba/contributor demo</h1>
  <!--  <div v-html="veabaSvgData" class="divSVG"></div>-->

  <!--  <h1> SVG vuejs-translations/docs-zh-cn demo</h1>-->
  <!--  <div v-html="docsZhCNData" class="divSVG"></div>-->

  <!--  <h1> SVG border-radius 1</h1>-->
  <!--  <div v-html="circleSVGData" class="divSVG"></div>-->

</template>


<style lang="scss" scoped>
.searchBody {
  width: 400px;
  margin: 100px auto;

}
</style>
