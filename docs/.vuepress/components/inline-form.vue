<template>
  <agel-form class="demo" v-model="form"></agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        inline: true,
        data: {},
        items: {
          name: { label: "活动名称", style: "width:120px" },
          www: { label: "活动网站" },
          button: {
            component: "el-button",
            type: "primary",
            icon: "el-icon-search",
            slots: "查询",
            on: {
              click: () => {
                this.$message.info("查询");
              },
            },
          },
        },
      },
    };
  },
};
</script>