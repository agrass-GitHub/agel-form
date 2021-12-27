<template>
  <div class="demo border">
    <agel-form v-model="form">
      <!-- 可使用 agel-form 的操作列组件使用，或者自定义 el-table-column  -->
      <tableditor-menu-column slot="append" :data="form.data"></tableditor-menu-column>
    </agel-form>
    <div style="margin-top:10px">
      <el-button @click="validate">验证</el-button>
      <el-button @click="getTableRef">获取 table vue 实例</el-button>
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
        labelWidth: "80px",
        span: 15,
        data: [
          {
            name: "使用 agel-form 使用 agel-form",
            delivery: true,
            _edit_: false,
          },
          {
            name: "使用 agel-form",
            delivery: false,
          },
          {
            name: "使用 agel-form",
            delivery: true,
          },
          {
            name: "使用 agel-form",
            delivery: true,
          },
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
            component: "el-switch",
            label: "即时配送",
            prop: "delivery",
            formatter: (row, column, cellValue, index) => {
              return cellValue ? "即时" : "延时";
            },
          },
          {
            component: "el-select",
            label: "活动区域",
            options: ["区域1", "区域2"],
            width: "150px",
            prop: "region",
          },
          {
            component: "el-date-picker",
            label: "活动时间",
            prop: "date",
            width: "150px",
          },
        ],
        on: {
          "selection-change": (selection) => {
            console.log(selection);
            this.$message.info(`已选取${selection.length}条数据`);
          },
        },
      },
    };
  },
  methods: {
    validate() {
      this.form.validate();
    },
    getTableRef() {
      console.log("---------- table实例 ----------");
      console.log(this.form.getRef("layout:tableditor"));
      console.log("---------- 组件实例，若存在多个为数组----------");
      console.log(this.form.getRef("name"));
      this.$message.info("获取实例成功，查看控制台");
    },
  },
};
</script>