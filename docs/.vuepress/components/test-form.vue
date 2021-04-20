<template>
  <agel-form v-model="form" class="demo"></agel-form>
</template>
 
<script>
export default {
  name: "upload-form",
  data() {
    return {
      form: {
        labelWidth: "100px",
        span: 18,
        data: {
          x1: "111111111",
        },
        items: {
          // button: {
          //   component: "el-button",
          //   slots: "刷新",
          //   on: {
          //     click: () => {
          //       this.form.getRef("select").getOptions();
          //     },
          //   },
          // },
          // radio: {
          //   component: "el-radio",
          //   label: "选择",
          //   options: this.getOp,
          //   slots: (h, { value }) => {
          //     return <span>{value}</span>;
          //   },
          // },
          // checkbox: {
          //   component: "el-checkbox",
          //   label: "选择",
          //   options: this.getOp,
          // },
          // select: {
          //   label: "测试",
          //   component: "el-select",
          //   clearable: true,
          //   show: false,
          //   display: true,
          //   options: this.getOp,
          //   span: 12,
          // },
          girlfriend: {
            component: "el-radio",
            label: "是否有女朋友",
            options: [
              { label: "有", value: true },
              { label: "无", value: false },
            ],
            vif(data) {
              return true;
            },
          },
          girlfriendName: {
            component: "el-input",
            label: "女朋友名字",
            // 当 data.girlfriend 为 true 时显示
            vif(data) {
              console.log(data);
              return data.girlfriend === true;
            },
          },
        },
      },
    };
  },
  methods: {
    getOp() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([Math.random(), Math.random(), Math.random()]);
        }, 2000);
      });
    },
  },
};
</script>

