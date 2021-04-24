# tree-select 树形选择器


## 搭配表单使用

:::tip
`nodeKey` 必填，支持 `el-tree` 组件所有属性  
:::

- 可通过 `getRef` 方法获取 `tree` 组件实例，也可获取其他 `component` 组件实例
- 可通过 `getItem` 方法获取 itme 对象，在 `items` 是数组配置的情况下比较有用

<ClientOnly><tree-select-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/tree-select-form.vue
::: 

## 单独引入使用

<ClientOnly><tree-select-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/tree-select-demo.vue
::: 