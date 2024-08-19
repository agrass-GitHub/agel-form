# agel-form | 使 element-ui form 组件更简单

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/agel-form.svg)](https://www.npmjs.com/package/agel-form)
[![download](https://img.shields.io/npm/dt/agel-form)](https://npmcharts.com/compare/agel-form?minimal=true)

## 文档

- [使用文档 github](https://agrass-github.github.io/agel-form/)

## 安装使用

`npm install agel-form --save # yarn add agel-form`

## 介绍

[agel-form](https://agrass.gitee.io/agel-form/) 是基于 [element-ui form](https://element.eleme.cn/#/zh-CN/component/form) 的二次封装，极简的思想，完全的数据驱动，拥有绝对的灵活性，可以帮助你更快速的开发！up! up! up!

该组件适用于 vue2.x ，vue3.x 请转自 [element-plus-crx](https://github.com/agrass-GitHub/element-plus-crx)。

## 特性

该组件的思想就是以一个 form 对象来做所有的操作，它做了如下事情：

- 支持 element-ui 所有表单组件 attributes 配置
- 支持 element-ui 所有表单组件 events 事件
- 支持 element-ui 所有表单组件 slots 插槽
- 支持 element-ui Row Col 组件布局
- 支持 element-ui Descriptions 组件布局
- 支持 element-ui Table 表单编辑器
- 表单视图查看模式
- 动态增减表单
- 容器宽度自适应布局
- 联动显示隐藏禁用
- 智能回填 form.data，placeholder，rules
- 全局配置
- 数据化的基础组件
- 灵活自定义组件 / 搭配第三方组件

#### 表单布局组件

- [agel-form-inline](https://agrass.gitee.io/agel-form/component/agel-form-layout.html)
- [agel-form-grid](https://agrass.gitee.io/agel-form/component/agel-form-layout.html)
- [agel-form-descriptions](https://agrass.gitee.io/agel-form/component/agel-form-layout.html)
- [agel-form-tableditor](https://agrass.gitee.io/agel-form/component/agel-form-layout.html)

#### 表单子组件

- [agel-checkbox](https://agrass.gitee.io/agel-form/component/agel-checkbox-radio.html)
- [agel-radio](https://agrass.gitee.io/agel-form/component/agel-checkbox-radio.html)
- [agel-select](https://agrass.gitee.io/agel-form/component/agel-select.html)
- [agel-tree-select](https://agrass.gitee.io/agel-form/component/agel-tree-select.html)
- [agel-upload](https://agrass.gitee.io/agel-form/component/agel-upload.html)
- [agel-map-input](https://agrass.gitee.io/agel-form/component/agel-map-input.html)
- [agel-dynamic-tags](https://agrass.gitee.io/agel-form/component/agel-dynamic-tags.html)

#### 其他

- [agel-search-panel](https://agrass.gitee.io/agel-form/component/agel-search-panel.html)
- [agel-form-dialog](https://agrass.gitee.io/agel-form/component/agel-form-dialog.html)

## 如此简单

```html
<template>
  <agel-form v-model="form"></agel-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {},
      };
    },
  };
</script>
```
