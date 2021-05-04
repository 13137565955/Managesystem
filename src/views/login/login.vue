<template>
  <div class="login_container">
    <!-- 布局部分 -->
    <div class="login_box">
      <div class="login_logo">
        <img src="~assets/img/logo.png" alt />
      </div>
      <!-- 表单部分 -->
      <el-form ref="loginForm" :model="ruleForm" :rules="rules" class="login_form">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock"  placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="login_btns">
          <el-button type="primary"  @click="register">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getLogin} from 'network/login.js';
export default {
  name: "login",
  components: {},
  data() {
    return {
      result: {},
      // 绑定初始用户密码
      ruleForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        // 验证规则
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 4, max: 15, message: "长度在 4 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //登录校验
    register() {
      //对整个表单进行校验的方法
      this.$refs.loginForm.validate(valid => {
        if (!valid) return;
        //查看是否请求成功
        const username = this.ruleForm.username
        const password = this.ruleForm.password
        getLogin(username,password).then(res =>{
          this.result = res
          if(this.result.meta.status == 200){
          this.$message({
            message: '登录成功！',
            type: 'success'
          })}else{
            this.$message.error('登陆失败，用户名或密码错误！！！')
          }
          //把token存储在sessionStorage中
          window.sessionStorage.setItem('token',this.result.data.token)
          this.$router.push('/home')
        })
      })
    },
    //重置按钮
    reset() {
      //点击可以重置表单  resetFields函数
      this.$refs.loginForm.resetFields()
    }
  }
};
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  background-color: #fff;
  width: 450px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_logo {
  width: 150px;
  height: 150px;
  padding: 10px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #fff;
  box-shadow: 0 0 10px #eee;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.login_logo img {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #eee;
  background-color: #eee;
}
.login_btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 20px;
}
</style>
