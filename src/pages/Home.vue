<script setup lang="ts">
import { ref } from 'vue'
import { ElHeader, ElMain, ElMenu, ElMenuItem, ElIcon, ElContainer, ElAside, ElFooter } from 'element-plus'
import { BottomRight } from '@element-plus/icons-vue'
import DisplaySVG from '../components/DisplaySVG.vue'
import ASider from '../components/ASider.vue'
import Footer from '../components/Footer.vue'

const activeIndex = ref('1')
</script>
<template>
  <ElHeader>
    <ElMenu :default-avtive="activeIndex" mode="horizontal" :ellipsis="false">
      <ElMenuItem index="3">veaba/Contributors</ElMenuItem>
      <div class="flex-grow"></div>
      <ElMenuItem index="1">Home</ElMenuItem>
      <ElMenuItem index="2">
        <el-icon>
          <BottomRight />
        </el-icon>
        Github
      </ElMenuItem>
    </ElMenu>
  </ElHeader>
  <ElContainer>
    <ASider>
    </ASider>
    <ElMain>
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
</style>