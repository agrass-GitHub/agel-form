<template>
  <div class="demo border">
    <agel-form v-model="form">
      <el-table-column slot="prepend" label="#" type="selection" align="center" :width="50"></el-table-column>
      <tableditor-menu-column slot="append" :add="addRow" :edit="saveRow" :del="delRow" delConfirm></tableditor-menu-column>
    </agel-form>
    <div style="margin-top:10px">
      <el-button type="primary" @click="validateRow">验证某一行表单</el-button>
      <el-button type="primary" @click="getRef">获取Table组件实例</el-button>
    </div>
  </div>
</template>
 
<script>
// import { tableditorMenuColumn } from "agel-form"
export default {
  data() {
    return {
      form: {
        layout: "tableditor",
        maxHeight: "300px",
        data: [
          {
            name: "表单1",
            delivery: true,
            _edit_: false,
          },
          {
            name: "表单2",
            delivery: true,
            _edit_: false,
          },
          { name: "表单3", delivery: false },
          { name: "表单4", delivery: true },
          { name: "表单5", delivery: true },
        ],
        items: [
          {
            label: "名称",
            prop: "name",
            required: true,
            _edit_: false,
            width: "100px",
            "show-overflow-tooltip": true,
            formatter: (cellValue) => {
              return <el-tag disable-transitions> {cellValue} </el-tag>
            },
          },
          {
            label: "即时配送",
            prop: "delivery",
            component: "el-switch",
            // 在 row._edit_ = false 渲染，对 el-table-column formatter 进行了加强支持，可返回 Vnode，
            // formatter: (cellValue) => {
            //   return (
            //     <el-tag disable-transitions>
            //       {cellValue ? "即时配送" : "延时配送"}
            //     </el-tag>
            //   )
            // },
          },
          {
            component: "el-select",
            label: "活动区域",
            prop: "region",
            required: true,
            component: "el-select",
            options: ["区域1", "区域2"],
            width: "150px",
          },
          {
            label: "活动时间",
            prop: "date",
            component: "el-date-picker",
            width: "150px",
          },
        ],
        on: {
          // 可以触发 el-table event
          "selection-change": (selection) => {
            this.$message.info(`已选取${selection.length}条数据`)
          },
        },
      },
    }
  },
  methods: {
    addRow(scope, done) {
      done({ name: "表单" + (scope.rowIndex + 1) })
    },
    saveRow(scope, done) {
      //此处模拟 http 请求 保存
      setTimeout(() => {
        const isok = (scope.rowIndex + 1) % 2 == 0
        isok
          ? this.$message.success("保存成功")
          : this.$message.error("保存失败,只能保存偶数行")
        done(isok)
      }, 1500)
    },
    delRow(scope, done) {
      //此处模拟 http 请求 删除
      setTimeout(() => {
        this.$message.success("删除成功")
        done()
      }, 1500)
    },
    validateRow() {
      this.form.getRef("agLayout").validateRow(2, () => {
        this.$message.success("验证成功")
      })
    },
    getRef() {
      this.$message.success("获取组件实例成功，查看控制台")
      console.log("---------- el-table 实例 ----------")
      console.log(this.form.getRef("elTable"))
    },
  },
}
</script>