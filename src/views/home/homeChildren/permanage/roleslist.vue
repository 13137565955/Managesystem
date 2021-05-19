<template>
  <div>
    <!-- 顶部面包屑 -->
    <breadcrumb>
      <template v-slot:one>权限管理</template>
      <template v-slot:two>角色列表</template>
    </breadcrumb>
    <!-- 卡片中的内容 -->
    <el-card class="box-card">
      <el-button type="primary" @click="addRole">添加角色</el-button>
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
                <el-tag closable @close="delitem(scope.row, item.id)">{{
                  item.authName
                }}</el-tag>
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
                    <el-tag
                      type="success"
                      closable
                      @close="delitem(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      closable
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      @close="delitem(scope.row, item3.id)"
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
              @click="editorRole(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="delrole(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              @click="assignpermission(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色弹窗 -->
    <addrole ref="addRole" />
    <!-- 编辑角色弹窗 -->
    <editor-role ref="editorRole" :editor="editor" />
    <!-- 分配角色权限弹窗 -->
    <assign-permission ref="assignpermission" :assignRloeId="assignRloeId" />
  </div>
</template>

<script>
import Breadcrumb from "components/common/Breadcrumb";
import Addrole from "./children/addrole.vue";
import EditorRole from "./children/editorRole.vue";
import AssignPermission from "./children/assignPermission.vue";
export default {
  name: "roleslist",
  components: { Breadcrumb, Addrole, EditorRole, AssignPermission },
  data() {
    return {
      // 角色列表数据
      rolesData: [],
      editor: { id: 0, roleName: "", roleDesc: "" },
      // 点击分配权限的角色ID
      assignRloeId: "",
    };
  },
  created() {
    this.getrolesList();
  },
  methods: {
    // 点击分配权限
    assignpermission(row) {
      // 吧ID赋值
      this.assignRloeId = row.id;
      this.$refs.assignpermission.getassign();
      // 吧三级权限id加进去
      this.$refs.assignpermission.getdefkeys(
        row,
        this.$refs.assignpermission.defkeys
      );
      this.$refs.assignpermission.assignVisible = true;
    },
    // 编辑角色
    editorRole(row) {
      // console.log(row);
      this.editor.id = row.id;
      this.editor.roleName = row.roleName;
      this.editor.roleDesc = row.roleDesc;
      // console.log(this.editor);
      this.$refs.editorRole.editorRoleVisible = true;
    },
    // 删除角色
    async delrole(id) {
      this.$confirm("此操作将永久删除此角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(`roles/${id}`);
          if (res.meta.status != 200)
            return this.$message.error("删除角色失败！");
          this.$message.success("删除角色成功！");
          this.getrolesList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加角色弹窗
    addRole() {
      this.$refs.addRole.addRoleVisible = true;
    },
    // 删除三级标签权限
    delitem(role, item3) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // console.log(role.id, item3);
          const { data: res } = await this.$http.delete(
            `roles/${role.id}/rights/${item3}`
          );
          // console.log(res);
          if (res.meta.status != 200)
            return this.$message({
              type: "error",
              message: "删除失败!",
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });

          role.children = res.data;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
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
