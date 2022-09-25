# 创建表单


:::tip 预先了解
- 表单创建时会根据组件类型智能回填 `form.data`，关联响应式不必手动 set 
- 表单创建时会根据组件类型智能回填 `placeholder`
- 表单组件会根据 `required` 智能回填必填验证规则
- `form.items` 支持数组/对象配置，对象 key 将默认为 `item.prop`
- `item.component` 为空是默认为 `el-input`
- el-radio checkbox select upload 会被默认转为被数据化的 agel-xx 组件
:::


## 行内表单 

表单通过 [agel-form-inline](/component/agel-form-layout.html#layout) 布局组件实现行内布局，设置 `layout：inline` 开启。

`form` 支持 [el-form](https://element.eleme.cn/#/zh-CN/component/form#form-attributes) 组件的属性, `label-width` 默认为 `atuo`。

`item` 支持 [el-form-item](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes) 组件的属性，支持 `component` 组件的动态属性。

以上是一个最基础的属性支持，在不同的布局下额外支持不同的组件属性。

<ClientOnly><inline-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/inline-form.vue
::: 

## 栅格表单

表单通过 [agel-form-grid](/component/agel-form-layout.html#agelformgrid) 组件来实现栅格布局，设置 `layout：grid` 开启栅格表单（默认）。

`form` 支持 [el-row](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)，[el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)组件的属性，默认为 `flex` 模式。

`item` 支持 [el-col](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes) 组件的属性，若未设置将会默认继承 `form` 对象上的 `el-col` 属性。

<ClientOnly><grid-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/grid-form.vue
:::

## 自适应表单

自适应是基于 [agel-form-grid](/component/agel-form-layout.html#agelformgrid) 组件实现，设置 `responsive:true` 开启响应式。

表单会根据 `gird` 容器宽度（非窗口宽度）自动调整栅格大小，但 `item` 的栅格属性优先级最高，响应式规则如下：

```js
  let span = 24;
  if (width >= 500 && width < 900) span = 12;
  if (width >= 900 && width < 1200) span = 8;
  if (width >= 1200 && width < 1600) span = 6;
  if (width >= 1600) span = 4;
  return { span }
```

可以通过 `responsiveMethod` 属性来自定义自适应规则，支持 el-col 参数。

<ClientOnly><resize-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/resize-form.vue
::: 

## 描述表单

表单通过 [agel-form-descriptions](/component/agel-form-layout.html#agelformdescriptions) 组件来实现描述布局，设置 `layout：descriptions` 开启。

`form` 支持 [el-descriptions](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes)组件的的属性，同样支持相关插槽。

`item` 支持 [el-descriptions-item](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes) 组件的属性。

设置`data._view_`可开启视图查看模式，整个表单只会渲染 value（不再渲染组件），可通过 `item.viewFormat` 对数据进行格式化，支持返回 `Vnode`，也可以单独设置`item.viewModel`控制某个字段。

<ClientOnly><descriptions-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/descriptions-form.vue
:::

## 表格编辑表单

表单通过 [agel-form-tableditor](/component/agel-form-layout.html#agelformtableditor) 组件来实现表格编辑器，设置 `layout：tableditor` 开启。

`form` 支持 [el-table](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes)组件的的部分属性，和所有事件。

`item` 支持 [el-table-column](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes) 组件的部分属性。

该布局实际上是一个动态表单，`form.data` 必须为数组，可以从 `agel-form` 中导入 [tableditor-menu-column](/component/agel-form-layout.html#tableditormenucolumn) 表格列组件，实现了增删改的功能，也可自定义实现代替。

同表描述表单一样，你可以设置 `data._view_` 控制该行是否开启视图模式，`item.videModel` 设置单独字段。

<ClientOnly><tableditor-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/tableditor-form.vue
:::


## 动态增减表单

同表格编辑表单一样，要实现在其他布局下的动态表单，只需要把 `form.data` 修改成数组，然后在合适的插槽写添加增减逻辑，插槽作用域里均可获取 `scope.row` `scope.rowIndex` 参数。

<ClientOnly><dynamic-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/dynamic-form.vue
::: 

:::tip agel-form 和 layout 的关系
agel-form 实质上是一个包装组件，在内部包装了 `el-form` 和 `layout` 组件，可以让你少写很多代码。在更复杂的场景下，例如一个表单下有多个分组、块的概念，且样式排版各不同，建议使用 layout 组件来实现需求，[例子参考 Layout](/component/agel-form-layout.html#使用)。
:::

## 表单联动

设置 `display`，`show`，`disabled` 为函数来控制表单是否渲染，是否显示隐藏，是否禁用。

<ClientOnly><display-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/display-form.vue
:::

## 表单方法


和传统的通过 `$refs.form.xxx()` 来调用组件方法有所不同，在 `agelForm` 中方法会自动注入到 `form` 对象中，可以直接通过 `form.xxx()` 来调用。

表单事件通过 `form.on` 定义，组件事件通过 `item.on` 进行定义，表单验证通过 `form.rules` 和 `item.rules` 定义，`rules` 为空的情况下设置 `required:true` 将回填一个必填 `rules`。

<ClientOnly><method-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/method-form.vue
:::

## 表单插槽

:::tip 
插槽功能是保证 `agel-form` 灵活性的一个很核心的功能。
:::


### 表单插槽 prepend append 

表单支持在前后追加插槽内容，在不同的布局下需要不同的容器包裹。

<ClientOnly><slot-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/slot-form.vue
:::


### 表单项插槽 label slot slots

- 表单项插槽支持多种类型， `String`，`VNode`，`Array[Vnode]`，`Function`，`Component`
- 只有 `slot` 属性可额外持 `Template` 模板写法，请使用 `v-slot` 指令

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
| data        | Object/Array       | { }    | 表单数据                                  | 
| items       | Array/Object | { }    | 表单项配置                         | 
| on          | Object       | { }    | 表单事件                |  
| layout      | String       | grid   | 布局方式 grid,inline,descriptions,tableditor      |
| ......      | ......       | ...... | [elForm 属性](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)      | 
| ......      | ......       | ...... | [Layout 属性](/example/agel-form.html#props-keys)      |


### Form Item Attributes

设置不同 `layout` 属性，`item` 可额外支持其他 `布局属性`。


| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ |
| label       | String/Funciton/Vnode  | -          | label 名称 / 插槽  |
| prop        | String          | -           | data 关联字段名    | 
| display     | Boolean/Funciton| true        | 是否渲染                 | 
| show        | Boolean/Funciton| true        | 是否显示                 | 
| required    | Boolean         | false       | 是否生成必填验证   |
| viewModel   | Boolean         | -       | 是否开启视图查看模式   |
| viewFormat  | Function        | -           | 视图模式格式化函数   |
| slot        | Boolean/Funciton/Vnode/String  | false       | Item 自定义插槽  |
| component   | String/Component/Async Component | el-input    | 组件名称/实例/异步组件                |
| disabled    | Boolean/Funciton| false       | 组件是否禁用              |
| vmodel      | Boolean/String  | true        | false 或 .number .trim              |  
| slots       | Object/String/Funciton/Vnode  | { }         | 组件插槽 | 
| on          | Object          | { }         | 组件事件  |
| ......      | ......          | ......      | 组件动态属性      |
| ......      | ......          | ......      | [Layout Item 属性](/example/agel-form.html#props-keys)      |


### Form Methods

 方法会注入到 form 对象，建议直接通过 `form.方法名称()` 来调用。

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| clearValidate | -             |  清空验证                        |
| resetFields   | -             |  表单重置            | 
| validate      | callback,errcallback        |  表单验证                    |
| getItem       | prop:string   | 获取指定 item 对象  | 
| getRef        | prop:string   |  获取指定组件的 vue 实例  |


### Form Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| prepend        |  表单头部追加内容           |
| append         |  表单尾部追加内容                        |
| ......          |  表单项的 prop 具名插槽           |

### Props Keys

::: details 点击查看各布局下支持的 props 属性详情
<<< @/src/utils/const.js
::: 

相关源码 [agel-form/src/utils/const.js](https://github.com/agrass-GitHub/agel-form/blob/master/src/utils/const.js)