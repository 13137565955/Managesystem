<template>
  <div>
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleVisible"
      width="50%"
      @close="dialogclose"
    >
      <el-form
        :model="addRoleForm"
        label-width="100px"
        status-icon
        ref="ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleValid()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addrole",
  data() {
    return {
      addRoleVisible: false,
      addRoleForm: { roleName: "", roleDesc: "" },
    };
  },
  methods: {
    // 点击确定添加角色
    async addRoleValid() {
      const { data: res } = await this.$http.post("roles", this.addRoleForm);
      if (res.meta.status != 201) return this.$message.error("添加角色失败！");
      this.$message.success("添加角色成功！");
      this.addRoleVisible = false;
      this.$parent.getrolesList();
    },
    // 关闭清除内容
    dialogclose() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style scoped>
</style>
