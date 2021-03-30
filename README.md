# agel-form | 使 element-ui form 组件更简单

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/agel-form.svg)](https://www.npmjs.com/package/agel-form)
[![download](https://img.shields.io/npm/dt/agel-form)](https://npmcharts.com/compare/agel-form?minimal=true)

## 文档

- [官网 - 使用文档](https://agrass.gitee.io/agel-form/) 

## 特性

该组件的思想就是以一个 form 对象来做所有的操作，纯数据配置也有高度的灵活性，还有更方便的全局配置, 支持 element-ui 所有组件配置, 支持所有 evets 事件，也支持所有 slots，也可以灵活搭配第三方或者自定义的组件进行使用, 也可灵活调整布局进行响应式排版。


## 安装使用

`npm install agel-form --save` 或者 [使用在线引用地址](https://www.jsdelivr.com/package/npm/agel-form)


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

