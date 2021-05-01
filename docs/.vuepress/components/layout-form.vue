<template>
  <agel-form class="demo" v-model="form"> </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        labelWidth: "80px",
        labelPosition: "right",
        data: {},
        gutter: 5, // 栅格间距
        span: 20, // 全局span
        xs: { span: 24, push: 0 }, // <768px 设置为 24 span
        items: [
          {
            prop: "name",
            label: "姓名",
            span: 10,
          },
          { prop: "region", label: "地址", span: 9, push: 1 },
          { prop: "intor", label: "介绍" },
          {
            prop: "email",
            label: "标签很长很长",
            labelWidth: "135px",
            labelPosition: "left",
          },
        ],
      },
    };
  },
};
</script>