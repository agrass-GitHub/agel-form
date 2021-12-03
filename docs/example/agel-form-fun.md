# 表单功能


## 联动表单

设置 `display`，`show`，`disabled` 为函数来控制表单是否渲染，是否显示隐藏，是否禁用。

<ClientOnly><display-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/display-form.vue
:::

## 表单验证

表单验证同 [el-from 表单校检](https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng)一致，都是使用的 [async-validator](https://github.com/yiminghe/async-validator)。

`form.rules` 和 `item.rules` 都支持写验证规则，`rules` 为空的情况下设置 `required:true` 将回填一个必填 `rules`，规则如下：

```js
{required:true, trigger:'change' ,message:label + '必填'}
```

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
slots:"查询"  ==>  slots:h("span",{},"查询")  ==>  slots:{ default:h("span",{},"查询") }
```

更多基础知识请参考 [渲染函数 & JSX](https://cn.vuejs.org/v2/guide/render-function.html)