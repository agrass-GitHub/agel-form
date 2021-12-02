<template>
  <div class="demo border">
    <el-checkbox v-model="form.descriptions">descriptions</el-checkbox>
    <agel-form v-model="form">
      <template v-slot:extra>
        <el-button type="primary" @click="()=>form.validate()">提交</el-button>
      </template>
      <template v-slot:name>
        <div>1111111</div>
      </template>
    </agel-form>

  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        title: "agel-form",
        descriptions: true,
        border: true,
        column: 2,
        span: 13,
        labelStyle: { "min-width": "100px" },
        data: {
          name: "使用 agel-form",
          desc: "素人开发,若你决定尝试,有什么问题可以联系本人微信:agrass-weixin",
          delivery: true,
          slider: 20,
          region: "区域1",
          number: 100,
        },
        items: [
          {
            label: "这是名称",
            prop: "name",
            required: true,
            slot: true,
          },
          {
            label: "建议反馈",
            prop: "desc",
            type: "textarea",
          },
          {
            component: "el-text",
            label: () => {
              return <el-button>测试</el-button>;
            },
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
            vmodel: false,
            on: {
              input: (v) => {
                this.form.data.delivery = v;
              },
            },
          },
          {
            component: "el-slider",
            label: "活动进度",
            prop: "slider",
          },
          {
            component: "el-checkbox",
            label: "活动性质",
            prop: "type",
            options: [
              "美食/餐厅线上活动",
              "地推活动",
              "线下主题活动",
              "单纯品牌曝光",
            ],
          },
          {
            component: "el-radio",
            label: "特殊资源",
            prop: "resource",
            options: ["线上品牌商赞助", "线下场地免费"],
          },
          {
            component: "el-rate",
            label: "活动评分",
            prop: "rate",
          },
          {
            component: "el-upload",
            label: "活动照片",
            prop: "upload",
            listType: "picture-card",
            action: "xx/xx/",
          },
          {
            component: "el-button",
            type: "primary",
            slots: "提交",
            display: () => {
              return !this.form.descriptions;
            },
          },
        ],
      },
    };
  },
};
</script>