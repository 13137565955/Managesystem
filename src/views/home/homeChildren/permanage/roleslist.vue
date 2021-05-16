<template>
  <div>
    <!-- 顶部面包屑 -->
    <breadcrumb>
      <template v-slot:one>权限管理</template>
      <template v-slot:two>角色列表</template>
    </breadcrumb>
    <!-- 卡片中的内容 -->
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="rolesData" border stripe>
        <!-- 展开列表 -->
        <el-table-column type="expand">
          <template v-slot:default="scope">
            <!-- 一级权限 -->
            <el-row
              :class="[
                'bdbottom',
                index1 == 0 ? 'bdtop' : '',
                'vcenter',
                'bdleft',
                'bdright',
              ]"
              v-for="(item, index1) in scope.row.children"
              :key="item.id"
            >
              <el-col :span="5" class="center">
                <el-tag closable>{{ item.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 二级和三级权限 -->
                <!-- 通过 for 循环 嵌套渲染二级权限 -->
                <el-row
                  :class="['bdleft', 'vcenter']"
                  v-for="item2 in item.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag type="success" closable>{{
                      item2.authName
                    }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      closable
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#" width="50px"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column prop="" label="操作">
          <template v-slot:default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="changeUser(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="delUser(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              @click="allocation(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/Breadcrumb";
export default {
  name: "roleslist",
  components: { Breadcrumb },
  data() {
    return {
      rolesData: [],
    };
  },
  created() {
    this.getrolesList();
  },
  methods: {
    // 网络请求权限列表
    async getrolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status != 200)
        return this.$message.error("请求权限列表失败！");
      this.rolesData = res.data;
      // console.log(this.rolesData);
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}
.bdleft {
  border-left: 1px solid #eee;
}
.bdright {
  border-right: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
.center {
  text-align: center;
}
</style>
