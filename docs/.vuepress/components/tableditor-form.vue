<template>
  <div class="demo border">
    <agel-form v-model="form">
      <!-- 可使用 agel-form 的操作列组件使用，或者自定义 el-table-column  -->
      <tableditor-menu-column slot="append" :data="form.data"></tableditor-menu-column>
    </agel-form>
    <div style="margin-top:10px">
      <el-button @click="validateRow">验证第三行表单</el-button>
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
          { type: "selection", align: "center", width: "50px" },
          { label: "#", type: "index", align: "center", width: "50px" },
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
            formatter: (row, column, cellValue, index) => {
              return cellValue ? "即时" : "延时";
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
            console.log(selection);
            this.$message.info(`已选取${selection.length}条数据`);
          },
        },
      },
    };
  },
  methods: {
    validateRow() {
      // agel-form-tableditor 实例
      this.form.getRef("elLayout").validateRow(2, () => {
        this.$message.success("验证成功");
      });
    },
    getRef() {
      console.log("---------- Form 实例 ----------");
      console.log(this.form.getRef("elForm"));
      console.log("---------- Table 实例 ----------");
      console.log(this.form.getRef("elTable"));
      console.log("---------- 组件实例，若存在多个为数组----------");
      console.log(this.form.getRef("name"));
      this.$message.info("获取实例成功，查看控制台");
    },
  },
};
</script>