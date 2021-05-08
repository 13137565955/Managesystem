<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary"><slot name="btn"></slot></el-button>
          </div>
        </el-col>
      </el-row>
      <el-row><slot name="content"></slot></el-row>
      <el-row><slot name="footer"></slot></el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "card",
  components: {},
};
</script>

<style scoped>
</style>
