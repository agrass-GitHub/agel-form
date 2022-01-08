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
          {{scope.row._edit_!==false?'保存':'编辑'}}
        </el-link>
        <slot name="del">
          <el-link size="mini" type="primary" style="margin:0px 3px" @click="delRow(scope)">删除</el-link>
        </slot>
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
    }
  },
  methods: {
    // 编辑保存行
    editRow(scope) {
      if (scope.row._edit_) {
        this.tableditor.validateRow(scope.$index, () => {
          this.doneCallBack(scope, this.edit, () => (scope.row._edit_ = false))
        })
      } else {
        scope.row._edit_ = true
      }
    },
    // 添加行
    addRow(scope) {
      this.doneCallBack(scope, this.add, (newRow = {}) => {
        newRow._key_ = Date.now()
        this.tableditor.tableData.splice(
          this.tableditor.tableData.length,
          0,
          newRow
        )
      })
    },
    // 删除行
    delRow(scope) {
      const done = () => {
        this.doneCallBack(scope, this.del, () =>
          this.tableditor.tableData.splice(scope.$index, 1)
        )
      }
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
          .then(done)
      } else {
        done()
      }
    },
    doneCallBack(scope, done, doneCallBack) {
      if (typeof done == "function") {
        if (scope.row && scope.row._loading_ === undefined) {
          this.$set(scope.row, "_loading_", false)
        }
        scope.row && (scope.row._loading_ = true)
        done(scope, (params) => {
          scope.row && (scope.row._loading_ = true)
          doneCallBack(params)
        })
      } else {
        doneCallBack()
      }
    },
  },
  install(vue) {
    vue.component(this.name, this)
  },
}
</script>
 
