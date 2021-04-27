# Checkbox Radio 选择框

`agel-checkbox` 组件是基于 `el-checkbox` `el-checkbox-group` 组件的二次封装组件。

`agel-radio` 组件是基于  `el-radio` `el-radio-group` 组件的二次封装组件。

## 搭配表单使用

`options` 属性支持多种数据类型，`Array[string]`，`Array[Object]`，`Promise`，`Function`，若是 `Function` 类型，可以通过 `getRef` 获取组件实例调用 `getOptions` 进行主动刷新。

`border` 属性实现边框样式风格，`button` 属性可实现按钮样式风格。

<ClientOnly><checkbox-radio-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/checkbox-radio-form.vue
::: 

## 单独引入使用

<ClientOnly><checkbox-radio-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/checkbox-radio-demo.vue
::: 

## Radio Checkbox Attributes

拿 `agel-radio ` 组件举例来说，若是配置了 `options` 属性，则默认绑定的 `el-radio-group` 的组件属性，反之则绑定 `el-radio` 组件属性。

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......        | .........   | 支持所有 [el-radio-group 属性](https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes)      | 
| ......      | ......        | .........   | 支持所有 [el-checkbox-group 属性](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-group-attributes)      | 
| ......      | ......        | .........   | 支持所有 [el-radio 属性](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)      | 
| ......      | ......        | .........   | 支持所有 [el-checkbox 属性](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)      | 
| options     | Array/Function/Promise    |  -     | option 配置项         | 
| props       | Object        |  {label,value}     | 数据配置选项          |
| button      | Boolean       |  -                 | 是否开启 button 样式         |
| slots       | Object        | -                  | 自定义插槽    |  

## Radio Checkbox Option

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......        | .........   | 支持所有 [el-radio 属性](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)      | 
| ......      | ......        | .........   | 支持所有 [el-checkbox 属性](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)      | 

## Radio Checkbox Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| default        |   选择框默认插槽          |
| option         |   每一个选择项插槽，参数 {option,index}          |

## Radio Checkbox事件

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| ......        | ......        | 支持所有 [el-radio Events](https://element.eleme.cn/#/zh-CN/component/radio#radio-events)      | 
| ......        | ......        | 支持所有 [el-checkbox Events](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-events)      | 
