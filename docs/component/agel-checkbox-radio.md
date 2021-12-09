# Checkbox Radio 选择框

`agel-checkbox` 组件是基于 `el-checkbox` `el-checkbox-group` 组件的二次封装组件。

`agel-radio` 组件是基于  `el-radio` `el-radio-group` 组件的二次封装组件。

## 搭配表单使用

`options` 属性支持多种数据类型，`Array[string]`，`Array[Object]`，`Promise`，`Function`，若是 `Function` 类型，可以通过 `getRef` 获取组件实例调用 `getOptions` 进行主动刷新。

`agel-checkbox` 多选时 `value` 属性可以设置为数组 `[xx1,xx2]` 或者字符串 `xx1,xx2`，逗号间隔，默认为字符串。

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
| ......      | ......        | .........   | 支持 [el-radio-group 属性](https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes)      | 
| ......      | ......        | .........   | 支持 [el-checkbox-group 属性](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-group-attributes)      | 
| ......      | ......        | .........   | 支持 [el-radio 属性](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)      | 
| ......      | ......        | .........   | 支持 [el-checkbox 属性](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)      | 
| options     | String/Array/Function/Promise    |  -     | option 配置项         | 
| props       | Object        |  {label,value}     | 数据配置选项          |
| button      | Boolean       |  -                 | 是否开启 button 样式         |
| slots       | Object        | -                  | 自定义插槽    |  

## Radio Checkbox Option

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......        | .........   | 支持 [el-radio 属性](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)      | 
| ......      | ......        | .........   | 支持 [el-checkbox 属性](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)      |
| class       | Boolean       |  -                 | class名称    |
| style       | Object/String        | -           | 内联样式     |   

## Radio Checkbox Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| default        |   选择框默认插槽          |
| option         |   每一个选择项插槽，参数 {option,index}          |

## Radio Checkbox Methods

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| getValueOption  | -           |  返回 value 所对应的 option 对象，多选时为数组 |

## Radio Checkbox事件

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| ......        | ......        | 支持 [el-radio Events](https://element.eleme.cn/#/zh-CN/component/radio#radio-events)      | 
| ......        | ......        | 支持 [el-checkbox Events](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-events)      | 
