# 创建表单

:::tip 预先了解
- 表单创建时会根据组件类型自动回填 `form.data`，关联响应式，不必手动 set 
- 表单创建时会根据组件类型自动回填 `placeholder`
- `form.items` 支持数组配置
- `item.component` 为空是默认为 `el-input`
:::

一个表单支持三种布局模式，行内表单，栅格表单，响应式表单，例子如下。

## 行内表单 

这是一个最简单的例子，设置`inline:true` 开启行内表单模式。

<ClientOnly><inline-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/inline-form.vue
::: 

## 栅格表单

表单通过 [layout](https://element.eleme.cn/#/zh-CN/component/layout#layout-bu-ju) 的组件属性来实现栅格布局。

`form` 支持 [el-row](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)，[el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)组件的的所有属性。

`item` 支持 [el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes) 组件的所有属性，若未设置将会默认继承 `form` 对象上的 `el-col` 属性， `labelWidth`，`labelPosition` 可以调整 label 标签的宽度与对齐方向。

<ClientOnly><layout-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/layout-form.vue
:::

## 响应式表单

设置 `responsive:true` 开启响应式，表单会根据容器的宽度自动调整 `form` 栅格大小，但 `item` 的栅格属性优先级仍然最高，响应式规则如下：

- 宽度 <= 400px， `span：24`，`labelPosition：top`
- 400px > 宽度 <= 600px，`span 24`，`labelPosition：right`
- 600px > 宽度 <= 900px，`span 12`，`labelPosition：right`
- 900px > 宽度 <= 1200px，`span 8`，`labelPosition：right`
- 1200px > 宽度 <= 1600px，`span 4`，`labelPosition：right`
- 1600px > 宽度，`span 24`，`labelPosition：right`

也可以通过配置 `responsiveMethod` 属性来自定义响应式规则，接受一个宽度参数，需要返回一个对象，支持 `labelPosition, labelWidth, gutter，span` 等 [el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes) 组件的所有属性。

<ClientOnly><resize-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/resize-form.vue
::: 

## 联动表单

设置 `display`，`disabled` 为函数来控制表单显示隐藏，是否禁用。

<ClientOnly><display-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/display-form.vue
:::

## 表单插槽


插槽支持 `Funciton`，`VNode`，`String` 等多种写法，其中 `slot` 属性设置为 `true` 可额外支持 `template` 写法。

```js
Funciton：
    slot: () => h("el-tag", {}, "这是一段 render 函数类型自定义插槽")
VNode：
    slot: h("el-tag", {}, "这是一段 vnode 对象类型自定义插槽")
String：
    slot: "这是一段 string 类型自定义插槽"
```

当 `slots` 插槽只存在 `default` 的情况下，可直接简写省略对象写法, 当插槽为 `String` 类型时，会被转换成 `VNode` 对象, 整个转换过程如下：

```js
slots:"查询"  ==>  slots:{ default:"查询" }  ==>  slots:{ default:h("span",{},"查询") }
```

<ClientOnly><slot-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/slot-form.vue
::: 

更多基础知识请参考 [渲染函数 & JSX](https://cn.vuejs.org/v2/guide/render-function.html)

## 表单验证

表单验证同 [el-from 表单校检](https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng)一致，都是使用的 [async-validator](https://github.com/yiminghe/async-validator)。

`form.rules` 和 `item.rules` 都支持写验证规则，若验证只有必填一项的话，可以设置 `required` 属性为 true，将会自动回填一个必填 `rules`，message 信息为：`item.label` 必填。

`form.validate` 方法与 `el-form validate` 有点不同，接受两个函数回调（成功/失败）参数。

<ClientOnly><validate-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/validate-form.vue
:::

## 表单方法

跟传统的通过 `$refs.form.xxx()` 来调用组件方法有所不同，在 `agelForm` 中方法会自动注入到 `form` 对象中，建议直接通过 `form.xxx()` 来调用。

表单事件通过 `form.on` 和 `item.on` 进行定义。

<ClientOnly><method-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/method-form.vue
:::

## 表单配置

### Form Props

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

### Form Attributes


| 属性        | 类型         | 默认值  | 说明                                   | 
| ----------- | ------------ | ------ | ------------------------------------  |
| ......      | ......       | ...... | 支持所有 [el-form 属性](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)      | 
| ......      | ......       | ...... | 支持所有 [el-row 属性](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)      | 
| ......      | ......       | ...... | 支持所有 [el-col 属性](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)      |  
| data        | Object       | { }    | 数据                                  | 
| items       | Object/Array | { }    | 表单子组件配置                         | 
| on          | Object       | { }    | Form 组件的 Event 事件                | 
| responsive  | Boolean      | false  | 是否开启响应式      | 
| responsiveMethod | Funciton| -      | 自定义响应式规则      | 
| inline      | Boolean      | false  | 继承自 el-form 行内表单      | 
| labelPositon| String       | right  | 继承自 el-form  |
| labelWidth  | String       | auto   | 继承自 el-form  | 
| type        | String       | flex   | 继承自 el-row   | 

### Form Methods

 方法会注入到 form 对象，建议直接通过 `form.方法名称()` 来调用。

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| clearValidate | -             |  清空验证                        |
| resetFields   | -             |  表单重置            | 
| validate      | callback,errcallback        |  表单验证                    |
| getItem       | prop:string     | 获取指定 item 对象  | 
| getRef        | prop:string     |  获取指定组件的 vue 实例  |


### Form Item Attributes


| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ |
| ......      | ......          | ...... |  支持所有 [el-col 属性](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)      | 
| ......      | ......          | ...... |  支持所有 [el-form-item 属性](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes)      |   
| ......      | ......          | .........   | 组件的动态参数      |
| component   | String          | -    | 组件名称                |
| label       | String/String/Funciton/Vnode          | -          | Form Item Label 插槽  |  
| slot        | Boolean/String/Funciton/Vnode  | false       | Form Item 插槽  | 
| slots       | Object/String/Funciton/Vnode   | { }         | Component 组件的插槽 | 
| display     | Boolean/Funciton| true        | 是否渲染                 | 
| disabled    | Boolean/Funciton| false        | 是否禁用              |
| ignore      | Boolean         | false       | 与表单数据取消关联  |  
| on          | Object          | { }         | 子组件 evenet 事件  |
| style       | String          | -           | style 样式         |
| prop        | String          | -           | 字段名，数组配置时该字段必填    | 
| labelWidth  | String          | -           | 继承自 el-form-item  | 
| required    | Boolean         | -           | 继承自 el-form-item  |
| rules       | Array/Object    | -           | 继承自 el-form-item  |
| span        | Number          | -           | 继承自 el-col  |


### 配置结构

为了更好的理解数据配置的结构，如例：

```html
<template>
  <agel-from v-model="from" :attach="attach"></agel-from>
</template>
 
<script>
export default {
  data() {
    return {
      from: {
        data:{},
        // agel-form 的属性
        // el-form 的属性
        // el-row  的属性
        // el-col  的属性
        items:[
         {
           component:"el-input",
          // agel-form-item 的属性
          // el-form-item 的属性
          // el-col 的属性
          // component 组件的动态属性
          }
        ]
      },
      attach:{},
    };
  }
};
</script>
```