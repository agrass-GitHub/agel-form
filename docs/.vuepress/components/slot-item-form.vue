<template>
  <agel-form class="demo" v-model="form" style="padding:10px;border:1px dotted #3eaf7c;">
    <!-- slot 名称要与 item.porp 保持一致 -->
    <template slot="name">
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
        labelWidth: "100px",
        span: 15,
        data: {},
        items: [
          divider("label 属性使用演示，自定义 Item Label 的插槽"),
          {
            label: () => h("el-button", {}, "自定义label"),
            labelWidth: "100px",
          },
          divider("slot 属性使用演示，自定义 Form Item 的插槽"),
          {
            label: "Function 插槽",
            slot: () => h("el-tag", {}, "这是一段 render 函数类型自定义插槽"),
          },
          {
            label: "String 插槽",
            slot: "这是一段 string 类型自定义插槽",
          },
          {
            label: "VNode 插槽",
            slot: h("el-tag", {}, "这是一段 vnode 对象类型自定义插槽"),
          },
          {
            prop: "name",
            label: "Template 插槽",
            slot: true,
          },
          divider("slots 属性使用演示 ，自定义组件 Component 的插槽"),
          {
            component: "el-input",
            label: "网站",
            slots: {
              // 多个子插槽时， slot name 名称和 key 保持一致
              // 若该插槽有参数，可通过 scopeProps 获取
              prepend: "Http://",
              append: (scopeProps) => h("el-tag", {}, ".com"),
            },
          },
          {
            component: "el-button",
            label: "按钮",
            type: "primary",
            icon: "el-icon-search",
            slots: "查询",
          },
        ],
      },
    };
  },
};
</script>