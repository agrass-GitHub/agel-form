<template>
  <agel-form class="demo" v-model="form"></agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        span: 24,
        data: {},
        items: {
          radio: {
            label: "性别",
            component: "el-radio-group",
            options: [
              { label: "男", value: "男" },
              { label: "女", value: "女" },
              { label: "中性", value: "中性" },
            ],
          },
          checkbox: {
            label: "取向",
            component: "el-checkbox-group",
            options: [
              { label: "男", value: "男" },
              { label: "女", value: "女" },
              { label: "中性", value: "中性" },
            ],
          },
          radiobutton: {
            label: "button 样式",
            component: "el-radio-group",
            button: true,
            options: [
              { label: "男", value: "男" },
              { label: "女", value: "女" },
              { label: "中性", value: "中性" },
            ],
          },
        },
      },
    };
  },
};
</script>