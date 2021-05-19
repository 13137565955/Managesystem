<template>
  <div>
    <el-dialog
      title="分配权限"
      :visible.sync="assignVisible"
      width="50%"
      @close="delassign"
    >
      <el-tree
        :data="assign"
        show-checkbox
        :props="defaultProps"
        default-expand-all
        node-key="id"
        :default-checked-keys="defkeys"
        ref="treeRef"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="assignVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignPermissionValid"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "assignPermission",
  components: {},
  data() {
    return {
      // 分配权限树
      assignVisible: false,
      // 树形结构的数据
      assign: [],
      // 绑定树的名字
      defaultProps: {
        children: "children",
        label: "authName",
      },
      // 默认选中节点id数组
      defkeys: [""],
    };
  },
  props: {
    assignRloeId: {
      Type: String,
      default: {
        return: "",
      },
    },
  },
  methods: {
    // 点击确定 吧id都复制给后面  实现分配权限
    async assignPermissionValid() {
      // 以，分隔数组元素 把全选中和人班选中ID和三级id加入数据组
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      const idStr = keys.join(",");
      const { data: res } = await this.$http.post(
        `roles/${this.assignRloeId}/rights`,
        {
          rids: idStr,
        }
      );
      if (res.meta.status !== 200)
        return this.$message.error("获取权限列表失败！");
      this.$message.success("分配权限成功！");
      // 重新请求角色列表
      this.$parent.getrolesList();
      this.assignVisible = false;
    },
    delassign() {
      // 关闭窗口数组清空
      this.defkeys = [];
    },
    // 用递归把三级权限的ID分配到数组中
    getdefkeys(node, arr) {
      // 首先判断是否是三级的 是否有children节点
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((element) => {
        this.getdefkeys(element, arr);
      });
    },
    // 权限树的网路哦请求
    async getassign() {
      const { data: res } = await this.$http.get("rights/tree");
      // console.log(res);
      if (res.meta.status !== 200)
        return this.$message.error("获取权限列表失败！");
      this.assign = res.data;
    },
  },
};
</script>

<style scoped>
</style>
