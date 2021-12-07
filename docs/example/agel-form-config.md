# 表单配置

### Form Attributes


| 属性        | 类型         | 默认值  | 说明                                   | 
| ----------- | ------------ | ------ | ------------------------------------  |
| data        | Object       | { }    | 表单数据                                  | 
| items       | Array/Object | { }    | 表单项配置                         | 
| on          | Object       | { }    | 表单事件                |  
| inline      | Boolean      | false  | 内联样式布局      | 
| descriptions| Boolean      | false  | 描述表格样式布局      |
| responsive  | Boolean      | false  | 响应式布局      | 
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
| slot        | Boolean/Funciton/Vnode/String  | false       | Form Item 插槽  |
| component   | String          | el-input    | 组件名称                |
| slots       | Object/String/Funciton/Vnode   | { }         | 组件插槽 | 
| on          | Object          | { }         | 组件事件  |
| ......      | ......          | ......   | 组件动态属性      |
| ......      | ......          | ...... | [el-col 属性](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)      | 
| ......      | ......          | ...... | [el-form-item 属性](https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes)      |
| ......      | ......          | ...... | [el-descriptions-item 属性](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-item-attributes)      |      


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