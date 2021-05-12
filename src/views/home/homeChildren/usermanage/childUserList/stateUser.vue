<template>
  <div>
    <el-dialog
      title="修改用户角色"
      :visible.sync="statedialogVisible"
      width="50%"
      @close="dialogclose"
    >
      <div>
        <div class="interval">当前的用户：{{ staterow.admin }}</div>
        <div class="interval">当前的角色：{{ staterow.role_name }}</div>
        <div class="interval">
          <span>分配新角色：</span>
          <span>
            <el-select v-model="region" placeholder="请选择">
              <el-option
                v-for="item in statedata"
                :key="item.id"
                :value="item.name"
              ></el-option>
            </el-select>
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="statedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="stateValid()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "stateUser",
  data() {
    return {
      statedialogVisible: false,
      region: "",
      statedata: [
        { id: 0, name: "超级管理员" },
        { id: 30, name: "主管" },
        { id: 1, name: "成员" },
        { id: 31, name: "测试角色" },
      ],
      res: 30,
    };
  },
  props: {
    staterow: {
      type: Object,
      default: {
        return: {},
      },
    },
  },
  methods: {
    async stateValid() {
      if (this.region == "") {
        this.$message.error("用户角色不能为空！");
      } else {
        let rid = null;
        switch (this.region) {
          case "超级管理员": //这里是值对应的处理
            rid = -1;
            break;
          case "主管": //这里是值对应的处理
            rid = 30;
            break;
          case "成员": //这里是值对应的处理
            rid = 1;
            break;
          case "测试角色": //这里是值对应的处理
            rid = 31;
            break;
          default:
            break;
        }
        const {
          data: res,
        } = await this.$http.put(`users/${this.staterow.id}/role`, { rid });
        if (res.meta.msg == "不允许修改admin账户") {
          this.$message.error("不允许修改admin账户！");
        } else {
          if (res.meta.status == 200) {
            this.$message.success("修改用户成功！");
          } else {
            this.$message.error("修改用户失败！");
          }
        }

        this.$parent.getdetailUserList();
        this.statedialogVisible = false;
      }
    },
    dialogclose() {
      this.region = "";
      // this.$refs.stateruleForm.resetFields();
    },
  },
  components: {},
};
</script>

<style scoped>
.interval {
  margin-bottom: 20px;
  font-size: 16px;
}
</style>
