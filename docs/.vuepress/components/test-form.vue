<template>
  <div class="demo border">
    <el-input></el-input>
    <agel-form v-model="form">

    </agel-form>
    <div style="margin-top:10px">
      <el-button @click="validateRow">验证某一行表单</el-button>
      <el-button @click="getRef">获取组件实例</el-button>
    </div>
  </div>
</template>
 
<script>
// import { tableditorMenuColumn } from "agel-form"
import { agelSelect } from "../../../src/index";
export default {
  data() {
    return {
      form: {
        data: {
          tags: ["1", "1", "2"],
          obj: { name: "objname" },
        },
        rules: {
          "obj.name": [{ required: true, message: "xxxx" }],
        },
        items: [
          {
            prop: "tags",
            label: "tags",
            component: "agelDynamicTags",
          },
          {
            prop: "obj.name",
            label: "名称",
            component: "agel-map-input",
            "show-overflow-tooltip": true,
          },
          {
            label: "即时配送",
            prop: "delivery",
            required: true,
            rules: [{ required: true, message: "xxxx" }],
            // component: "el-switch",
            // formatter: (row, column, cellValue, index) => {
            //   return cellValue ? "即时" : "延时";
            // },
          },
          {
            label: "活动区域",
            prop: "region",
            rules: { required: true, message: "xxxx" },
            component: agelSelect,
            options: ["区域1", "区域2"],
            width: "150px",
          },
          {
            label: "活动时间",
            prop: "date",
            width: "150px",
            component: "el-date-picker",
            required: true,
          },
        ],
      },
    };
  },
  methods: {
    getRules() {},
    validateRow() {
      // agel-form-tableditor 实例
      console.log(this.form.getRef("layout"));
      this.form.getRef("layout").validateRow(2, () => {
        this.$message.success("验证成功");
      });
    },
    getRef() {
      console.log("---------- Table 实例 ----------");
      console.log(this.form.getRef("elTable"));
      console.log("----- 组件实例，index 为 2 prop 为 name 组件----");
      console.log(this.form.getRef("tableditor.2.name"));
      this.$message.info("获取实例成功，查看控制台");
    },
  },
};
</script>