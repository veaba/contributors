<script setup lang='ts'>
import {ref, inject} from 'vue'
import {HighCode} from 'vue-highlight-code'
import 'vue-highlight-code/dist/style.css';
import config from '@/../config'
import {UserConfig} from '@/types'

const configs = ref(config)

const {defaultRepo, defaultRepoConfig, setDefaultRepo} = inject('defaultRepo')

const onClickCard = (key: string, item: UserConfig) => {
  console.log('item>', key, item)
  setDefaultRepo(key, item)
}
const codeToString = (codeItem: UserConfig) => {
  return JSON.stringify(codeItem, null, 2)
}

const load = () => {
}

const loadCode = () => {
  console.log('load code=>')
}

</script>

<template>
  <ElAside class='aside'>
    <h2>try a repository...</h2>
    <el-scrollbar>
      <el-space direction="vertical">
        <div class='aside-body' v-infinite-scroll="load"></div>
        <div :class='"sideCard " + (defaultRepo === key ? "active" : "")' v-for="(item, key) of config"
             @click='onClickCard(key as string, item)'>

          <div class='sideTitle'>
            <el-link :href="`https://github.com/${key}`" target="_blank">{{ key }}</el-link>
          </div>

          <div :class='"sideBody "'>
            <el-scrollbar>
              <HighCode scrollStyleBool borderRadius='0px' :codeValue='codeToString(item)' codeLines width="280px"
                        :maxHight="`100vh`" :height='defaultRepo === key.toString() ? "50vh" : "200px"'>
              </HighCode>
            </el-scrollbar>
          </div>
        </div>

      </el-space>
    </el-scrollbar>

  </ElAside>
</template>
<style scoped lang="scss">
.aside {
  width: 330px;
  height: 100vh;
  background: #252526;
  padding-left: 10px;
  overflow: hidden;
  padding-bottom: 200px;
}

h2 {
  color: #449544;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 5px;
  margin-right: 5px;
  text-align: center;
}

.aside-body {
  height: 98%;
  width: 98%;
}


.sideCard {
  padding: 10px;
  border: 1px solid transparent;
}

.active {
  border: 1px solid #67C23A !important;
  border-radius: 8px;
  transition: 0.5s all;

  .sideTitle {
    color: var(--el-color-primary) !important;
  }
}

.sideTitle {
  font-weight: bold;
  background: #fff;
  padding: 2px 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  a {
    color: #007acc
  }
}

.sideBody {
}
</style>

<style lang='scss'>
.code_area {
  overflow-y: auto !important;
}

pre {
  overflow: initial !important;
}

.code_header {
  .cb {
    z-index: 1;
  }
}
</style>
