<template>
  <el-table-column v-bind="$attrs" :fixed="fixed" :width="width" :align="align">
    <div slot="header" style="display: flex; align-items: center;justify-content: center;">
      <span style="margin-right:10px">操作</span>
      <el-link v-if="add" size="mini" type="primary" @click="addTableRow">
        <i class="el-icon-plus"></i>
      </el-link>
    </div>
    <template v-slot:default="{row,$index}">
      <el-link v-if="edit" size="mini" type="primary" style="margin:0px 3px" @click="editTableRow(row,$index)">{{row._edit_!==false?'保存':'编辑'}}
      </el-link>
      <el-link v-if="del" size="mini" type="primary" style="margin:0px 3px" @click="delTableRow($index)">删除</el-link>
      <slot></slot>
    </template>
  </el-table-column>
</template>
 
<script>
export default {
  name: "tableditor-menu-column",
  inheritAttrs: false,
  inject: ["validateRow"],
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
      default: 100,
    },
    add: {
      type: Boolean,
      default: true,
    },
    edit: {
      type: Boolean,
      default: true,
    },
    del: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    editTableRow(row, inedx) {
      if (!row.hasOwnProperty("_edit_")) {
        this.$set(row, "_edit_", true);
        return;
      }
      if (row._edit_) {
        this.validateRow(inedx, () => {
          row._edit_ = false;
          this.$emit("save");
        });
      } else {
        row._edit_ = true;
      }
    },
    addTableRow() {
      this.data.splice(this.data.length, 0, {});
      this.$emit("add");
    },
    delTableRow(index) {
      this.data.splice(index, 1);
      this.$emit("del");
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
 
