<template>
  <div class="demo border">
    <agel-form v-model="form"> </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        labelWidth: "80px",
        span: 15,
        data: {
          name: "使用 agel-form",
          desc:
            "素人开发,若你决定尝试,有什么问题可以联系本人微信:agrass-weixin",
          delivery: true,
          slider: 20,
        },
        items: [
          { label: "活动名称", prop: "name" },
          { label: "建议反馈", prop: "desc", type: "textarea" },
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
          },
        ],
      },
    };
  },
};
</script>