<template>
  <agel-form class="demo" v-model="form"> </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        "label-position": "right",
        "label-width": "80px",
        data: {},
        gutter: 5, // 栅格间距
        span: 24, // 全局span
        items: {
          name: {
            label: "姓名",
            span: 10,
            placeholder: "设置 span 6",
          },
          region: {
            label: "地址",
            span: 13,
            offset: 1,
            placeholder: "设置 span 13 offset1",
          },
          span: {
            label: "介绍",
            placeholder: "不设置则受全局 form span  label-width 影响",
          },
          labelWidth: {
            label: "标签很长很长",
            "label-width": "135px",
            placeholder: "单独设置 label-width 135px",
          },
        },
      },
    };
  },
};
</script>