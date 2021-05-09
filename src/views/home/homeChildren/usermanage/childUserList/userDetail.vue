<template>
  <div>
    <el-card class="box-card">
      <!-- 顶部搜索等 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="请输入内容"
              v-model="totalData.query"
              clearable
              @clear="getdetailUserList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getdetailUserList"
              ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary">添加用户</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 表格中的内容 -->
      <el-table :data="detailData" border style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="50px"> </el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="create_time" label="创建时间"> </el-table-column>
        <!-- 状态需要拿到一行中的内容 -->
        <el-table-column label="状态">
          <template v-slot:default="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="210px">
          <el-tooltip :enterable="false" content="修改用户信息" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip :enterable="false" content="删除用户" placement="top">
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </el-tooltip>
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
          <!-- size-change：改变每页显示几行数据 
               current-change：改变后还有几页
               current-page：当前的页数
               page-size：每页显示数据
               total：一共有几条数据
          -->
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
//公共方法等
import { formatDate } from "components/common/common";
//请求网络
import { getdetailUserList, putdetailState } from "network/detailUserList.js";
export default {
  name: "userDetail",
  components: { formatDate, getdetailUserList, putdetailState },
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
    this.getdetailUserList();
  },
  updated() {
    //时间传转换
    for (let item of this.detailData) {
      let date = new Date(item.create_time * 1000);
      let res = formatDate(date, "yyyy-MM-dd");
      item.create_time = res;
    }
  },
  methods: {
    //监听 pagesize 每页显示几行数据
    handleSizeChange(newsize) {
      this.totalData.pagesize = newsize;
      //发生改变后重新发起网络请求
      this.getdetailUserList();
    },
    //监听页码值 改变事件
    handleCurrentChange(newpage) {
      // console.log(newpage);
      this.totalData.pagenum = newpage;
      //发生改变后重新发起网络请求
      this.getdetailUserList();
    },
    // //点击按钮切换用户状态  出现弹框
    // 监听 switch 开关状态的改变
    async userStateChanged(userinfo) {
      // console.log(userinfo);
      putdetailState(userinfo.id, userinfo.mg_state).then((res) => {
        // console.log(res);
        if (res.meta.status !== 200) {
          userinfo.mg_state = !userinfo.mg_state;
          return this.$message.error("更新用户状态失败！");
        }
        this.$message.success("更新用户状态成功！");
      });
    },
    //网络请求
    getdetailUserList() {
      const data = this.totalData;
      getdetailUserList(data.query, data.pagenum, data.pagesize).then((res) => {
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
  filters: {},
};
</script>

<style scoped>
</style>
