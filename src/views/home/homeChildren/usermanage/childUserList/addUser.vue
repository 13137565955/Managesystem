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
import { putUser } from "network/detailUserList";
export default {
  name: "addUser",
  data() {
    // 自定义验证规则
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
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
    // // //点击按钮  添加用户
    // addUsers() {
    //   this.$refs.ruleForm.validate((res) => {
    //     // console.log(res);
    //     if (!res) {
    //       this.$message.error("添加用户失败");
    //     } else {
    //       // 网络请求
    //       putUser(this.addForm).then((res) => {
    //         console.log(res);
    //       });
    //     }
    //   });
    // },
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
  // components: { putUser },
};
</script>

<style scoped>
</style>
