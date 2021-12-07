<template>
  <el-container>
    <!-- 头部的布局 -->
    <el-header class="header">
      <div class="header_left">
        <img src="~assets/img/logo.png" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="homeExit">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="iscollapse ? '63px' : '200px'">
        <div class="leftAnimation" :label="iscollapse" @click="leftAnimation">
          |||
        </div>
        <!-- 左侧的布局 -->
        <!-- 收起动画collapse -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse-transition="false"
          :collapse="iscollapse"
          :router="true"
          :default-active="$route.path"
        >
          <!-- :default-active=" '/' + saveSessionPath" -->
          <!-- index 绑定后要加''是因为他要求传入字符串 -->
          <el-submenu
            :index="item.order + ''"
            v-for="(item, index) in LeftList.data"
            :key="item.id"
          >
            <template slot="title">
              <i class="iconfont" :class="icons[index]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单    -->
            <!-- 不要忘记在前面加 / 然无法跳转 -->
            <el-menu-item
              :index="'/' + item2.path"
              v-for="item2 in item.children"
              :key="item2.id"
              @click="savePath(item2.path)"
            >
              <i class="el-icon-menu"></i>
              {{ item2.authName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 不要忘记写 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getasideLeft } from "network/asideLeft";
export default {
  name: "home",
  components: {},
  created() {
    this.getasideLeft();
  },
  updated() {
    // 设置选中颜色
    this.saveSessionPath = sessionStorage.getItem("savePath");
  },
  data() {
    return {
      LeftList: {},
      //文字图标
      icons: [
        "icon-users",
        "icon-tijikongjian",
        "icon-shangpin",
        "icon-danju",
        "icon-baobiao",
      ],
      //是否折叠
      iscollapse: false,
      saveSessionPath: "",
    };
  },
  methods: {
    // 点击退出按钮
    homeExit() {
      //清除token并且跳转登录页面
      window.sessionStorage.clear();
      this.$message.success("退出成功！");
      this.$router.push("/login");
    },
    //点击收起导航栏
    leftAnimation() {
      this.iscollapse = !this.iscollapse;
    },
    //网络请求左侧页面
    getasideLeft() {
      getasideLeft().then((res) => {
        this.LeftList = res;
        // console.log(this.LeftList);
      });
    },
    //保存路径让二级导航栏显示选中
    savePath(savePath) {
      sessionStorage.setItem("savePath", savePath);
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 74px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  padding-left: 0;
  background-color: #373d41;
}
.header_left {
  display: flex;
  align-items: center;
}
.header_left img {
  width: 50px;
  height: 50px;
}
.header_left span {
  margin-left: 15px;
}
.el-container {
  height: 100%;
  background-color: #eaedf1;
}
.el-main {
  background-color: #eaedf1;
  margin-bottom: 60px;
}
.iconfont {
  margin-right: 10px;
}
.leftAnimation {
  display: flex;
  justify-content: center;
  color: #eee;
  background-color: #4a5064;
  /* 文字间隔 */
  letter-spacing: 0.15em;
  /* 移入变手势 */
  cursor: pointer;
}
.el-menu {
  border-right: 0;
}
.el-aside {
  height: 100%;
  background: #333744;
}
</style>
