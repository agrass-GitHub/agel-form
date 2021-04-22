<template>
  <div class="full">
    <el-input-number v-model="form.data.width"></el-input-number>
    <el-checkbox v-model="form.data.show">显示</el-checkbox>
    <agel-form v-show="form.data.show" :style="{width:form.data.width+'px'}" v-model="form"> </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    const h = this.$createElement;
    return {
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
          width: {
            label: "容器宽度",
            component: "el-input-number",
            min: 200,
            max: 2000,
          },
          button: {
            component: "el-button",
            slots: "测试",
            on: {
              click: () => {
                let x = this.form.getItem("width");
                console.log(1, x);
              },
            },
          },
          name: {
            component: "el-select",
            options: [],
            loading: true,
          },
          name1: {
            component: "el-checkbox",
            options: [],
            loading: true,
          },
          name2: {
            component: "el-button",
            slots: h("a", null, "测试"),
          },
          name3: {
            label: "xxx",
          },
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
  /* position: fixed;
  width: 100vw;
  height: 100vh;
  background: #fff; */
  top: 0px;
  left: 0px;
  z-index: 999;
  padding: 20px 20px;
}
.agel-form {
  border: 1px solid #ccc;
}
</style>