<template>
  <div>
    <!-- 页面顶部面包屑 -->
    <breadcrumb>
      <template v-slot:one>用户管理</template>
      <template v-slot:two>用户列表</template>
    </breadcrumb>
    <!-- 卡片和内容 -->
    <user-detail />
  </div>
</template>

<script>
//公共组件
import Breadcrumb from "components/common/Breadcrumb.vue";
//子组件
import userDetail from "./childUserList/userDetail";
export default {
  name: "userList",
  components: { Breadcrumb, userDetail },
};
</script>

<style scoped>
</style>
