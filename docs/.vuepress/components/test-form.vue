<template>
  <div class="demo border">
    <agel-form v-model="form"> </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        labelWidth: "80px",
        span: 15,
        data: {
          fuwenben: "",
        },
        items: [
          {
            label: "富文本",
            prop: "fuwenben",
            component: "el-button",
            type: "primary",
            slots: "验证",
            required:true,
            on: {
              click: () => {
                this.form.validate();
              },
            },
          },
        ],
      },
    };
  },
};
</script>