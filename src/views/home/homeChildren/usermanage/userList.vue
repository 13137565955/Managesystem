<template>
  <div>
    <!-- 页面顶部面包屑 -->
    <breadcrumb>
      <template v-slot:one>用户管理</template>
      <template v-slot:two>用户列表</template>
    </breadcrumb>
    <!-- 卡片内容 -->
    <card>
      <template v-slot:btn><span>添加用户</span></template>
      <!-- 用户列表详情 -->
      <template v-slot:content>
        <user-detail />
      </template>
    </card>
  </div>
</template>

<script>
//公共组件
import Breadcrumb from "components/common/Breadcrumb.vue";
import Card from "../../../../components/common/card.vue";
//子组件
import userDetail from "./childUserList/userDetail";
export default {
  name: "userList",
  components: { Breadcrumb, Card, userDetail },
};
Card;
</script>

<style scoped>
</style>
