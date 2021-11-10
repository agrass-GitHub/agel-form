<template>
  <div class="demo">
    <agel-form v-model="form"> </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        span: 16,
        data: {
          demo3: "",
        },
        rules: {
          // demo3: [
          //   {
          //     required: true,
          //     message: "请至少选择一个活动性质",
          //     trigger: "blur",
          //   },
          // ],
        },
        items: {
          demo3: {
            label: "Promise对象",
            component: "el-select",
            options: async () => {
              let data = await this.$http.get("/api/getRandomData");
              return data;
            },
            rules: [
              {
                required: true,
                message: "请至少选择一个活动性质",
                trigger: "change",
              },
            ],
          },
          button2: {
            component: "el-button",
            type: "primary",
            slots: "刷新 options",
            span: 24,
            on: {
              click: () => {
                const vm = this.form.getRef("demo3");
                vm.getOptions();
                vm.focus();
              },
            },
          },
          name: {
            label: "活动名称",
            required: true,
          },
          region: {
            label: "活动区域",
            component: "el-select",
            options: ["区域一", "区域二"],
            rules: {
              required: true,
              message: "请选择活动区域",
              trigger: "change",
            },
          },
          type: {
            label: "活动性质",
            component: "el-checkbox",
            options: [
              "美食/餐厅线上活动",
              "地推活动",
              "线下主题活动",
              "单纯品牌曝光",
            ],
          },
          button: {
            component: "el-button",
            type: "primary",
            slots: "清空验证",
            on: {
              click: () => {
                this.form.resetFields();
                // this.form.validate(
                //   () => this.$message.success("提交成功"),
                //   () => this.$message.error("验证失败")
                // );
              },
            },
          },
        },
      },
    };
  },
};
</script>