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
          slotStyle: {
            label: "插槽 样式",
            component: "agel-map-input",
            slots: "查询", // 按钮插槽
            // slots: {
            //   default: () => {
            //     return <el-tag>wwwwwwwwwww</el-tag>;
            //   },
            //   name: (props) => {
            //     return <span>{props.user}</span>;
            //   },
            // },
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