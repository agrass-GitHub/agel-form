<template>
  <agel-form class="demo border" v-model="form"></agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        span: 24,
        data: {},
        items: {
          name: {
            label: "xx",
          },
          slotStyle: {
            label: "插槽 样式",
            component: "el-checkbox",
            options: ["感觉", "非常", "灵活"],
            slots: {
              option: ({ option, index }) => {
                return (
                  <el-tag>
                    {index}：{option.label}
                  </el-tag>
                );
              },
            },
          },
          button: {
            component: "el-button",
            type: "primary",
            slots: "刷新 options",
            span: 24,
          },
        },
      },
    };
  },
};
</script>