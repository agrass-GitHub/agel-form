<template>
  <agel-form class="demo" v-model="form"> </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        layout: "tableditor",
        data: [
          {
            grade: "很棒",
          },
          {
            grade: "很棒",
          },
        ],
        items: [
          {
            prop: "grade",
            component: "el-radio",
            label: "打分",
            options: ["很棒", "很糟糕"],
          },
          {
            prop: "good",
            label: "好评",
            display: () => this.form.data[0].grade == "很棒",
          },
          {
            prop: "bad",
            label: "差评",
            show: (data) => data.grade == "很糟糕",
          },
          {
            component: "el-button",
            label: "评价",
            type: "primary",
            slots: "发表评价",
            disabled: (data) => data.grade == "很糟糕",
          },
        ],
      },
    };
  },
};
</script>