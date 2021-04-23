---
title: 演示教程
sidebar: auto
---

# agel-form | 使 element-ui form 组件更简单

## 介绍

[agel-form](https://github.com/agrass-GitHub/agel-form) 是基于 [element-ui form](https://element.eleme.cn/#/zh-CN/component/form) 的二次封装，极简的思想，完全的数据驱动，拥有绝对的灵活性，可以帮助你更快速的开发！up! up! up!

该组件的思想就是以一个 form 对象来做所有的操作，它做了如下事情：

- 支持 element-ui 所有表单组件 attributes 配置
- 支持 element-ui 所有表单组件 events 事件
- 支持 element-ui 所有表单组件 slots 插槽
- 支持 element-ui Row Col 组件属性
- 智能回填 form.data，placeholder，rules
- 自定义组件 / 搭配第三方组件
- 全局配置
- 联动显示隐藏
- 响应式布局


## 快速开始

### 安装

`npm install agel-form --save # yarn add agel-form` 

### 引用

若是完整引入 `Element-UI`，可直接导入组件进行开发使用。

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import agelForm from 'agel-form';

const formConfig = {};

Vue.use(ElementUI);
Vue.use(agelForm,formConfig);
```

若是按需引入 `Element-UI`，至少需要全局引入 `Form, FormItem, Row, Col, Input` 五个表单组件 `agelForm` 才可正常使用。

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

也支持在项目中单独引入 `agelForm` 中的二次封装单组件进行开发使用。

```js
import { agelRadio, agelCheckbox, agelSelect, agelUpload, agelTreeSelect } from "agel-form";

Vue.use(agelRadio);
Vue.use(agelCheckbox);
Vue.use(agelSelect);
Vue.use(agelUpload);
Vue.use(agelTreeSelect);
```

### 全局配置

支持所有属性，配置将被继承到每个表单上。

也可单独为某个表单子组件设置全局配置，表单子组件支持函数写法，更加灵活。

<<< @/docs/.vuepress/components/agel-form-config.js



## 创建表单

:::tip 
- 表单创建时会根据组件类型自动回填 `form.data`，关联响应式，不必手动 set 
- 表单创建时会根据组件类型自动回填 `placeholder`
- 属性 `component` 为空的时候会自动回填为 `el-input`
- 设置 `required` 为 `true`，会自动回填一个必填 rules
:::

一个表单支持三种布局模式，行内表单，栅格表单，响应式表单，例子如下。

### 行内表单 

这是一个最简单的例子，设置`inline:true` 开启行内表单模式。

<ClientOnly><inline-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/inline-form.vue
::: 

### 栅格表单

表单通过 [layout](https://element.eleme.cn/#/zh-CN/component/layout#layout-bu-ju) 的组件属性来实现栅格布局，`form` 支持 [el-row](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)，[el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)组件的的所有属性，`item` 支持 [el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes) 组件的所有属性，通过 `labelWidth`，`labelPosition` 来调整 `label` 的宽度与对齐方式， 另外就是 `item` 配置的优先级会大于 `form` 。

 
<ClientOnly><layout-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/layout-form.vue
:::

### 响应式表单

设置 `responsive:true` 开启响应式，表单会根据容器的宽度自动调整 `form` 栅格大小，但 `item` 的 `span` 优先级仍然最高，响应式规则如下，请拖拽下面的宽度条查看效果。

- 宽度 <= 400px， `span：24`，`labelPosition：top`
- 400px > 宽度 <= 600px，`span 24`，`labelPosition：right`
- 600px > 宽度 <= 900px，`span 12`，`labelPosition：right`
- 900px > 宽度 <= 1200px，`span 8`，`labelPosition：right`
- 1200px > 宽度 <= 1600px，`span 4`，`labelPosition：right`
- 1600px > 宽度，`span 24`，`labelPosition：right`

也可以通过配置 `responsiveMethod` 属性来自定义响应式规则，接受一个宽度参数，需要返回一个对象，支持 `labelPosition, labelWidth, gutter` 以及  [el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes) 组件的所有属性。

<ClientOnly><resize-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/resize-form.vue
::: 

### 联动表单

设置 `display`，`disabled` 为函数来控制表单显示隐藏，是否禁用。

<ClientOnly><display-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/display-form.vue
::: 

### 表单插槽

:::tip
- 插槽为 `String` 类型时，会默认被转换成 `h('span', {}, string/number)` VNode对象。
- 当 `slots` 插槽只存在 `default` 的情况下，可直接简写省略对象写法。
:::

插槽支持 `Funciton`，`VNode`，`String`，`Array[VNode]` 多种写法，其中 `slot` 属性设置为 `true` 可额外支持 `template` 写法，使用方法如下。

更多基础知识 [请参考渲染函数 & JSX](https://cn.vuejs.org/v2/guide/render-function.html)

<ClientOnly><slot-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/slot-form.vue
:::

### 表单方法

跟传统的通过 `$refs.form.xxx()` 来调用组件方法有所不同，在 `agelForm` 中方法会自动注入到 `form` 对象中，直接通过 `form.xxx()` 来调用。

<ClientOnly><method-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/method-form.vue
:::


### 表单配置

#### Form Props

| 属性             | 类型   | 必填 | 说明                               |
| -----------     | ------ | ---- | --------------------------------  | 
| v-model / value | Object | 是   | form 参数配置，建议使用 v-model    | 
| attach          | Object | 否   | form 参数配置，会同步到 v-modele    | 

#### attach 属性

在设计上，主张的是聚拢所有的参数为一个 form 对象，通过 `v-model` 传递， 在组件初始化完成后会为 form 参数添加额外的内置属性和方法，因此该属性不可设为计算属性。

为了保持其灵活性，添加了 `attach` 参数，配置项与 form 一致，唯一不同就是可以设置为计算属性，当其发生变化时候，会同步合并到 form 对象中，如下例子：

<ClientOnly><attach-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/attach-form.vue
:::

#### Form Attributes


| 属性        | 类型         | 默认值  | 说明                                   | 
| ----------- | ------------ | ------ | ------------------------------------  |
| ......      | ......       | ...... | Element-ui [Form Attributes](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)      | 
| ......      | ......       | ...... | Element-ui [Row Attributes](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)      | 
| ......      | ......       | ...... | Element-ui [Col Attributes](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)      |  
| data        | Object       | { }    | 数据                                  | 
| items       | Object/Array | { }    | 表单子组件配置                         | 
| on          | Object       | { }    | Form 组件的 Event 事件                | 
| responsive  | Boolean      | false  | 是否开启响应式      | 
| responsiveMethod | Funciton| -      | 自定义响应式规则      | 
| labelPositon| String       | right  | 继承自 el-form  |
| labelWidth  | String       | auto   | 继承自 el-form  | 
| type        | String       | flex   | 继承自 el-row   | 

#### Form Methods


| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| clearValidate | -             |  清空验证                        |
| resetFields   | -             |  表单重置            | 
| validate      | callback,errcallback        |  表单验证                    |
| getItem       | prop:string     | 获取指定 item 对象  | 
| getRef        | prop:string     |  获取指定组件的 vue 实例  |


#### Form Item Attributes


| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ |
| ......      | ......          | ...... |  Element-ui [Col Attributes](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)      |   
| ......      | ......          | .........   | 组件的动态参数      |
| component   | String          | -    | 组件名称                |
| label       | String/Funciton/Vnode          | -          | Form Item Label 插槽  |  
| slot        | Boolean/Funciton/Vnode  | false       | Form Item 插槽  | 
| slots       | Object/Funciton/Vnode   | { }         | Component 组件的插槽 | 
| display     | Boolean/Funciton| true        | 是否渲染                 | 
| disabled    | Boolean/Funciton| false        | 是否禁用              |
| ignore      | Boolean         | false       | 与表单数据取消关联  |  
| custom      | Boolean         | false       | 是否为自定义的组件             |  
| on          | Object          | { }         | 子组件 evenet 事件  |
| style       | String          | -           | style 样式         |
| class       | String          | -           | class 名称         |
| prop        | String          | -           | 字段名，数组配置时该字段必填    | 
| labelWidth  | String          | -           | 继承自 el-form-item  | 
| required    | Boolean         | -           | 继承自 el-form-item  |
| rules       | Array/Object    | -           | 继承自 el-form-item  |
| span        | Number          | -           | 继承自 el-col  |




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

### checkbox radio 选择框

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