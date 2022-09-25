# 其它规则

:::tip 提示
除开在上一章节提到的 预先了解，这里还有一些不太常用的表单规则。
:::


#### 自定义组件默认值

在全局配置里，可以单独为某个组件/第三方组件设置初始值，智能回填到 `form.data` 中。

```js
const formConfig = {
  "xx-array-input": function () {
    return { defaultValue: [] }
  },
}
Vue.use(agelForm, formConfig);
```

#### 局部加载单组件

若不想把一个不常用的组件注册在全局，可以用 `item.component` 支持加载组件实例，或者异步组件。

```js
// 局部加载组件
import xxxCustomInput from "./xxxCustomInput"
const item = {component:xxxCustomInput} 
// 异步加载组件
const item = {component:()=> import("./xxxCustomInput") } 
```

#### 控制数据流

`item.vmodel` 支持修饰符，也设置 false 可以得到一个类似 `readonly` 的效果，需要在 `input` 事件手动更新值，你可以在 input 时 dosomething 来更加深入的控制数据流。

```js
const form = {
  data:{ },
  items:[ 
    { prop:"a", vmodel:false, on:{ input:(v) => this.form.data.a = v.trim() }},
    { prop:"b", vmodel:".trim" }}  
    { prop:"c", vmodel:".number", type:"number" }} 
  ]
}
```

#### 深层次结构绑定

`item.prop` 可以绑定一个对象的属性。

```js
const form = {
  data:{ 
    obj:{ name:"123"}
  },
  items:[ 
    { prop:"obj.name"} 
  ]
}
```

#### 动态属性的冲突

当组件的动态属性与现有的 `item.xx` 属性产生重名冲突，可使用 `$component` 属性解决。

```js
 {
  label: "radio 组件",
  prop:"radio",
  component: "el-radio",
  $component: {
    label: "radio组件的label属性",
  },
},
```

#### 扩展&忽略 item 属性

当你想对 `item` 添加自定义的属性来实现某些需求，又不想该属性注入到 `component` 中，可以使用 `item-extend-keys` 属性。

```html
<agel-form v-model="form" :item-extend-keys="['collapseAlive']"/>
```


#### 分散参数

设计原因，form对象不可设置为计算属性，可使用 `attach` 进行分散参数，配置项与 `form` 一致，当该对象属性发生变化时候，会同步属性合并到 `form` 对象中。

```html
 <agel-form v-model="form" :attach="{data,items,}"/> 
```

不再推荐使用该属性，在复杂环境下更建议直接使用 [agelFormLayout](/component/agel-form-layout.html) 相关组件实现复杂表单的需求。


