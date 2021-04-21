<template>
  <div class="full">
    <agel-form :style="{width:form.data.width+'px'}" v-model="form"> </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        responsive: true,
        label: "活动名称",
        labelWidth: "120px",
        data: {
          width: 1000,
          name: "agel-form",
          delivery: true,
          file: [{ name: "活动清单.xlsx", url: "xxx.jpg" }],
        },
        items: {
          width: {
            label: "容器宽度",
            component: "el-input-number",
            min: 200,
            max: 2000,
          },
          name: {},
          name1: {},
          name2: {},
          name3: {},
          name4: {},
          name5: {},
          name6: {},
          name7: {},
          name8: {},
          name9: {},
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
<style scoped>
.full {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #fff;
  top: 0px;
  left: 0px;
  z-index: 999;
  padding: 20px 20px;
}
.agel-form {
  border: 1px solid #ccc;
}
</style>