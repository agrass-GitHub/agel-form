# checkbox radio 选择框

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

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......        | .........   |  Element-ui [Radio Attributes](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)      | 
| ......      | ......        | .........   |  Element-ui [Checkbox Attributes](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)      | 
| options     | Array/Function/Promise    |  -     | option 配置项         | 
| props       | Object        |  {label,value}     | label,value 别名          |
| button      | Boolean       |  -          | 是否开启 button 样式         |
| slots       | Object        | -  | 自定义插槽    |  

## Radio Checkbox slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| default        |   选择框默认插槽          |
