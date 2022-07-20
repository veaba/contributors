<script setup lang="ts">
import {ref} from 'vue'
import {ElHeader, ElMain, ElMenu, ElMenuItem, ElIcon} from 'element-plus'
import {BottomRight} from '@element-plus/icons-vue'
import DisplaySVG from '../components/DisplaySVG.vue'
import Footer from '../components/Footer.vue'

const activeIndex = ref('1')
</script>
<template>
  <ElHeader>
    <ElMenu :default-avtive="activeIndex" mode="horizontal" :ellipsis="false">
      <ElMenuItem index="3">veaba/Contributors</ElMenuItem>
      <div class="flex-grow"/>
      <ElMenuItem index="1">Home</ElMenuItem>
      <ElMenuItem index="2">
        <el-icon>
          <BottomRight/>
        </el-icon>
        Github
      </ElMenuItem>
    </ElMenu>
  </ElHeader>
  <ElMain>
    <DisplaySVG></DisplaySVG>
  </ElMain>
  <Footer></Footer>
</template>

<style lang="scss">
.flex-grow {
  flex-grow: 1;
}

.el-menu--horizontal {
  border-bottom: none;
}
</style>
