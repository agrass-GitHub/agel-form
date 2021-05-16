# 单组件

下面的组件，是基于 [element-ui](https://element.eleme.cn/#/zh-CN) 或者 [agel-form]() 的基础组件 经过二次封装的单组件，在使用方式上同原组件保持一致，没有任何的破坏性，并且额外添加了扩展功能，完完全全可以代替原组件进行开发使用。

在搭配 `agel-form` 组件使用中，可以简写省略掉 `ag` 标志，同时使用到的单组件都是按需异步加载，不会添加额外负担与依赖。

```js
{
  component: "el-select", // 等同于 agel-select
  label: "选择器",
  options: [],
},
```

## 单独引入

同时也支持在项目中单独引入中进行开发使用，完整组件列表和引入方式如下：

全局引入：

```js
import { agelRadio, agelCheckbox, agelSelect, agelUpload, agelTreeSelect,agelSearchPanel } from "agel-form";

Vue.use(agelRadio);
Vue.use(agelCheckbox);
Vue.use(agelSelect);
Vue.use(agelUpload);
Vue.use(agelTreeSelect);
Vue.use(agelSearchPanel);
```

局部引用：

```html
<template>
  <agel-select v-model="value" :options="options" filter></agel-select>
</template>
 
<script>
import { agelSelect } from "agel-form";
export default {
  components:{
    agelSelect
  },
  data() {
    return {
      value: "",
      options: ["男", "女"],
    };
  },
};
</script>
```