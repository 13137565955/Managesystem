<template>
  <div>
    <el-card class="box-card">
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <!-- 添加用户 -->
      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>
      <el-table :data="goods" border stripe>
        <el-table-column type="index" label="#" width="50px"> </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
          width="800px"
        ></el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格(元)"
        ></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
        <el-table-column prop="upd_time" label="创建时间"></el-table-column>
        <el-table-column prop="level" label="操作"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { formatDate } from "components/common/common";
import { getshopList } from "network/shopManage.js";
export default {
  name: "shopDetail",
  components: { getshopList, formatDate },
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
      goods: [],
    };
  },
  created() {
    this.getshopListNet();
    // this.updateTime();
  },
  updated() {
    this.updateTime();
  },
  methods: {
    //网络请求 商品列表
    getshopListNet() {
      const data = this.totalData;
      getshopList(data.query, data.pagenum, data.pagesize).then((res) => {
        // console.log(res);
        this.status = res.meta.status;
        if (this.status == 200) {
          this.total = res.data.total;
          this.totalData.pagenum = res.data.pagenum;
          this.goods = res.data.goods;
          // console.log(this.goods);
        } else {
          this.$message.error("获取商品列表失败！！！");
        }
      });
    },
    // 时间转换
    updateTime() {
      //时间传转换
      for (let item of this.goods) {
        let date = new Date(item.upd_time * 1000);
        let res = formatDate(date, "yyyy-MM-dd");
        item.upd_time = res;
      }
    },
  },
};
</script>

<style scoped>
</style>
