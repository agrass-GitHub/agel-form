# 创建表单

:::tip 预先了解
- 表单创建时会根据组件类型智能回填 `form.data`，关联响应式不必手动 set 
- 表单创建时会根据组件类型智能回填 `placeholder`
- 表单组件会根据 `required` 智能回填必填验证规则
- 表单搭配内置单组件可以省略掉 `ag` 前缀
- `form.items` 支持数组/对象配置
- `item.component` 为空是默认为 `el-input`
:::

`agel-form` 表单支持四种布局模式，行内表单，栅格表单，描述表单，表格编辑表单，例子如下。

## 行内表单 

这是一个最简单的例子，设置 `layout：inline` 开启行内表单模式。

<ClientOnly><inline-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/inline-form.vue
::: 

## 栅格表单

表单通过 [Layout](https://element.eleme.cn/#/zh-CN/component/layout#layout-bu-ju) 组件来实现栅格布局，设置 `layout：grid` 开启栅格表单（默认）。

`form` 支持 [el-row](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)，[el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)组件的的所有属性，默认为 `flex` 模式。

`item` 支持 [el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes) 组件的所有属性，若未设置将会默认继承 `form` 对象上的 `el-col` 属性， `labelWidth`，`labelPosition` 可以调整 label 标签的宽度与对齐方向。


<ClientOnly><layout-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/layout-form.vue
:::

## 描述表单

表单通过 [Descriptions](https://element.eleme.cn/#/zh-CN/component/descriptions) 组件来实现详情式布局，设置 `layout：descriptions` 开启描述表单。

`form` 支持 [el-descriptions](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes)组件的的所有属性，同样支持相关插槽。

`item` 支持 [el-descriptions-item](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes) 组件的所有属性，使用 `agel-text` 组件可实现纯文字展示。

<ClientOnly><descriptions-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/descriptions-form.vue
:::

## 表格编辑器表单

表单通过 [Table](https://element.eleme.cn/#/zh-CN/component/descriptions) 组件来实现表格式布局，，设置 `layout：tableditor` 开启表格编辑表单。


`form` 支持 [el-table](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes)组件的的部分属性，和所有事件。

`item` 支持 [el-table-column](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes) 组件的部分属性。

<ClientOnly><tableditor-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/tableditor-form.vue
:::


## 响应式表单

响应式是基于 `grid` 栅格表单实现，设置 `responsive:true` 开启响应式。

表单会根据容器宽度自动调整栅格大小，但 `item` 的栅格属性优先级最高，响应式规则如下：

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

# 表单功能


## 表单联动

设置 `display`，`show`，`disabled` 为函数来控制表单是否渲染，是否显示隐藏，是否禁用。

<ClientOnly><display-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/display-form.vue
:::

## 表单验证

表单验证同 [el-from 表单校检](https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng)一致，都是使用的 [async-validator](https://github.com/yiminghe/async-validator)。

`form.rules` 和 `item.rules` 都支持写验证规则，`rules` 为空的情况下设置 `required:true` 将回填一个必填 `rules`。

<ClientOnly><validate-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/validate-form.vue
:::

## 表单方法

和传统的通过 `$refs.form.xxx()` 来调用组件方法有所不同，在 `agelForm` 中方法会自动注入到 `form` 对象中，建议直接通过 `form.xxx()` 来调用。

表单事件通过 `form.on` 定义，组件事件通过 `item.on` 进行定义。

<ClientOnly><method-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/method-form.vue
:::


## 表单插槽

### 表单插槽 prepend append 

表单支持在前后追加插槽内容，以支持标题，按钮等，在不同的布局下需要不同的容器包裹。

<ClientOnly><slot-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/slot-form.vue
:::


### 表单项插槽 label slot slots

表单项插槽支持 `Funciton`，`VNode`，`String` 写法，只有 `slot` 属性可额外持 `template` 模板写法。

<ClientOnly><slot-item-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/slot-item-form.vue
::: 

#### 插槽语法糖

- `slot` 插槽为 `String` 类型时，会被转换成 `VNode` 对象
- `slots` 插槽只存在 `default` 的情况下，可直接简写省略对象写法

```js
slots:"查询"  ===  slots:h("span",{},"查询")  ===  slots:{ default:h("span",{},"查询") }
```

更多基础知识请参考 [渲染函数 & JSX](https://cn.vuejs.org/v2/guide/render-function.html)

这里有所有演示用的[源码](https://github.com/agrass-GitHub/agel-form/tree/master/docs/.vuepress/components)。


## 表单配置

### Form Attributes


| 属性        | 类型         | 默认值  | 说明                                   | 
| ----------- | ------------ | ------ | ------------------------------------  |
| data        | Object       | { }    | 表单数据                                  | 
| items       | Array/Object | { }    | 表单项配置                         | 
| on          | Object       | { }    | 表单事件                |  
| layout      | String       | grid   | 布局方式 grid,inline,descriptions,tableditor      | 
| responsive  | Boolean      | false  | 是否响应式 grid 布局生效      | 
| responsiveMethod | Funciton| -      | 自定义响应式规则      | 
| labelWidth  | String       | auto   | 继承自 el-form  | 
| type        | String       | flex   | 继承自 el-row   | 
| ......      | ......       | ...... | [el-form 属性](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)      | 
| ......      | ......       | ...... | [el-row 属性](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)      | 
| ......      | ......       | ...... | [el-col 属性](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)      |  
| ......      | ......       | ...... | [el-descriptions 属性](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes)      |  

### Form Methods

 方法会注入到 form 对象，建议直接通过 `form.方法名称()` 来调用。

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| clearValidate | -             |  清空验证                        |
| resetFields   | -             |  表单重置            | 
| validate      | callback,errcallback        |  表单验证                    |
| getItem       | prop:string，deep:boolean   | 获取指定 item 对象，deep 可获取完整属性  | 
| getRef        | prop:string   |  获取指定组件的 vue 实例  |


### Form Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| prepend        |  表单头部追加内容           |
| append         |  表单尾部追加内容                        |
| ......          |  表单项的 prop 具名插槽           |



### Form Item Attributes


| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ |
| label       | String/String/Funciton/Vnode  | -          | label 名称 / 插槽  |
| prop        | String          | -           | data 关联字段名    | 
| display     | Boolean/Funciton| true        | 是否渲染                 | 
| show        | Boolean/Funciton| true        | 是否显示                 | 
| disabled    | Boolean/Funciton| false       | 是否禁用              |
| required    | Boolean         | false       | 是否生成必填验证   |
| vmodel      | Boolean         | true        | 是否开启双向绑定              |  
| slot        | Boolean/Funciton/Vnode/String  | false       | Item 插槽  |
| component   | String          | el-input    | 组件名称                |
| defaultValue| -               | ""           | 组件默认值  |
| slots       | Object/String/Funciton/Vnode   | { }         | 组件插槽 | 
| on          | Object          | { }         | 组件事件  |
| $component  | Object          | { }         | [组件动态属性](/example/edge-cases.html#%E5%8A%A8%E6%80%81%E5%B1%9E%E6%80%A7%E7%9A%84%E5%86%B2%E7%AA%81)  |
| ......      | ......          | ......   | 组件动态属性      |
| ......      | ......          | ...... | [el-col 属性](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)      | 
| ......      | ......          | ...... | [el-form-item 属性](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes)      |
| ......      | ......          | ...... | [el-descriptions-item 属性](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-item-attributes)      |      


### 配置结构

为了更好的理解数据配置的结构，如例：

```js
  from: {
    data:{},
    // agel-form 的属性
    // el-form 的属性
    // el-row  的属性
    // el-col  的属性
    // el-descriptions 的属性
    items:[
      {
        component:"el-input",
      // agel-form-item 的属性
      // el-form-item 的属性
      // el-col 的属性
      // el-descriptions-item 的属性
      // component 组件的动态属性
      }
    ]
  },
```
