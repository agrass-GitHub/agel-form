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
          user: {
            // component 该属性不填写将默认为 el-input
            label: "审批人",
            style: "width:120px",
          },
          region: {
            component: "el-select",
            label: "活动区域",
            options: ["区域一", "区域二"],
          },
          search: {
            component: "el-button",
            type: "primary",
            icon: "el-icon-search",
            ignore: true, // 表明该组件是一个纯展示组件，属性则不会与表单关联
            slots: "查询", // 按钮插槽
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