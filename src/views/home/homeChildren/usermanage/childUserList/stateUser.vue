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
            <el-select v-model="regionid" placeholder="请选择">
              <el-option
                v-for="item in allRole"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
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
      regionid: "",
      res: 30,
    };
  },
  props: {
    allRole: {
      type: Array,
      default: {
        return: [],
      },
    },
    staterow: {
      type: Object,
      default: {
        return: {},
      },
    },
  },
  methods: {
    async stateValid() {
      // console.log(this.regionid);
      if (this.regionid == "") {
        this.$message.error("用户角色不能为空！");
      } else {
        const { data: res } = await this.$http.put(
          `users/${this.staterow.id}/role`,
          {
            rid: this.regionid,
          }
        );
        // console.log(res);
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
      this.regionid = "";
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
