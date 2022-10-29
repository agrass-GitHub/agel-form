<template>
  <el-table-column v-bind="$attrs" :width="width" :align="align">
    <template v-slot:header="scope">
      <div style="display: flex; align-items: center;justify-content: center;">
        <span style="margin-right:5px">操作</span>
        <el-link v-if="add" size="mini" type="primary" @click="addRow(scope)">
          <i class="el-icon-plus"></i>
        </el-link>
      </div>
    </template>
    <template v-slot:default="scope">
      <i v-if="scope.row._loading_" class="el-icon-loading"></i>
      <template v-else>
        <el-link v-if="edit" size="mini" type="primary" style="margin:0px 3px" @click="editRow(scope)">
          {{scope.row._view_?'编辑':'保存'}}
        </el-link>
        <el-link v-if="del" size="mini" type="primary" style="margin:0px 3px" @click="delRow(scope)">删除</el-link>
      </template>
    </template>
  </el-table-column>
</template>
 
<script>
export default {
  name: "tableditor-menu-column",
  inheritAttrs: false,
  inject: ["tableditor"],
  props: {
    data: {
      type: Array,
      default: () => new Array(),
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
      type: [Boolean, Function],
      default: true,
    },
    edit: {
      type: [Boolean, Function],
      default: true,
    },
    del: {
      type: [Boolean, Function],
      default: true,
    },
    delConfirm: {
      type: [Boolean, String],
      default: false,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    // 编辑保存行
    editRow(scope) {
      if (scope.row._view_ === undefined) {
        this.$set(scope.row, "_view_", false);
      }
      if (scope.row._view_) {
        scope.row._view_ = false;
      } else {
        this.tableditor.validateRow(scope.$index, () => {
          this.doneCallBack(scope, this.edit, (isok = true) => {
            isok && (scope.row._view_ = true);
          });
        });
      }
    },
    // 删除行
    delRow(scope) {
      const done = () => {
        this.doneCallBack(scope, this.del, (isok = true) => {
          isok && this.data.splice(scope.$index, 1);
        });
      };
      if (this.delConfirm) {
        this.$msgbox
          .confirm(
            this.delConfirm == "string" ? this.delConfirm : "确定删除数据？",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
          .then(done);
      } else {
        done();
      }
    },
    // 添加行
    addRow(scope) {
      this.doneCallBack(scope, this.add, (newRow = {}) => {
        newRow._key_ = Date.now();
        this.data.splice(this.data.length, 0, newRow);
      });
    },
    doneCallBack(scope, done, doneCallBack) {
      if (typeof done == "function") {
        if (scope.row && scope.row._loading_ === undefined) {
          this.$set(scope.row, "_loading_", false);
        }
        scope.row && (scope.row._loading_ = true);
        done((params) => {
          scope.row && (scope.row._loading_ = false);
          doneCallBack(params);
        }, scope);
      } else {
        doneCallBack();
      }
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
 
