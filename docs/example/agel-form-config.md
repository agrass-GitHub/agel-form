# 表单配置

### Form Props

| 属性            | 类型   | 必填 | 说明                               |
| -----------     | ------ | ---- | --------------------------------  | 
| v-model / value | Object | 是   | form 参数配置，建议使用 v-model    | 
| attach          | Object | 否   | form 参数配置，会同步到 v-modele    | 
| item-extend-keys| Array  | 否   | 对 item 项添加扩展属性    | 

#### v-model/value 属性

正常情况下,我们只需要配置一个基础的 `form` 对象即可, 所有的属性都是可选的, 组件会在创建时候自动注入默认属性和方法到该对象。

#### attach 属性

在设计上，主张的是聚拢所有的参数为一个 form 对象，有一个弊端是 `v-model/value` 不可设为计算属性, 会导致没法注入默认属性和方法。

为了保持其灵活性，添加了 `attach` 参数，配置项与 form 一致，该属性可以设置为计算属性，当其发生变化时候，会同步合并到 `form` 对象中，如下例子：

<ClientOnly><attach-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/attach-form.vue
::: 

#### item-extend-keys 属性

包含在内的属性名不会注入到组件的动态属性。

当你想添加自定义的属性，又不想注入`component`组件中使用。该属性一般用于基于 `agel-form` 封装高阶组件使用, 目的是对 `form.item` 添加扩展属性。(参考 [agel-search-panel](/component/agel-search-panel.html#折叠) 组件的 item.collapseAlive )。


### Form Attributes


| 属性        | 类型         | 默认值  | 说明                                   | 
| ----------- | ------------ | ------ | ------------------------------------  |
| ......      | ......       | ...... | 支持所有 [el-form 属性](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)      | 
| ......      | ......       | ...... | 支持所有 [el-row 属性](https://element.eleme.cn/#/zh-CN/component/layout#row-attributes)      | 
| ......      | ......       | ...... | 支持所有 [el-col 属性](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)      |  
| data        | Object       | { }    | 数据                                  | 
| items       | Array/Object | { }    | 表单子组件配置                         | 
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
| getItem       | prop:string，deep:boolean   | 获取指定 item 对象，deep 可获取完整属性  | 
| getRef        | prop:string   |  获取指定组件的 vue 实例  |


### Form Slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| ...            |  表单项的 prop 具名插槽           |
| prepend        |  表单头部追加内容           |
| append         |  表单尾部追加内容                        |



### Form Item Attributes


| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ |
| ......      | ......          | ...... |  支持所有 [el-col 属性](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)      | 
| ......      | ......          | ...... |  支持所有 [el-form-item 属性](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes)      |   
| ......      | ......          | .........   | 组件的动态属性      |
| component   | String          | -    | 组件名称                |
| prop        | String          | -           | 字段名    | 
| label       | String/String/Funciton/Vnode          | -          | Form Item Label 插槽  |  
| slot        | Boolean/String/Funciton/Vnode  | false       | Form Item 插槽  | 
| slots       | Object/String/Funciton/Vnode   | { }         | Component 组件的插槽 | 
| display     | Boolean/Funciton| true        | 是否渲染                 | 
| show        | Boolean/Funciton| true        | 是否显示                 | 
| disabled    | Boolean/Funciton| false        | 是否禁用              |
| ignore      | Boolean         | false       | 与表单数据取消关联，prop 为则为true  |  
| class       | Boolean         |  -           | class名称    |
| style       | Object/String   | -           | 内联样式     |  
| on          | Object          | { }         | 子组件 evenet 事件  |
| labelWidth  | String          | -           | 继承自 el-form-item  | 
| required    | Boolean         | -           | 继承自 el-form-item  |
| rules       | Array/Object    | -           | 继承自 el-form-item  |
| span        | Number          | -           | 继承自 el-col  |
| $component  | Object          | -           | 组件的动态属性，建议当动态属性与组件属性冲突时使用  |




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
      attach:{},
    };
  }
};
</script>
```