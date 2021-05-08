<template>
  <div>
    <!-- 表格中的内容 -->
    <el-table :data="detailData" border style="width: 100%" stripe>
      <el-table-column type="index" label="#" width="50px"> </el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <!-- 状态需要拿到一行中的内容 -->
      <el-table-column prop="mg_state" label="状态">
        <template v-slot:default="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="mg_state_change(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="210px">
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="danger" icon="el-icon-delete"></el-button>
        <el-tooltip :enterable="false" content="分配权限" placement="top">
          <el-button type="warning" icon="el-icon-s-tools"></el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>
    <!-- 下面的翻页部分 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="totalData.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="totalData.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
//请求网络
import { getdetailUserList, putdetailState } from "network/detailUserList.js";
export default {
  name: "userDetail",
  components: { getdetailUserList, putdetailState, Axios },
  data() {
    return {
      status: 0,
      totalData: {
        query: "",
        //当前页数
        pagenum: 1,
        //每页显示多少数据
        pagesize: 2,
      },
      total: 0,
      state: "",
      detailData: [],
    };
  },
  created() {
    //把需要的参数从请求中传入进来
    const data = this.totalData;
    this.getdetailUserList(data.query, data.pagenum, data.pagesize);
  },
  methods: {
    //监听 pagesize 每页显示几行数据
    handleSizeChange(newsize) {
      this.totalData.pagesize = newsize;
      //发生改变后重新发起网络请求
      const res = this.totalData;
      this.getdetailUserList(res.query, res.pagenum, res.pagesize);
    },
    //监听页码值 改变事件
    handleCurrentChange(newpage) {
      // console.log(newpage);
      this.totalData.pagenum = newpage;
      //发生改变后重新发起网络请求
      const data = this.totalData;
      this.getdetailUserList(data.query, data.pagenum, data.pagesize);
    },
    //点击按钮切换用户状态  出现弹框
    mg_state_change(userinfo) {
      console.log(userinfo);
      Axios.put(
        "http://127.0.0.1:8888/api/private/v1/users/500/state/true"
      ).then((res) => {
        console.log(res);
      });
      // this.$message.success("状态修改成功！！！");
    },
    //网络请求
    getdetailUserList(query, pagenum, pagesize) {
      getdetailUserList(query, pagenum, pagesize).then((res) => {
        // console.log(res);
        this.status = res.meta.status;
        if (this.status == 200) {
          this.detailData = res.data.users;
          this.total = res.data.total;
          this.totalData.pagenum = res.data.pagenum;
          // console.log(this.detailData);
        } else {
          this.$message.error("获取用户列表失败！！！");
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
