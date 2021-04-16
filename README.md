# agel-form | 使 element-ui form 组件更简单

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/agel-form.svg)](https://www.npmjs.com/package/agel-form)
[![download](https://img.shields.io/npm/dt/agel-form)](https://npmcharts.com/compare/agel-form?minimal=true)

## 文档

- [官网 - 使用文档](https://agrass.gitee.io/agel-form/) 

## 特性

该组件的思想就是以一个 form 对象来做所有的操作，纯数据配置也有高度的灵活性。 

- 支持 element-ui 所有表单组件 Attributes 配置
- 支持 element-ui 所有表单组件 Events 事件
- 支持 element-ui 所有表单组件 Slots 插槽
- 支持 Row Col 组件属性，以此实现响应式布局
- 方便的全局配置，应用到每一个表单
- 可灵活搭配第三方组件或者自定义组件使用
- 自动设置 placeholder，自动设置必填 rules


## 安装使用

`cnpm install agel-form --save` 


### 如此简单

```html
<template>
  <agel-from v-model="from"></agel-from>
</template>
 
<script>
export default {
  data() {
    return {
      from: {},
    };
  },
};
</script>
```

