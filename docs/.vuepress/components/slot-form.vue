<template>
  <agel-form class="demo" v-model="form" style="padding:10px;border:1px solid #66b1ffb3;">
    <template slot="template">
      <span>这是一段 template 模板类型自定义插槽</span>
    </template>
  </agel-form>
</template>
 
<script>
export default {
  data() {
    const h = this.$createElement;
    return {
      form: {
        labelWidth: "50px",
        span: 15,
        data: {},
        items: {
          title1: {
            labelWidth: "0px",
            component: "el-divider",
            contentPosition: "left",
            slots: "label slot 使用演示，自定义Form Item Label的插槽",
          },
          label: {
            labelWidth: "100px",
            label: (h) => {
              return h("el-button", {}, "自定义label");
            },
          },
          title2: {
            labelWidth: "0px",
            component: "el-divider",
            contentPosition: "left",
            slots: "slot 使用演示，自定义Form Item的插槽",
          },
          template: { label: "插槽1", slot: true },
          render: {
            label: "插槽2",
            slot: (h) => {
              return h("span", {}, "这是一段 render 函数类型自定义插槽");
            },
          },
          string: {
            label: "插槽3",
            slot: "这是一段 string 类型自定义插槽",
          },
          vnode: {
            label: "插槽4",
            slot: h("span", {}, "这是一段 vnode 对象类型自定义插槽"),
          },
          title3: {
            labelWidth: "0px",
            component: "el-divider",
            contentPosition: "left",
            slots: "slots 使用演示 ，自定义组件 Component 的插槽",
            ignore: true,
          },
          slots: {
            component: "el-input",
            label: "网站",
            slots: {
              // 多个插槽时， slot name 名称和 key 保持一致
              prepend: "Http://",
              append: h("el-tag", { attrs: { type: "success" } }, ".com"),
            },
          },
          button: {
            label: "按钮",
            component: "el-button",
            type: "primary",
            icon: "el-icon-search",
            slots: "查询",
          },
        },
      },
    };
  },
};
</script>