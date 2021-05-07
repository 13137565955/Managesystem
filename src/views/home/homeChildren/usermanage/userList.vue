<template>
  <div>
    <!-- 页面顶部面包屑 -->
    <breadcrumb>
      <template v-slot:one>用户管理</template>
      <template v-slot:two>用户列表</template>
    </breadcrumb>
    <!-- 卡片内容 -->
    <card />
  </div>
</template>

<script>
import Breadcrumb from "components/common/Breadcrumb.vue";
import Card from "../../../../components/common/card.vue";
export default {
  name: "userList",
  components: { Breadcrumb,Card },
};
Card;
</script>

<style scoped>
</style>
