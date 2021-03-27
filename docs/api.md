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
- 支持所有 Element-ui [Form Attributes](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)，[Row Attributes](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)，
[Col Attributes](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)
- 所有属性都是可选，请注意的默认值为【内置】的属性，请勿传递覆盖
:::

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------ | ------ | ------------------------------------ | 
| ......      | ......       | ...... | All Element-ui Form Attributes      | 
| ......      | ......       | ...... | All Element-ui Row Attributes      | 
| ......      | ......       | ...... | All Element-ui Col Attributes      | 
| data        | Object       | { }    | 数据                                 | 
| items       | Object/Array | { }    | 表单子组件配置                               | 
| on          | Object       | { }    | Form 组件的 Event 事件      | 
| type        | String       | flex           | 继承自 el-row       | 
| justify     | String       | -           | 继承自 el-row       | 
| align       | String       | -           | 继承自 el-row       | 
| tag         | String       | -           | 继承自 el-row       |
| gutter      | Number       | -           | 继承自 el-row       |  
| span        | Number       | -           | 继承自 el-col       |
| offset      | Number       | -           | 继承自 el-col       |
| push        | Number       | -           | 继承自 el-col       |
| pull        | Number       | -           | 继承自 el-col       |
| xs          | Number/Object   | -           | 继承自 el-col       |
| sm          | Number/Object   | -           | 继承自 el-col       |
| md          | Number/Object   | -           | 继承自 el-col       |
| lg          | Number/Object   | -           | 继承自 el-col       |
| xl          | Number/Object   | -           | 继承自 el-col       |
| resetFields | Function     | 内置         | 继承自 el-from            | 
| validate    | Function(callback,errcallback)        | 内置   | 继承自 el-from                    |
| clearValidate | Function   | 内置   | 继承自 el-from                        |
| getItem       | Function(prop:string)     | 内置    | 获取指定 item 对象  | 
| getRef        | Function(prop:string)     | 内置    | 获取指定组件的 vue 实例  |


## Form Item


::: tip
- 支持所有 Element-ui [Col Attributes](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)
- 所有属性都是可选，请注意的默认值为【内置】的属性，请勿传递覆盖
:::

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ |
| ......      | ......       | ...... | All Element-ui Col Attributes      |   
| ......      | ......          | .........   | Other Component Attributes      |
| component   | String          | el-input    | 组件名称                | 
| display     | Boolean         | true        | 是否渲染                 | 
| show        | Boolean         | true        | 是否显示              | 
| slot        | Boolean/Funciton| false       | 是否自定义/render函数                   | 
| defaultValue| Any             | -           | 默认值                        |
| on          | Object          | { }         | 子组件 evenet 事件  |
| prop        | String          | -           | 继承自 el-form-item，数组配置时该字段必填    | 
| label       | String          | -           | 继承自 el-form-item  |
| labelWidth  | String          | -           | 继承自 el-form-item  | 
| required    | Boolean         | -           | 继承自 el-form-item  |
| rules       | Array/Object         | -      | 继承自 el-form-item  |
| span        | Number          | -           | 继承自 el-col       |
| offset      | Number          | -           | 继承自 el-col       |
| push        | Number          | -           | 继承自 el-col       |
| pull        | Number          | -           | 继承自 el-col       |
| xs          | Number/Object   | -           | 继承自 el-col       |
| sm          | Number/Object   | -           | 继承自 el-col       |
| md          | Number/Object   | -           | 继承自 el-col       |
| lg          | Number/Object   | -           | 继承自 el-col       |
| xl          | Number/Object   | -           | 继承自 el-col       |
| tag         | String          | -           | 继承自 el-col       |

## Select 选择器

::: tip
- 支持所有 Element-ui [Select Attributes](https://element.eleme.cn/#/zh-CN/component/select#select-attributes)
:::

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......        | .........   | All Element-ui Select Attributes      | 
| filter      | Boolean       | false       | 是否开启过滤查询                | 
| options     | Array         |  -     | option 配置项         | 
| props       | Object        |  { label: "label", value: "value", options: "options" }       | 指定节点标签为节点对象的某个属性值          | 

## checkboxGroup RadioGroup 多选/单选

::: tip
- 支持所有 Element-ui [checkbox Attributes](https://element.eleme.cn/#/zh-CN/component/checkbox#duo-xuan-kuang-zu)，[radio Attributes](https://element.eleme.cn/#/zh-CN/component/radio#dan-xuan-kuang-zu)
:::

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......        | .........   | All Element-ui checkboxGroup RadioGroup Attributes      | 
| options     | Array         |  -          | option 配置项                | 
| button      | Boolean       |  -          | 是否开启 button 样式         | 


## Upload 上传

::: tip
- 支持所有 Element-ui [Upload Attributes](https://element.eleme.cn/#/zh-CN/component/upload#upload-attributes)
:::

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......          | .........   | All Element-ui upload Attributes      | 
| drag        | Boolean         | false       | 是否开启拖拽                | 
| tip         | String          | -           | 提示语                      | 
| preview     | Boolean         | true        | 是否开启文件预览                      | 
| limitSize   | Number          | -           | 文件大小限制,单位kb                     | 
| buttonRender  | Functin       | -           | 自定义按钮 slot，rendner函数    | 



## Input-Tree 树形选择器

::: tip
- 支持所有 Element-ui [Tree Attributes](https://element.eleme.cn/#/zh-CN/component/tree#tree-attributes)
:::

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......          | .........   | All Element-ui Tree Attributes      | 
| nodeKey     | Boolean         | -           | 继承自 el-tree，必需          | 
| filter      | Boolean         | false       | 是否开启过滤查询                | 
| leafOnly    | Boolean         | false       | 是否只是叶子节点，多选生效    | 
| includeHalfChecked  | Boolean | true        | 是否包含半选节点，多选生效    | 
| show-checkbox     | Boolean   | false       | 继承自 el-tree，是否多选          | 
| placeholder  | String         | -           | 继承自 el-select                   | 
| disabled     | Boolean        | -           | 继承自 el-select                        |
| collapseTags | Boolean        | -           | 继承自 el-select  | 
| clearable    | Boolean        | -           | 继承自 el-select  |
| popperClass  | String         | -           | 继承自 el-select  | 


