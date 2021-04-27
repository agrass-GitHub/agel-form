<template>
  <agel-form class="demo" v-model="form" style="padding:10px;border:1px dotted #3eaf7c;">
    <template slot="template">
      <el-tag>这是一段 template 类型自定义插槽</el-tag>
    </template>
  </agel-form>
</template>
 
<script>
export default {
  data() {
    const h = this.$createElement;
    const divider = (title) => {
      return {
        component: "el-divider",
        labelWidth: "0px",
        contentPosition: "left",
        slots: title,
      };
    };
    return {
      form: {
        labelWidth: "50px",
        span: 15,
        data: {},
        items: {
          title1: divider("label 属性使用演示，自定义 Form Item Label 的插槽"),
          label: {
            labelWidth: "100px",
            label: () => {
              return h("el-button", {}, "自定义label");
            },
          },
          title2: divider("slot 属性使用演示，自定义 Form Ite m的插槽"),
          template: {
            label: "插槽1",
            slot: true,
          },
          render: {
            label: "插槽2",
            slot: (scopeProps) => {
              // 若改插槽有参数，可通过 scopeProps 获取
              return h("el-tag", {}, "这是一段 render 函数类型自定义插槽");
            },
          },
          vnode: {
            label: "插槽4",
            slot: h("el-tag", {}, "这是一段 vnode 对象类型自定义插槽"),
          },
          string: {
            label: "插槽3",
            slot: "这是一段 string 类型自定义插槽",
          },
          title3: divider("slots 属性使用演示 ，自定义组件 Component 的插槽"),
          slots: {
            component: "el-input",
            label: "网站",
            slots: {
              // 多个插槽时， slot name 名称和 key 保持一致
              prepend: "Http://",
              append: h("el-tag", {}, ".com"),
            },
          },
          button: {
            label: "按钮",
            component: "el-button",
            type: "primary",
            icon: "el-icon-search",
            slots: "查询",
            // 当插槽只存在 default 的情况下，可直接简写
            // slots: {
            //   default: "查询",
            // },
          },
        },
      },
    };
  },
};
</script>