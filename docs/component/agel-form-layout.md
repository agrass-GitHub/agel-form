# Layout 表单布局

`agel-form` 实质上是一个包装组件，在内部包装了 `el-form` 和 `layout` 组件。

在复杂的场景下，例如一个表单有多个 `Block` 的概念，你可能更需要原始的 `layout` 来实现需求。

## 使用

在单独使用 `tableditor` 时，如果有验证的话需要使用 `model-proxy` 属性手动关联到 `el-form` 中。 

在单独使用 `grid` 时，如果开启自适应需要使用 `label-position-proxy` 属性手动关联到 `el-form` 中。 

<ClientOnly><layout-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/layout-form.vue
:::


## Layout Attributes

:::tip 
每个布局组件都共有的基础属性，插槽，方法。
:::

| 属性           | 类型         | 默认值  | 说明                                 | 
| -------------- | ------------  | ------ | ------------------------------------ | 
| items          | Object/Array  | []     | 表单配置项                | 
| data           | Object/Array  |  -     | 表单数据         | 
| itemExtendKeys | Array         |  -     | 包含在内的属性名不会被注入到组件中

`item` 配置项支持 `component` 动态属性。

`item` 配置项支持 `el-form-item` 属性。

#### Mehtod

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| getItem       | prop:string，deep:boolean   | 获取指定 item 对象，deep 可获取完整属性  | 
| getRef        | prop:string   |  获取指定组件的 vue 实例  |

#### Slot 

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| prepend        |  表单头部追加内容           |
| append         |  表单尾部追加内容                        |
| ......         |  表单项的 prop 具名插槽           |


### AgelFormGrid 

| 属性           | 类型         | 默认值  | 说明                                 | 
| -------------- | ------------  | ------ | ------------------------------------ |
| type           | String        | flex   | 继承自 el-row   | 
| responsive     | Boolean       | false  | 是否响应式布局        | 
| responsiveMethod | Funciton    | -      | 自定义响应式规则      | 
| labelPositionProxy | String    | -      | 表单自适应 labelPosition ，需使用.sync     | 
| ......         | ......        | ...... | [el-row 属性](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)      | 
| ......         | ......        | ...... | [el-col 属性](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)      | 

`item` 配置项可额外支持 `el-col` 属性。

## AgelFormDescriptions 

| 属性           | 类型         | 默认值  | 说明                                 | 
| -------------- | ------------  | ------ | ------------------------------------ | 
| border         | Boolean       | true   | border 样式        | 
| model-proxy     | Object        | true  | 表单验证 model 对象，需使用.sync       | 
| ......         | ......        | ...... | [el-descriptions 属性](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)      | 


`item` 配置项可额外支持 `el-descriptions-item` 属性。：

## AgelFormTableditor 

| 属性           | 类型         | 默认值  | 说明                                 | 
| -------------- | ------------  | ------ | ------------------------------------ |
| data           | Array         | -      |  列表数据        |  
| border         | Boolean       | true   | border 样式        | 
| ......         | ......        | ...... | [el-table 属性](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)      | 

item 配置项可额外支持 `el-table-column` 属性。


## TableditorMenuColumn 

该组件一般用于搭配 `tableditor` 布局。

| 属性           | 类型         | 默认值  | 说明                                 | 
| -------------- | ------------  | ------ | ------------------------------------ | 
| data           | Array         | -      |  列表数据        |  
| fixed          | String        | right  |  固定        |  
| add            | Boolean       | true   |  显示添加按钮        | 
| edit           | Boolean       | true   |  显示编辑按钮        |
| del            | Boolean       | true   |  显示删除按钮        |  