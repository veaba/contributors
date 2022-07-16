<script setup lang="ts">
import veabaSvg from '../../repos/veaba/contributors.svg'
// import docsZhCN from '../../repos/vuejs-translations/docs-zh-cn.svg'
import circleSVG from '../assets/circle.svg'
const veabaSvgData = veabaSvg
// const docsZhCNData = docsZhCN
const circleSVGData = circleSVG
</script>



<template>
  <h1> SVG veaba/contributor demo</h1>
  <div v-html="veabaSvgData" class="divSVG"></div>

  <!-- <h1> SVG vuejs-translations/docs-zh-cn demo</h1>
  <div v-html="docsZhCNData" class="divSVG"></div> -->

  <h1> SVG border-radius </h1>
  <div v-html="circleSVGData" class="divSVG"></div>
</template>


<style lang="scss">
h1 {
  text-align: center
}

svg {
  border: 1px solid red;

}

.divSVG {
  text-align: center;
}
</style>