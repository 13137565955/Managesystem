<template>
  <div>
    <!-- 页面顶部面包屑 -->
    <breadcrumb>
      <template v-slot:one>商品管理</template>
      <template v-slot:two>商品列表</template>
    </breadcrumb>
    <!-- 卡片和内容 -->
    <shop-list-detail />
  </div>
</template>

<script>
//公共组件
import Breadcrumb from "components/common/Breadcrumb.vue";
//子组件
import shopListDetail from "./shopChild/shopListDetail";
export default {
  name: "shopList",
  components: { Breadcrumb, shopListDetail },
};
</script>

<style scoped>
</style>
