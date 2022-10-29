# Radio Checkbox 选择框

`agel-radio` 组件是基于  `el-radio` `el-radio-group` 组件的二次封装组件。

`agel-checkbox` 组件是基于 `el-checkbox` `el-checkbox-group` 组件的二次封装组件。

## 使用

`options` 属性支持多种数据类型，`String`，`Array[String]`，`Array[Object]`，`Promise`，`Function`，若是 `Function` 类型，可以通过 `getOptions` 进行主动刷新。

`value` 属性多选时可为数组 `[xx1,xx2]` 或者字符串 `xx1,xx2`，逗号间隔，默认为字符串。

`border` 属性实现边框样式风格，`button` 属性可实现按钮样式风格。

若是配置了 options 属性，渲染的就是 `group` 组件，反正则是组件本身。

<ClientOnly><checkbox-radio-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/checkbox-radio-demo.vue
::: 


## 演示

<ClientOnly><checkbox-radio-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/checkbox-radio-form.vue
::: 

## Radio Checkbox Attributes


| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| value       | String/Array  | -        | 绑定值              |  
| options     | String/Array/Function/Promise    |  -     | option 配置项         | 
| props       | Object        |  {label,value}     | 数据配置选项          |
| border      | Boolean       |  -                 | 是否开启 border 样式         |
| button      | Boolean       |  -                 | 是否开启 button 样式         |
| active-value   | Boolean/String/Number       |  true                  | checkbox 已勾选时的值         |
| inactive-value | Boolean/String/Number       |  false                 | checkbox 未勾选时的值         |
| ......      | ......        | ......   | [el-checkbox-group 属性](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-group-attributes)      |
| ......      | ......        | ......   | [el-radio-group 属性](https://element.eleme.cn/#/zh-CN/component/radio#radio-group-attributes)   | 
| ......      | ......        | ......   | [el-checkbox 属性](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)      |
| ......      | ......        | ......   | [el-radio 属性](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)      | 




## Radio Checkbox Option

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ |
| label       | String        |  -                  | label 名称    |
| value       | String/Number |  -                  | value 值    | 
| style       | String/Object | -                   | 内联样式     | 
| class       | String/Object/Array       |  -      | class名称    |
| ......      | ......        | ......   | [el-radio 属性](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes)      | 
| ......      | ......        | ......   | [el-checkbox 属性](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)      |

## Radio Checkbox Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| default        |   选择框默认插槽          |
| option         |   每一个选择项插槽，参数 {option,index}          |

## Radio Checkbox Methods

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  |
| getOptions    | -             |  刷新数据， options 为 Function 时可调用           |
| getValueOption| value         |  返回 value 所对应的 option 对象，多选时为数组 |

## Radio Checkbox事件

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| ......        | ......        | 支持 [el-radio Events](https://element.eleme.cn/#/zh-CN/component/radio#radio-events)      | 
| ......        | ......        | 支持 [el-checkbox Events](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-events)      | 
