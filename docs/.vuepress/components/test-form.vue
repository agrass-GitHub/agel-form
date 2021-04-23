<template>
  <div class="demo">
    <agelRadio v-model="value" :options="options"></agelRadio>
  </div>
</template>
 
<script>
import { agelRadio } from "../../../src";
export default {
  components: {
    agelRadio,
  },
  data() {
    const h = this.$createElement;
    return {
      value: "活动",
      options: ["活动", "名称"],
      form: {
        responsive: true,
        label: "活动名称",
        labelWidth: "120px",
        data: {
          show: true,
          width: 1000,
          delivery: true,
          file: [{ name: "活动清单.xlsx", url: "xxx.jpg" }],
        },
        items: {
          name: {},
        },
      },
    };
  },
  methods: {
    submit() {
      this.form.validate(() => {
        this.$message.success("成功");
      });
    },
    rest() {
      this.form.resetFields();
    },
  },
};
</script>
