<template>
  <div>
    <!-- 顶部面包屑 -->
    <breadcrumb>
      <template v-slot:one>角色管理</template>
      <template v-slot:two>权限列表</template>
    </breadcrumb>
    <!-- 卡片中的内容 -->
    <el-card class="box-card">
      <!-- 表格内容 -->
      <el-table :data="permissionData" border stripe>
        <el-table-column type="index" label="#" width="50px"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot:default="scope">
            <el-tag v-if="scope.row.level == 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level == 1"
              >二级</el-tag
            >
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/Breadcrumb";
export default {
  name: "permissionsList",
  components: { Breadcrumb },
  data() {
    return {
      permissionData: [],
    };
  },
  created() {
    this.getPermissionList();
  },
  methods: {
    // 网络请求权限列表
    async getPermissionList() {
      const { data: res } = await this.$http.get("rights/list");
      if (res.meta.status != 200)
        return this.$message.error("请求权限列表失败！");
      this.permissionData = res.data;
      // console.log(this.permissionData);
    },
  },
};
</script>

<style scoped>
</style>
