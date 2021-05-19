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
        <!-- 添加用户 -->
        <el-col :span="4">
          <add-user @getUserList="getdetailUserList" />
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
        <!-- 修改用户 -->
        <el-table-column prop="address" label="操作" width="210px">
          <template v-slot:default="scope">
            <el-tooltip
              :enterable="false"
              content="修改用户信息"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="changeUser(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="删除用户" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delUser(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="分配权限" placement="top">
              <el-button
                type="warning"
                icon="el-icon-s-tools"
                @click="allocation(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
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
    <!-- 修改用户弹窗 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="changedialogVisible"
      width="50%"
      @close="dialogclose"
    >
      <el-form
        :model="changeForm"
        :rules="changerules"
        ref="changeruleForm"
        label-width="100px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="changeForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="changeForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="changeForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changevalidate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户状态弹窗 -->
    <state-user ref="stateUser" :staterow="staterow" :allRole="allRole" />
  </div>
</template>

<script>
//子组件等
import addUser from "./addUser";
import StateUser from "./stateUser.vue";
//公共方法等
import { formatDate, checkEmail, checkMobile } from "components/common/common";
//请求网络
import { getdetailUserList, putdetailState } from "network/detailUserList.js";

export default {
  name: "userDetail",
  components: {
    addUser,
    StateUser,
    formatDate,
    checkEmail,
    checkMobile,
    getdetailUserList,
    putdetailState,
  },
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
      // 修改用户
      changedialogVisible: false,
      changeForm: {},
      // 绑定的验证规则
      changerules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
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
      changeid: 0,
      // 修改用户状态
      staterow: {
        admin: "",
        role_name: "",
        id: 0,
      },
      // 所有角色的数据
      allRole: [],
    };
  },
  created() {
    //把需要的参数从请求中传入进来
    this.getdetailUserList();
  },
  updated() {
    this.updateTime();
  },
  methods: {
    //修改用户状态数据 用户角色
    async allocation(row) {
      // 在展示对话框之前，获取所有角色的列表
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败！");
      }
      this.allRole = res.data;
      // console.log(this.allRole);
      this.$refs.stateUser.statedialogVisible = true;
      this.staterow.admin = row.username;
      this.staterow.role_name = row.role_name;
      this.staterow.id = row.id;
      // console.log(row);
    },
    // 点击删除用户操作
    delUser(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(`users/${id}`);
          if (res.meta.status != 200) {
            if (res.meta.status == 401)
              this.$message.error("权限不足，无法删除用户！");
            else {
              this.$message.error("删除用户失败！");
            }
          } else {
            this.getdetailUserList();
            this.$message.success("删除用户成功！");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击修改用户确定时修改用户数据
    changevalidate() {
      this.$refs.changeruleForm.validate(async (valid) => {
        // console.log(valid);
        if (valid) {
          await this.$http.put(`users/${this.changeid}`, this.changeForm);
          this.$message.success("修改用户成功！");
        } else {
          this.$message.error("修改用户失败！");
        }
      });
      this.changedialogVisible = false;
      this.getdetailUserList();
    },
    //监听修改用户关闭窗口 重置内容
    dialogclose() {
      this.$refs.changeruleForm.resetFields();
      this.getdetailUserList();
    },
    // 监听修改用户操作
    async changeUser(id) {
      this.changedialogVisible = true;
      this.changeid = id;
      const { data: res } = await this.$http.get(`users/${id}`);
      if (res.meta.status != 200) return;
      this.changeForm = res.data;
      // console.log(this.changeForm);
    },
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
    updateTime() {
      //时间传转换
      for (let item of this.detailData) {
        let date = new Date(item.create_time * 1000);
        let res = formatDate(date, "yyyy-MM-dd");
        item.create_time = res;
      }
    },
  },
  filters: {},
};
</script>

<style scoped>
</style>
