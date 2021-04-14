# custom 自定义组件

:::tip
 `agel-form` 组件可以灵活搭配第三方或者自定义的组件进行使用，这是一个自定义组件的简单教程，为了更好的搭配请遵循下面的规范，只需要简单四步。
:::

例子以简单二次封装 `el-select` 组件为例子：

1. 第一步：创建.vue文件，引入 `agel-form` 的 `formMixin.js`。

```html{5,8}
<template>
</template>

<script>
import formMixin from "agel-form/src/lib/formMixin.js";
export default {
  name:"custom-select"
  mixins: [formMixin],
};
</script>

```

::: details 为了更好的理解，请点击查看 formMixin.js 源码,
<<< @/src/lib/formMixin.js
::: 

2. 第二步：定义组件的 `props` 属性，挂载 `ref` 属性到模板，若是二次封装组件则使用 `v-bind` `v-on` 绑定属性和事件。

```html{2-5,14}
<template>
   <el-select ref="ref" v-bind="$attrs" :value="value" v-on='on' @input="input">
      <el-option v-for="(option) of options" :label="option.label" :value="option.value" :key="option.label" >
      </el-option>
   <el-select>  
</template>

<script>
import formMixin from "agel-form/src/lib/formMixin.js";
export default {
  name:"custom-select"
  mixins: [formMixin],
  props:{
    options: Array,
  }
};
</script>
```

3. 第三步：根据需要，选择使用 `slot-render` 渲染组件插槽，然后就大工告成！ 

```html{5,6}
<template>
  <el-select ref="ref" v-bind="$attrs" :value="value" v-on='on' @input="input">
    <el-option v-for="(option) of options" :label="option.label" :value="option.value" :key="option.label">
    </el-option>
    <slot-render v-for="(render,name) in slots" :key="name" :slot="name" :render="render">
    </slot-render>
    <el-select>
</template>

<script>
import formMixin from "agel-form/src/lib/formMixin.js";
export default {
  name: "custom-select",
  mixins: [formMixin],
  props: {
    options: Array,
  },
};
</script>
```

4. 第四步：注册到全局，配合 `agel-form` 使用，需设置 `custom` 为 `true`。

```js
import Vue from 'vue';
import customSelect from "@/components/customSelect"

Vue.component(customSelect.name,customSelect);
```

```html{14}
<template>
  <agel-form v-model="form"></agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        data: {},
        items: {
          name: {
            component:"custom-select",
            cusotm:true, // 为了让 agel-form 组件正确识别是否是自定义组件，需设置该属性
            label: "活动名称", 
            options:[ {label:"测试",value:"测试"} ] 
          },
        },
      },
    };
  },
};
</script>
```
