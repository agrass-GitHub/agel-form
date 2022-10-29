# TreeSelect 树形选择器

`agel-tree-select` 组件是基于 `el-select` `el-tree` 组件的二次封装组件。

## 使用

`options` 属性支持多种数据类型，`Array[Object]`，`Promise`，`Function`，若是 `Function` 类型，可以通过 `getRef` 获取组件实例调用 `getOptions` 进行主动刷新。

`value` 属性多选时可为数组 `[xx1,xx2]` 或者字符串 `xx1,xx2`，逗号间隔，默认为字符串。

开启 `lazy` 懒加载时，`nodeKey` 只能绑定 `props.label`。

<ClientOnly><tree-select-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/tree-select-demo.vue
::: 

## 演示

<ClientOnly><tree-select-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/tree-select-form.vue
::: 



## TreeSelect Attributes

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ |
| value       | String/Array  | -        |     绑定值           |  
| options     | Array/Function/Promise        | -    |  treeData 数据         | 
| nodeKey     | Boolean         | label       | 继承自 el-tree，绑定表单的字段名    | 
| props       | Boolean         | label       | 继承自 el-tree，数据配置选项    | 
| filter      | Boolean         | false       | 是否开启过滤查询                | 
| leafOnly    | Boolean         | false       | 是否只是叶子节点，多选生效    | 
| includeHalfChecked  | Boolean | false       | 是否包含半选节点，多选生效    |
| multiple     | Boolean        | false       | 是否多选          | 
| closableTags | Boolean        | false       | 多选时标签是否关闭
| collapseTags | Boolean        | -           | 多选时标签是否可折叠 |
| placeholder  | String         | -           | 继承自 el-select                   | 
| disabled     | Boolean        | -           | 继承自 el-select                        |
| clearable    | Boolean        | -           | 继承自 el-select  | 
| popperClass  | String         | -           | 继承自 el-select  | 
| loadingText  | String         | -           | 继承自 el-select  | 
| ......      | ......          | .........   | [el-tree 属性](https://element.eleme.cn/#/zh-CN/component/tree#tree-attributes)    |


## TreeSelect Option

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| label       | String        |  -                  | label 名称    |
| style       | String/Object | -                   | 内联样式     | 
| class       | String/Object/Array       |  -      | class名称    |
| ......      | ......          | .........   | [el-tree props 属性](https://element.eleme.cn/#/zh-CN/component/tree#props)    |  



## TreeSelect Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| prefix         |  Select 组件头部内容                        |
| option         |  每一个选择项插槽，参数 {node,data} |

## TreeSelect Methods

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| focus         | -             |  聚焦                        |
| blur          | -             |  失焦            | 
| setSelected      | -          |  刷新 tree 选中状态            |
| getOptions    | -             |  刷新数据， options 为 Function 时可调用    |
| getValueOption  | -           |  返回 value 所对应的 option 对象，多选时为数组 |


## TreeSelect Events

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| ......        | ......        | 支持 [el-tree 事件](https://element.eleme.cn/#/zh-CN/component/tree#tree-events)      | 
| ......        | ......        | 支持 [el-select 事件](https://element.eleme.cn/#/zh-CN/component/select#tree-events)      | 