# formDialog 表单对话框

`agel-form-dialog` 组件是基于  `el-dialog` 组件的二次封装组件, 针对表单场景做了一点点的事情。



## 使用

- 点击确定时会对弹窗内所有表单进行验证 `validate`
- 关闭时会对同弹窗内所有表单进行重置 `resetFields`
- 弹窗 `loading` 时无法关闭，并防止重复提交
- 设置 `top` 为 `center` 弹窗可居中
- 设置 `height` 弹窗 body 高度
- 设置 `cusotm-class` 为 `ag-dialog` 可使用内置样式UI

值得注意是，弹窗内隐藏的表单是不会被验证的。

<ClientOnly><agel-form-dialog-demo/></ClientOnly>


::: details 点击查看代码
<<< @/docs/.vuepress/components/agel-form-dialog-demo.vue
:::



## formDialog Attributes

| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| height      | String        | -         | dialog body 高度                |  
| loading     | Boolean       | -         | 加载状态                |  
| confirmBtn  | String/Boolean       | 确定  | 确定按钮文字或关闭                |  
| closeOnPressEscape     | Boolean       | false         |                 |  
| closeOnClickModal      | Boolean       | false         |                 |  
| ......      | ......        | .........   |  [el-dialog 属性](https://element.eleme.cn/#/zh-CN/component/dialog#attributes)      | 


## formDialog Events

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| confirm       | -             |  点击确定按钮触发  | 
| validated     | -             |  所有表单验证成功时触发  | 
| validatedErr  | -          |  表单验证失败时触发  | 


## formDialog Methods

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| validate      | susseccCallback      |  验证所有表单  | 

## formDialog slots

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| button        | -             |  按钮  | 

支持所有 [el-dialog 属性，事件，插槽](https://element.eleme.cn/#/zh-CN/component/dialog)

