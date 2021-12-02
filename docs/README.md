---
home: true
actionText: 起步 →
actionLink: /example/
features:
  - title: 极简的思想
    details: 面向对象, 参数集中处理, 以一个 form 对象来完成所有的操作
  - title: 高度的灵活
    details: 支持 element-ui form 所有组件，也可搭配自定义组件，且不用担心版本升级问题
  - title: 快捷的使用
    details: 数据配置，全局配置，集成了更方便好用的扩展功能
footer: MIT Licensed | Copyright ©agrss 
---


<ClientOnly><test-form/></ClientOnly>

### 如此简单

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




