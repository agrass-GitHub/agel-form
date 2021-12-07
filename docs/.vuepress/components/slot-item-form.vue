<template>
  <agel-form class="demo border" v-model="form">
    <!-- slot 名称要与 item.porp 保持一致 -->
    <template slot="name">
      <el-tag>这是一段 template 类型自定义插槽</el-tag>
    </template>
  </agel-form>
</template>
 
<script>
export default {
  data() {
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
            label: () => <el-button>自定义label</el-button>,
            labelWidth: "100px",
          },
          divider("slot 属性使用演示，自定义 Form Item 的插槽"),
          {
            label: "Function 插槽",
            slot: () => <el-tag>这是一段 render 函数类型自定义插槽</el-tag>,
          },
          {
            label: "String 插槽",
            slot: "这是一段 string 类型自定义插槽",
          },
          {
            label: "VNode 插槽",
            slot: this.$createElement(
              "el-tag",
              {},
              "这是一段 vnode 对象类型自定义插槽"
            ),
          },
          {
            prop: "name",
            label: "Template 插槽",
            slot: true,
          },
          divider("slots 属性使用演示 ，自定义组件 Component 的插槽"),
          {
            component: "el-input",
            label: "子插槽",
            slots: {
              // 多个子插槽时， slot name 名称和 key 保持一致
              prepend: "Http://",
              append: () => <el-tag>.com</el-tag>,
            },
          },
          {
            label: "参数子插槽",
            component: "el-checkbox",
            options: ["带有", "参数", "插槽"],
            slots: {
              option: ({ option, index }) => (
                <el-tag>
                  {index}：{option.label}
                </el-tag>
              ),
            },
          },
          {
            component: "el-button",
            label: "文字插槽",
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