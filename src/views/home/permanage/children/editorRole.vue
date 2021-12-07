<template>
  <div>
    <el-dialog
      title="添加角色"
      :visible.sync="editorRoleVisible"
      width="50%"
      @close="dialogclose"
    >
      <el-form :model="editor" label-width="100px" status-icon ref="ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editor.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editor.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editorRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="editorRoleValid()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addrole",
  data() {
    return {
      editorRoleVisible: false,
    };
  },
  props: {
    editor: {
      type: Object,
      default: {
        return: {},
      },
    },
  },
  methods: {
    // 点击确定编辑角色
    async editorRoleValid() {
      const { data: res } = await this.$http.put(
        `roles/${this.editor.id}`,
        this.editor
      );
      console.log(res);
      if (res.meta.status != 200) return this.$message.error("编辑角色失败！");
      this.$message.success("编辑角色成功！");
      this.editorRoleVisible = false;
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
