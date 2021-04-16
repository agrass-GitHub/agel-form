---
title: 演示教程
sidebar: auto
---

# agel-form | 使 element-ui form 组件更简单

## 特性

该组件的思想就是以一个 form 对象来做所有的操作，纯数据配置也有高度的灵活性。 

- 支持 element-ui 所有表单组件 Attributes 配置
- 支持 element-ui 所有表单组件 Events 事件
- 支持 element-ui 所有表单组件 Slots 插槽
- 支持 Row Col 组件属性，以此实现响应式布局
- 方便的全局配置，应用到每一个表单
- 可灵活搭配第三方组件或者自定义组件使用
- 自动设置 placeholder 属性，自动设置必填 rules 属性

[自定义组件教程](/custom-component.md)


## 安装使用

安装： `cnpm install agel-form --save` 

若是完整引入 `Element`，可直接导入组件进行开发使用。

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import agelForm from 'agel-form';

const formConfig = {};

Vue.use(ElementUI);
Vue.use(agelForm,formConfig);
```

若是按需引入 `Element`，至少需要全局引入 `Form, FormItem, Row, Col, Input` 五个组件，其他表单组件则按需引入。

```js
import Vue from 'vue';
import { Form, FormItem, Row, Col, Input } from 'element-ui';
import agelForm from 'agel-form';

const formConfig = {};

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(agelForm,formConfig);
```

也可以在项目中单独引用 `agel-form` 中的二次封装单组件,进行使用

```js
import agelRadioGroup from "agel-form/src/lib/agel-radio-group.vue";
import agelCheckboxGroup from "agel-form/src/lib/agel-checkbox-group.vue";
import agelSelect from "agel-form/src/lib/agel-select.vue";
import agelUpload from "agel-form/src/lib/agel-upload.vue";
import agelTreeSelect from "agel-form/src/lib/agel-tree-select.vue";
```

## 典型表单 

默认 component 属性是 `el-input` ,会根据组件类型自动生成 `placeholder`, 设置 `required:true` 会自动生成必填 rules。

<ClientOnly><basics-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/basics-form.vue
:::

## 布局表单

`Form` 可以设置 `el-row` `el-col` 的所有属性，进行灵活布局，也可设置用 `xs、sm、md、lg、xl`实现响应式布局，作为 `Form` 直接子元素会继承该值; 若 `Form-Item` 单独设置布局属性的优先级更高。

<ClientOnly><layout-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/layout-form.vue
::: 


## 行内表单 

设置`inline:true`为行内表单模式，`el-row`,`el-col` 的布局属性将会失效，一般用于列表的搜索查询。

设置`ignore:true`，则表明该组件是一个纯展示组件，prop 值则不会注入到 form.data。

设置`on`，支持该组件的所有 events 事件。

<ClientOnly><inline-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/inline-form.vue
:::

## slot slots 插槽自定义

- `slot` 属性是自定义 `Form Item` 组件的插槽。
- `label` 属性是自定义 `Form Item` 组件的 `label` 插槽。
- `slots` 属性是自定义 `Component` 组件的插槽。

<ClientOnly><slot-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/slot-form.vue
:::

## attach 属性的使用

:::tip
在设计上，主张的是聚拢所有的参数为一个 form 对象，在组件初始化完成后会为 form 参数添加额外的内置属性和方法，因此该参数必须使用 `v-model`，且不可设为计算属性

为了保持其灵活性，添加了 `attach` 参数，配置项与 form 一致，不仅可聚拢也可打散，也可为计算属性，当其发生变化时候，会同步合并到 form 对象中
:::

<ClientOnly><attach-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/attach-form.vue
:::

## config 全局配置的使用

:::tip
支持所有属性，以下配置将被继承到每个表单上，也可单独为某个表单子组件设置全局配置
:::

为 component 单组件设置全局配置，必须是一个函数，可以很方便的为每一个 `el-date-pciker` 设置好日期格式化，也可以配置好公用的 `el-upload` 组件，至于其它的需求就发挥你的大脑去灵活配置了。

<<< @/docs/.vuepress/components/agel-form-config.js

## component 单组件

下面的组件，是经过二次封装的基础组件，使用方式会稍微有些不同。

为了保持该组件的绝对的灵活性，轻量级，所有并没有为 `Form` 集成额外的比如`富文本编辑器`，`图标选择器`，`地图选择器`等单组件，但你可以根据自己需求定义专属的单组件进行使用。
[自定义组件教程](/custom-component.md)


### select 选择器

开启 `filter` 可实现更好看关键字过滤，作用同 `filterable` 一致

<ClientOnly><select-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/select-form.vue
:::

### checkboxGroup radioGroup 选择框

开启 `button` 可实现按钮样式风格

<ClientOnly><checkboxgroup-radiogroup-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/checkboxgroup-radiogroup-form.vue
:::

### upload 上传

:::tip
- 使用预览附件功能, 必须保证 `this.$msgbox` 挂载了 `el-messagebox` 实例
- 使用钩子函数提示功能, 必须保证 `this.$message` 挂载了 `el-message` 实例, 在文件上传失败/文件个数/大小超出限制会触发默认提示语
- 和 `el-upload` 唯一不同的是，在 `onSuccess` 钩子函数中需返回一个包含 name，url 的特定对象, 如： `{name:"xx.jpg",url:'http://xxx.jpg}`，这样才能在上传成功后正确回填到表单
:::

<ClientOnly><upload-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/upload-form.vue
::: 

### tree-select 树形选择器

:::tip
`nodeKey` 必填，支持 `el-tree` 组件所有属性  
:::

- 可通过 `getRef` 方法获取 `tree` 组件实例，也可获取其他 `component` 组件实例
- 可通过 `getItem` 方法获取 itme 对象，在 `items` 是数组配置的情况下比较有用

<ClientOnly><tree-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/tree-form.vue
::: 

以上所有例子都有源码 [链接](https://github.com/agrass-GitHub/agel-form/tree/master/docs/.vuepress/components)