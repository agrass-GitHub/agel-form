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
        data: {},
        rules: {
          type: [
            {
              required: true,
              message: "请至少选择一个活动性质",
              trigger: "change",
            },
          ],
        },
        items: {
          name: {
            label: "活动名称",
            required: true, // 等于 rules:{required:true,trigger:'change',message:label+'必填'}
          },
          region: {
            label: "活动区域",
            component: "el-select",
            clearable: true,
            options: ["区域一", "区域二"],
            rules: {
              required: true,
              message: "你还没选区域呢",
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
            slots: "验证",
            on: {
              click: () => {
                this.form.validate(
                  () => this.$message.success("提交成功"),
                  () => this.$message.error("验证失败")
                );
              },
            },
          },
        },
      },
    };
  },
};
</script>