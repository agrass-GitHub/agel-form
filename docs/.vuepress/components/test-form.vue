<template>
  <agel-form class="demo" v-model="form"> </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        data: {
          grade: "很棒",
        },
        items: {
          grade: {
            component: "el-radio",
            label: "打分",
            options: ["很棒", "很糟糕"],
          },
          good: {
            label: "好评",
            display: (data) => data.grade == "很棒",
          },
          bad: {
            label: "差评",
            display: (data) => data.grade == "很糟糕",
          },
          button: {
            component: "el-button",
            type: "primary",
            slots: "发表评价",
            disabled: (data) => data.grade == "很糟糕",
          },
        },
      },
    };
  },
};
</script>