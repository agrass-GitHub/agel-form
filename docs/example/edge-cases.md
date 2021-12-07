# 边界情况

:::tip 提示
这里记录的都是和处理边界情况有关的功能，即一些需要对规则做一些小调整的特殊情况。
:::


#### 分散参数

在设计上，主张的是聚拢所有参数为一个 `form` 对象，组件会在创建时候自动注入全局属性和方法到该对象，副作用就是`form` 对象不可设置为计算属性，会导致响应式失效。

为了在某些场景下保证灵活性，可以使用 `attach` 进行分散参数，配置项与 `form` 一致，当该对象属性发生变化时候，会同步属性合并到 `form` 对象中。

```html
 <agel-form v-model="form" :attach="{data,items,inline}"/> 
```

<ClientOnly><attach-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/attach-form.vue
::: 


#### 扩展&忽略 item 属性

当你想对 `item` 添加自定义的属性来实现某些需求，又不想该属性注入到 `component` 中，可以使用 `item-ignore-keys` 属性。

```html
<agel-form v-model="form" :item-ignore-keys="['collapseAlive']"/>
```


#### 动态属性的冲突

当组件的动态属性与现有的 `item.xx` 属性产生重名冲突，可使用 `$component` 属性解决。

```js
 {
  label: "radio 组件",
  component: "el-radio",
  border: true,
  slots: "边框",
  $component: {
    label: "radio组件的label属性",
  },
},
```


