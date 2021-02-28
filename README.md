# agel-form | 使 element-ui form 组件更简单

## 特性

该组件的思想就是以一个 form 对象来做所有的操作，纯数据配置也有高度的灵活性，还有更方便的全局配置, 支持 element-ui 所有组件配置。


## 安装使用

`cnpm install agel-from --save`


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

