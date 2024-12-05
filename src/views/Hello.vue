<script setup>import { ref } from 'vue';

// 定义图片数组
const images = ref([
  { src: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msKSm.img' }, // 确保路径正确
  { src: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msMpB.img' }, // 确保路径正确
  { src: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msyOb.img' }  // 确保路径正确
]);
</script>

<template>
  <div class="block text-center">
    <span class="demonstration">
    </span>
    <el-carousel height="640px" >
      <el-carousel-item v-for="(item, index) in images" :key="index">
        <img :src="item.src" alt="carousel image" class="carousel-image">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: fill; /* 使图片完全填充容器，不保持宽高比 */
}
</style>