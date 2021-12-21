<template>
  <el-table-column v-bind="$attrs" :fixed="fixed" :width="width" :align="align">
    <div slot="header" style="display: flex; align-items: center;justify-content: center;">
      <span style="margin-right:10px">操作</span>
      <el-link size="mini" type="primary" @click="addTableRow">
        <i class="el-icon-plus"></i>
      </el-link>
    </div>
    <template v-slot:default="{row,$index}">
      <el-link size="mini" type="primary" @click="editTableRow(row)">{{row._edit_?'保存':'编辑'}}</el-link>
      <el-link size="mini" type="primary" circle @click="delTableRow($index)">删除</el-link>
    </template>
  </el-table-column>
</template>
 
<script>
export default {
  name: "tableditor-menu-column",
  inheritAttrs: false,
  props: {
    data: Array,
    fixed: {
      type: String,
      default: "right",
    },
    align: {
      type: String,
      default: "center",
    },
    width: {
      type: [String, Number],
      default: "100px",
    },
  },
  data() {
    return {};
  },
  methods: {
    editTableRow(row) {
      row._edit_ = !row._edit_;
    },
    addTableRow() {
      this.data.splice(this.data.length, 0, {});
    },
    delTableRow(index) {
      this.data.splice(index, 1);
    },
  },
};
</script>
 
<style lang="scss" >
</style>