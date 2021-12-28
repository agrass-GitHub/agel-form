# 创建表单

:::tip 预先了解
- 表单创建时会根据组件类型智能回填 `form.data`，关联响应式不必手动 set 
- 表单创建时会根据组件类型智能回填 `placeholder`
- 表单组件会根据 `required` 智能回填必填验证规则
- 表单搭配内置单组件可以省略掉 `ag` 前缀
- `form.items` 支持数组/对象配置
- `item.component` 为空是默认为 `el-input`
:::


## 行内表单 

表单通过 [agel-form-inline]() 布局组件实现行内布局，设置 `layout：inline` 开启。

`form` 支持 [el-form]() 组件的属性, `label-width` 默认为 `atuo`。

`item` 支持 [el-form-item]() 组件的属性，支持 `component` 组件的动态属性。

以上是一个最基础的属性支持，在不同的布局下额外支持不同的组件属性。

<ClientOnly><inline-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/inline-form.vue
::: 

## 栅格表单

表单通过 [agel-form-grid](https://element.eleme.cn/#/zh-CN/component/layout#layout-bu-ju) 组件来实现栅格布局，设置 `layout：grid` 开启栅格表单（默认）。

`form` 支持 [el-row](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)，[el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)组件的属性，默认为 `flex` 模式。

`item` 支持 [el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes) 组件的属性，若未设置将会默认继承 `form` 对象上的 `el-col` 属性。

<ClientOnly><grid-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/grid-form.vue
:::

## 描述表单

表单通过 [agel-form-descriptions](https://element.eleme.cn/#/zh-CN/component/descriptions) 组件来实现描述布局，设置 `layout：descriptions` 开启。

`form` 支持 [el-descriptions](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes)组件的的属性，同样支持相关插槽。

`item` 支持 [el-descriptions-item](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes) 组件的属性，使用 `agel-text` 组件可实现纯文字展示。

<ClientOnly><descriptions-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/descriptions-form.vue
:::

## 表格编辑器表单

表单通过 [agel-form-tableditor]() 组件来实现表格编辑器，设置 `layout：tableditor` 开启。

`form` 支持 [el-table](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes)组件的的部分属性，和所有事件。

`item` 支持 [el-table-column](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes) 组件的部分属性。

在该布局下，`form.data` 必须为数组；通过 `row._edit_` 属性可控制列表行是否处于编辑状态；可以从 `agel-form` 中导入 [tableditor-menu-column]() 表格列组件，实现了动态增删改的功能。

<ClientOnly><tableditor-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/tableditor-form.vue
:::


## 响应式表单

响应式是基于 [agel-form-grid]() 组件实现，设置 `responsive:true` 开启响应式。

表单会根据容器宽度自动调整栅格大小，但 `item` 的栅格属性优先级最高，响应式规则如下：

- 宽度 <= 400px， `span：24`，`labelPosition：top`
- 400px > 宽度 <= 600px，`span 24`，`labelPosition：right`
- 600px > 宽度 <= 900px，`span 12`，`labelPosition：right`
- 900px > 宽度 <= 1200px，`span 8`，`labelPosition：right`
- 1200px > 宽度 <= 1600px，`span 4`，`labelPosition：right`
- 1600px > 宽度，`span 24`，`labelPosition：right`

也可以通过配置 `responsiveMethod` 属性来自定义响应式规则，接受一个宽度参数，需要返回一个对象，支持 `labelPosition`, [el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes) 组件参数对象。

<ClientOnly><resize-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/resize-form.vue
::: 


## 表单联动

设置 `display`，`show`，`disabled` 为函数来控制表单是否渲染，是否显示隐藏，是否禁用。

<ClientOnly><display-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/display-form.vue
:::

## 表单方法


和传统的通过 `$refs.form.xxx()` 来调用组件方法有所不同，在 `agelForm` 中方法会自动注入到 `form` 对象中，建议直接通过 `form.xxx()` 来调用。

表单事件通过 `form.on` 定义，组件事件通过 `item.on` 进行定义，表单验证通过 `form.rules` 和 `item.rules` 定义，`rules` 为空的情况下设置 `required:true` 将回填一个必填 `rules`。

<ClientOnly><method-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/method-form.vue
:::


## 表单插槽

### 表单插槽 prepend append 

表单支持在前后追加插槽内容，在不同的布局下需要不同的容器包裹。

<ClientOnly><slot-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/slot-form.vue
:::


### 表单项插槽 label slot slots

这是保证 `agel-form` 灵活性的一个很核心的功能。

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

设置不同 `layout` 属性，`form` 可额外支持其他 `布局属性`。

| 属性        | 类型         | 默认值  | 说明                                   | 
| ----------- | ------------ | ------ | ------------------------------------  |
| labelWidth  | String       | auto   | 继承自 el-form  | 
| data        | Object       | { }    | 表单数据                                  | 
| items       | Array/Object | { }    | 表单项配置                         | 
| on          | Object       | { }    | 表单事件                |  
| layout      | String       | grid   | 布局方式 grid,inline,descriptions,tableditor      | 
| ......      | ......       | ...... | [Layout 属性]()      |


### Form Item Attributes

设置不同 `layout` 属性，`item` 可额外支持其他 `布局属性`。


| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ |
| label       | String/Funciton/Vnode  | -          | label 名称 / 插槽  |
| prop        | String          | -           | data 关联字段名    | 
| display     | Boolean/Funciton| true        | 是否渲染                 | 
| show        | Boolean/Funciton| true        | 是否显示                 | 
| required    | Boolean         | false       | 是否生成必填验证   |
| slot        | Boolean/Funciton/Vnode/String  | false       | Item 自定义插槽  |
| component   | String/Component/Async Function | el-input    | 组件名称                |
| disabled    | Boolean/Funciton| false       | 组件是否禁用              |
| vmodel      | Boolean         | true        | 组件双向绑定，支持修饰符.number .trim              |  
| slots       | Object/String/Funciton/Vnode   | { }         | 组件插槽 | 
| on          | Object          | { }         | 组件事件  |
| ......      | ......          | ......      | 组件动态属性      |
| ......      | ......          | ......       |  [Layout Item 属性]()      |

  <!--
  | ......      | ......          | ...... | [el-col 属性](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)      | 
| ......      | ......          | ...... | [el-form-item 属性](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes)      |
| ......      | ......          | ...... | [el-descriptions-item 属性](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-item-attributes)      |    
  
    -->


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

