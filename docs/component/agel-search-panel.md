# SearchPanel 搜索面板

`agel-search-panel` 组件是基于  `agel-form-inline` 组件的二次封装组件。


## 使用

基于 `agel-form-inline` 的基础, 为其添加了额外的属性，一般常用于列表搜索等，点击查询时也会对表单进行验证。

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

组件提供了基础按钮的 `render`，你可以在全局配置里定义按钮样式风格。该组件是依赖于 `agel-form`, 因此全局配置也是配置在 `agel-form` 中。

```js
import agelForm from "agel-form";
import { agelSearchPanel } from "agel-form";

const formConfig = {
  "agel-search-panel": {
    searchButtonRender: function ({ h }) {
      return h("el-button",{ props: { icon: "el-icon-search", type: "primary" } },"查询");
    },
    resetButtonRender: function ({ h }) {
      return h("el-button",{ props: { icon: "el-icon-refresh-right", type: "primary" } },"重置");
    },
    collapseButtonRender = function ({ h, collapse }){
       return h("el-button",null, collapse ? '展开' : '收起');
    }
  }
}

Vue.use(agelForm, formConfig);
Vue.use(agelSearchPanel);
```


## SearchPanel Attributes

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ |
| items          | Object/Array  | []     | 表单配置项                | 
| data           | Object/Array  |  -     | 表单数据         |  
| panelPosition | String       | left          | 布局方式，可选 left right         | 
| searchButton  | Boolean      | true        | 是否显示搜索按钮          |
| resetButton   | Boolean      | true        | 是否显示初始化按钮    | 
| collapseButton| Boolean      | false       | 是否显示折叠按钮    | 
| collapse      | Boolean      | true        | 默认折叠状态    | 
| collapseAlive | Array[prop]  | -           | 折叠情况下保留的搜索条件 prop    | 
| ......        | ......       | ......      | [elForm 属性](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)      |   


## SearchPanel Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| ...            |  表单项的 prop 具名插槽           |
| default        |  按钮插槽           |
| prepend        |  prepend 插槽           |
| append         |  append 插槽            |


## SearchPanel Events

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| search        | -             |  点击查询或重置按钮触发  | 
| reset         | -             |  点击重置按钮触发  | 
| collapse      | (collapse)    |  点击折叠按钮触发  | 