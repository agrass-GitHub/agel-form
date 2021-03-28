<template>
  <agel-form class="demo" v-model="form"> </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        labelWidth: "80px",
        data: {},
        gutter: 5, // 栅格间距
        span: 20, // 全局span
        xs: { span: 24, push: 0 }, // <768px 设置为 24 span
        items: {
          name: {
            label: "姓名",
            span: 10,
            placeholder: "设置 span 10",
          },
          region: {
            label: "地址",
            span: 9,
            push: 1,
            placeholder: "设置 span 9 push 1",
          },
          span: {
            label: "介绍",
            placeholder: "不设置则受全局 form 布局属性影响",
          },
          labelWidth: {
            label: "标签很长很长",
            labelWidth: "135px",
            placeholder: "单独设置 labelWidth 135px",
          },
        },
      },
    };
  },
};
</script>