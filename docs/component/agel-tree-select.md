# tree-select 树形选择器

`agel-tree-select` 组件是基于 `el-select` `el-tree` 组件的二次封装组件。

## 搭配表单使用

<ClientOnly><tree-select-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/tree-select-form.vue
::: 

## 单独引入使用

<ClientOnly><tree-select-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/tree-select-demo.vue
::: 

### TreeSelect Attributes


| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......          | .........   | Element-ui [Tree Attributes](https://element.eleme.cn/#/zh-CN/component/tree#tree-attributes)      | 
| data        | Array/Function/Promise     | -           | 继承自 el-tree， tree 数据         | 
| nodeKey     | Boolean         | label           | 继承自 el-tree，绑定表单的字段名          | 
| filter      | Boolean         | false       | 是否开启过滤查询                | 
| leafOnly    | Boolean         | false       | 是否只是叶子节点，多选生效    | 
| includeHalfChecked  | Boolean | true        | 是否包含半选节点，多选生效    | 
| multiple     | Boolean   | false            | 继承自 el-select，是否多选          | 
| placeholder  | String         | -           | 继承自 el-select                   | 
| disabled     | Boolean        | -           | 继承自 el-select                        |
| collapseTags | Boolean        | -           | 继承自 el-select  | 
| clearable    | Boolean        | -           | 继承自 el-select  |
| popperClass  | String         | -           | 继承自 el-select  | 