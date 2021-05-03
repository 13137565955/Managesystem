<template>
  <div class="login_container">
    <!-- 布局部分 -->
    <div class="login_box">
      <div class="login_logo">
        <img src="~assets/img/logo.png" alt />
      </div>
      <!-- 表单部分 ref="form" :model="form" v-model="form.name"-->
      <el-form :model="ruleForm" class="login_form">
        <el-form-item>
          <el-input placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="login_btns">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: 123456
      }
    };
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
