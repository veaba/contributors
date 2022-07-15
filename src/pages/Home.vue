<script setup lang="ts">
import svg from '../assets/test.svg'
const svgData = svg
</script>



<template>
  <h1> SVG 展示 效果</h1>
  <div v-html="svgData"></div>
</template>


<style lang="scss">
h1 {
  text-align: center
}

svg {
  border: 1px solid red;

}

a {
  image {
    border: 1px solid red;
  }
}
</style>