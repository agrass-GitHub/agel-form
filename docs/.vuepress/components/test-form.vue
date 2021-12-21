<template>
  <div class="demo border">
    <agel-search-panel class="demo border" :form="search" collapse collapse-button :collapseAlive="collapseAlive">
      <el-button type="text" slot="collapseButton" :slot-scope="collapse">{{collapse?'展开':'折叠'}}</el-button>
      <el-button slot="searchButton">搜索</el-button>
    </agel-search-panel>

    <agel-form v-model="form">
      <tableditor-menu-column slot="append" :data="form.data"></tableditor-menu-column>
    </agel-form>
    <el-row style="margin-top:10px">
      <el-button @click="validate">验证</el-button>
    </el-row>

  </div>
</template>
 
<script>
import tableditorMenuColumn from "../../../src/layout/tableditor-menu-column.vue";
export default {
  components: {
    tableditorMenuColumn,
  },
  data() {
    return {
      collapse: true, // 默认折叠搜索条件
      collapseAlive: ["name1"], // 不被折叠的 prop
      search: {
        data: {},
        items: [
          {
            prop: "name1",
            label: "姓名1",
            required: true,
            component: "el-select",
            multiple: true,
            "allow-create": true,
            filterable: true,
            options: [
              // {
              //   value: "HTML",
              //   label: "HTML",
              // },
              // {
              //   value: "CSS",
              //   label: "CSS",
              // },
              // {
              //   value: "JavaScript",
              //   label: "JavaScript",
              // },
            ],
          },
          { prop: "name2", label: "姓名2", collapseAlive: true },
          { prop: "name3", label: "姓名3" },
          { prop: "name4", label: "姓名4" },
          { prop: "name5", label: "姓名5" },
          { prop: "name6", label: "姓名6" },
          { prop: "name7", label: "姓名7" },
        ],
      },
      form: {
        layout: "tableditor",
        labelWidth: "80px",
        span: 15,
        data: [
          {
            name: "使用 agel-form",
            desc: "素人开发,若你决定尝试,有什么问题可以联系本人微信:agrass-weixin",
            delivery: true,
            slider: 20,
            _edit_: false,
          },
          {
            name: "使用 agel-form",
            desc: "素人开发,若你决定尝试,有什么问题可以联系本人微信:agrass-weixin",
            delivery: true,
            slider: 20,
          },
        ],
        items: [
          {
            type: "expand",
            width: "50px",
            slot: () => {
              return <span>11111111</span>;
            },
          },
          { type: "selection", align: "center", width: "50px" },
          { label: "#", type: "index", align: "center", width: "50px" },
          {
            label: "建议反馈",
            prop: "desc",
            required: true,
            "show-overflow-tooltip": true,
          },
          {
            component: "el-input-number",
            label: "活动人数",
            prop: "number",
          },
          {
            component: "el-select",
            label: "活动区域",
            options: ["区域1", "区域2"],
            prop: "region",
          },
          {
            component: "el-date-picker",
            label: "活动时间",
            prop: "date",
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
            component: "el-slider",
            label: "活动进度",
            prop: "slider",
          },
          // {
          //   component: "el-checkbox",
          //   label: "活动性质",
          //   prop: "type",
          //   options: [
          //     "美食/餐厅线上活动",
          //     "地推活动",
          //     "线下主题活动",
          //     "单纯品牌曝光",
          //   ],
          // },
          // {
          //   component: "el-radio",
          //   label: "特殊资源",
          //   prop: "resource",
          //   options: ["线上品牌商赞助", "线下场地免费"],
          // },
          {
            component: "el-rate",
            label: "活动评分",
            prop: "rate",
            defaultValue: 3,
          },
          // {
          //   component: "el-upload",
          //   label: "活动照片",
          //   prop: "upload",
          //   listType: "picture-card",
          //   action: "xx/xx/",
          // },
        ],
        on: {
          "selection-change"(selection) {
            console.log(selection);
          },
        },
      },
    };
  },
  methods: {
    validate() {
      //  this.form.validate()
      console.log(this.form.getRef("tableditor"));
    },
  },
};
</script>