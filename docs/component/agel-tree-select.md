# TreeSelect 树形选择器

`agel-tree-select` 组件是基于 `el-select` `el-tree` 组件的二次封装组件。

## 搭配表单使用

`options` 属性支持多种数据类型，`Array[Object]`，`Promise`，`Function`，若是 `Function` 类型，可以通过 `getRef` 获取组件实例调用 `getOptions` 进行主动刷新。

多选时 `value` 属性可以设置为数组 `[xx1,xx2]` 或者字符串 `xx1,xx2`，逗号间隔。

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
| ......      | ......          | .........   | 支持所有 [el-tree 属性](https://element.eleme.cn/#/zh-CN/component/tree#tree-attributes)      | 
| options     | Array/Function/Promise        | -    |  treeData 数据         | 
| nodeKey     | Boolean         | label       | 继承自 el-tree，绑定表单的字段名          | 
| props       | Boolean         | label       | 继承自 el-tree，数据配置选项          | 
| filter      | Boolean         | false       | 是否开启过滤查询                | 
| leafOnly    | Boolean         | false       | 是否只是叶子节点，多选生效    | 
| includeHalfChecked  | Boolean | true        | 是否包含半选节点，多选生效    | 
| multiple     | Boolean        | false       | 继承自 el-select，是否多选          | 
| placeholder  | String         | -           | 继承自 el-select                   | 
| disabled     | Boolean        | -           | 继承自 el-select                        |
| loading      | Boolean        | -           | 继承自 el-select  | 
| clearable    | Boolean        | -           | 继承自 el-select  | 
| collapseTags | Boolean        | -           | 继承自 el-select  | 
| popperClass  | String         | -           | 继承自 el-select  | 
| loadingText  | String         | -           | 继承自 el-select  | 

## Select Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| prefix         |  Select 组件头部内容                        |
| option         |  每一个选择项插槽，参数 {node,data} |

## TreeSelect Methods

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| focus         | -             |  聚焦                        |
| blur          | -             |  失焦            | 
| setSelected      | -          |  刷新选中状态            |
| getOptions    | -             |  刷新数据， options 为 Function 时可调用    |
| getValueOption  | -           |  返回 value 所对应的 option 对象，多选时为数组 |


## TreeSelect Events

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| ......        | ......        | 支持所有 [el-tree 事件](https://element.eleme.cn/#/zh-CN/component/tree#tree-events)      | 
| ......        | ......        | 支持所有 [el-select 事件](https://element.eleme.cn/#/zh-CN/component/select#tree-events)      | 