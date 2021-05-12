<template>
  <div>
    <div class="grid-content bg-purple">
      <el-button type="primary" @click="dialogVisible = true"
        >添加用户</el-button
      >
    </div>
    <el-dialog
      title="添加用户："
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogclose"
    >
      <el-form
        :model="addForm"
        :rules="addrules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsers">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { checkEmail, checkMobile } from "components/common/common";
export default {
  name: "addUser",
  data() {
    return {
      // 点击显示隐藏表单
      dialogVisible: false,
      // 绑定的表单中内容
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 绑定的验证规则
      addrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 15,
            message: "长度在 4 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //监听关闭窗口 重置内容
    dialogclose() {
      this.$refs.ruleForm.resetFields();
    },
    // 点击按钮，添加新用户
    addUsers() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status == 201) {
          this.$message.success("添加用户成功！");
          // 隐藏添加用户的对话框
          this.dialogVisible = false;
          // 重新获取用户列表数据
          this.$emit("getUserList");
        } else if (res.meta.status == 400) {
          this.$message.error("已经存在改用户！");
        } else {
          this.$message.error("添加用户失败！");
        }
      });
    },
  },
  components: { checkEmail, checkMobile },
};
</script>

<style scoped>
</style>
