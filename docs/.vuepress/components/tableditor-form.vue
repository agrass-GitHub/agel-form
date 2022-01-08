<template>
  <div class="demo border">
    <agel-form v-model="form">
      <el-table-column slot="prepend" label="#" type="selection" align="center" :width="50"></el-table-column>
      <tableditor-menu-column slot="append" :add="addRow" :edit="saveRow" :del="delRow" delConfirm></tableditor-menu-column>
    </agel-form>
    <div style="margin-top:10px">
      <el-button @click="validateRow">验证某一行表单</el-button>
      <el-button @click="getRef">获取组件实例</el-button>
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
            name: "使用 agel-form 使用 agel-form",
            delivery: true,
            _edit_: false,
          },
          {
            name: "使用 agel-form 使用 agel-form",
            delivery: true,
            _edit_: false,
          },
          { name: "", delivery: false },
          { name: "", delivery: true },
          { name: "", delivery: true },
        ],
        items: [
          {
            label: "名称",
            prop: "name",
            required: true,
            width: "150px",
            "show-overflow-tooltip": true,
          },
          {
            label: "即时配送",
            prop: "delivery",
            component: "el-switch",
            // 在 row._edit_ = false 渲染，对 el-table-column formatter 进行了加强支持，可返回 Vnode，
            formatter: (row, column, cellValue, index) => {
              return (
                <el-tag disable-transitions>
                  {cellValue ? "即时配送" : "延时配送"}
                </el-tag>
              )
            },
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
      done({ name: "新增了" + Date.now() })
    },
    saveRow(scope, done) {
      console.log(scope.row)
      //此处模拟 http 请求 保存
      setTimeout(() => {
        done()
      }, 2000)
    },
    delRow(scope, done) {
      console.log(scope.row)
      //此处模拟 http 请求 删除
      setTimeout(() => {
        done()
      }, 2000)
    },
    validateRow() {
      this.form.getRef("agLayout").validateRow(2, () => {
        this.$message.success("验证成功")
      })
    },
    getRef() {
      console.log("---------- Table 实例 ----------")
      console.log(this.form.getRef("elTable"))
      console.log("----- 组件实例，index 为 2 prop 为 name 组件----")
      console.log(this.form.getRef("tableditor.2.name"))
      this.$message.info("获取实例成功，查看控制台")
    },
  },
}
</script>