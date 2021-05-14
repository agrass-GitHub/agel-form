# SearchPanel 搜索面板

`agel-search-panel` 组件是基于  `agel-form` 组件的二次封装组件，常用于列表搜索展示


## 使用


<ClientOnly><search-panel-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/search-panel-demo.vue
:::

<ClientOnly><test-form/></ClientOnly>


## SearchPanel Attributes

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......        | .........   | 支持所有 [agel-form 属性](/example/agel-form.html#form-attributes)      | 
| inline        | Boolean     | true       | 内联模式                | 
| panelPosition | String       | right       | 布局方式,可选 left right         | 
| searchButton  | Boolean      |  true       | 是否显示搜索按钮          |
| resetButton   | Boolean      | true        | 是否显示初始化按钮    | 

## SearchPanel Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| ...            |  表单项的 prop 具名插槽           |
| button         |  按钮插槽           |
| prepend        |  表单头部追加内容           |
| append         |  表单尾部追加内容                        |


## SearchPanel Events

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| search        | -             |  点击查询或重置按钮触发  | 
| reset        | -              |  点击重置按钮触发  | 