<script setup lang="ts">
import {ref, reactive, shallowRef, provide} from 'vue'
import {BottomRight} from '@element-plus/icons-vue'
import DisplaySVG from '../components/DisplaySVG.vue'
import ASider from '../components/ASider.vue'
import Footer from '../components/Footer.vue'
import {UserConfig} from "@/types";

const activeMenuIndex = ref('1')
const defaultRepo = ref('vuejs-translations/docs-zh-cn')
const defaultRepoConfig = shallowRef({})

const setDefaultRepo = (repoKey: string, item: UserConfig) => {
  defaultRepo.value = repoKey
  defaultRepoConfig.value = item
}
provide('defaultRepo', {defaultRepo, defaultRepoConfig, setDefaultRepo})
</script>
<template>
  <ElHeader>
    <ElMenu :default-avtive="activeMenuIndex" mode="horizontal" :ellipsis="false">
      <ElMenuItem index="3">veaba/Contributors</ElMenuItem>
      <div class="flex-grow"></div>
      <ElMenuItem index="1">Home</ElMenuItem>
      <ElMenuItem index="2">
        <el-link href="https://github.com/veaba/contributors/">
          <el-icon>
            <BottomRight/>
          </el-icon>
          Github
        </el-link>
      </ElMenuItem>
    </ElMenu>
  </ElHeader>
  <ElContainer class="container">
    <ASider>
    </ASider>
    <ElMain class="main">
      <DisplaySVG></DisplaySVG>
    </ElMain>
  </ElContainer>
  <ElFooter>
    <Footer></Footer>
  </ElFooter>
</template>

<style lang="scss">
.flex-grow {
  flex-grow: 1;
}

.el-menu--horizontal {
  border-bottom: none;
}

.main {
  padding: 0;
}

.container {
  background-image: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  filter: var(--vp-home-hero-image-filter);
}
</style>
