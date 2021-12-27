<template>
  <el-form :model="form.data" >
    <agel-form-grid :span="6" :items="form.items" :data="form.data"></agel-form-grid>
  </el-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        span: 15,
        data: {
          xxx: "123",
        },
        items: [
          {
            "label-width": "auto",
            label: "插槽",
          },
          {
            "label-width": "auto",
            label: "插槽",
          },
          {
            "label-width": "auto",
            label: "插槽",
          },
        ],
      },
    };
  },
};
</script>