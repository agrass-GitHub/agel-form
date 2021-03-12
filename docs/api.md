---
title: API 文档
sidebar: auto
---

## Props

| 属性    | 类型   | 必填 | 说明                             | 锚点                  |
| ------- | ------ | ---- | -------------------------------- | --------------------- |
| v-model | Object | 是   | form 参数配置，必须使用 v-model | [参考](/api.md#form) |
| attach  | Object | 否   | form 附属配置，会同步到 v-model | [参考](/api.md#form) |


## Form

::: tip
- 支持所有 Element-ui [Form Attributes](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)
- 所有属性都是可选，请注意的默认值为【内置】的属性，请勿传递覆盖
:::

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------ | ------ | ------------------------------------ | 
| ......      | ......       | ...... | All Element-ui Form Attributes      | 
| data        | Object       | { }    | 数据                                 | 
| items       | Object       | { }    | 子表单配置                               | 
| on          | Object       | { }    | Form 组件的 Event 事件      | 
| gutter      | Number       | 15     | 继承自 el-row gutter                   | 
| span        | Number       | 24     | 继承自 el-col span                         |
| resetFields | Function     | 内置   | 继承自 el-from            | 
| validate    | Function(callback,errcallback)     | 内置   | 继承自 el-from                    |
| clearValidate | Function   | 内置   | 继承自 el-from                        | 
| getRef      | Function(prop:string)     | 内置    | 获取指定组件的 vue 实例  |

## Form Item

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......          | .........   | Other Component Attributes      | 
| component   | String          | el-input    | 组件名称                | 
| display     | Boolean         | true        | 是否渲染                 | 
| show        | Boolean         | true        | 是否显示              | 
| slot        | Boolean/Funciton| false       | 是否自定义/render函数                   | 
| defaultValue| Any             | -           | 默认值                        |
| on          | Object          | { }         | 子组件 evenet 事件  | 
| label       | String          | -           | 继承 el-form-item  |
| label-width | String          | -           | 继承 el-form-item  | 
| required    | Boolean         | false       | 继承 el-form-item  |
| span        | Number          | -           |  继承 el-row       |
| offset      | Number          | -           |  继承 el-row       |

## Select

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......          | .........   | All Element-ui Select Attributes      | 
| filter      | Boolean         | false       | 是否开启过滤查询                | 
| props       | Array   |  -     | option 配置项         | 
| props       | Object   |  { label: "label", value: "value", options: "options" }       | 指定节点标签为节点对象的某个属性值          | 



## Input-Tree

::: tip
- 支持所有 Element-ui [Tree Attributes](https://element.eleme.cn/#/zh-CN/component/tree#tree-attributes)
:::

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......          | .........   | All Element-ui Tree Attributes      | 
| filter      | Boolean         | false       | 是否开启过滤查询                | 
| leafOnly    | Boolean         | false       | 是否只是叶子节点，多选生效    | 
| includeHalfChecked  | Boolean | true        | 是否包含半选节点，多选生效    | 
| nodeKey     | Boolean         | false       | 继承 el-tree，必需          | 
| show-checkbox     | Boolean   | false       | 继承 el-tree，是否多选          | 
| placeholder  | String  | -                  | 继承 el-select                   | 
| disabled     | Boolean          | -         | 继承 el-select                        |
| collapseTags | Boolean          | -         | 继承 el-select  | 
| clearable    | Boolean          | -         | 继承 el-select  |
| popperClass  | String           | -         | 继承 el-select  | 
