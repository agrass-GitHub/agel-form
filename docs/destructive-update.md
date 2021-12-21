---
title: Destructive Update Log
sidebar: auto
---

# Destructive Update Log


可能会在以后的版本移除兼容代码，建议修改

## v.0.3.3

`agel-form` 新增 form.layout 属性支持布局，仍兼容旧写法（不推荐）

::: details 点击查看代码
```js
// old
const form = { inline:true }  || { descriptions:true }
// new
const form = { layout:"inline" }  || { layout:'descriptions' }
```
:::


`agel-search-panel` props 参数由修改组件本身传递，仍兼容从 form 中获取 porps 参数（不推荐）

::: details 点击查看代码
```vue
<template>
  <!--old--->
  <agel-search-panel :form="{panelPosition,searchButton, resetButton,collapse,collapseButton,collapseAlive}"/>
  <!--new--->
  <agel-search-panel :form="form" panelPosition searchButton resetButton collapse collapseButton collapseAlive/>
</template>
```
:::

