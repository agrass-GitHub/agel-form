# SearchPanel 搜索面板

`agel-search-panel` 组件是基于  `agel-form` 组件的二次封装组件。


## 使用

基于 `agel-form`的基础, 为其添加了额外的属性，一般常用于列表搜索等，默认使用内联布局，点击查询时也会对表单进行验证。

<ClientOnly><search-panel-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/search-panel-demo.vue
:::

## 折叠

若查询条件特别得多，可开启 `collapseButton` 折叠按钮, 设置 `form.collapseAlive` 数组指定搜索项进行保留，也可以直接设置 `item.collapseAlive` 保留，若都为空则会默认保留前三个搜索项。

<ClientOnly><search-panel-collapse/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/search-panel-collapse.vue
:::

## 全局配置

可以在全局配置里定义组件默认属性和按钮风格, 需要注意的是该组件是依赖于 `agel-form`, 因此全局配置也是配置在 `agel-form` 中。

<<< @/docs/.vuepress/components/search-panel-config.js


## SearchPanel Attributes

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| layout        | String       | inline         | 默认是内联表单，建议使用此布局方式                | 
| panelPosition | String       | right          | 布局方式，可选 left right         | 
| searchButton  | Boolean/Object      | true        | 是否显示搜索按钮/按钮属性配置          |
| resetButton   | Boolean/Object      | true        | 是否显示初始化按钮/按钮属性配置    | 
| collapseButton| Boolean      | false       | 是否显示折叠按钮    | 
| collapse      | Boolean      | false       | 当前折叠状态    | 
| collapseAlive | Array[prop]      | false       | 折叠情况下保留的搜索条件 prop    | 
| ......      | ......        | .........   |  [agel-form 属性](/example/agel-form.html#form-attributes)      | 


## searchButton resetButton Attributes

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| ...            |  el-button 属性           |
| text           |  按钮文字           |

## SearchPanel Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| ...            |  表单项的 prop 具名插槽           |
| default        |  按钮插槽           |


## SearchPanel Events

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| search        | -             |  点击查询或重置按钮触发  | 
| reset         | -             |  点击重置按钮触发  | 
| collapse      | (collapse)    |  点击折叠按钮触发  | 