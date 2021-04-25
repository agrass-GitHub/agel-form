# upload 上传

`agel-upload` 组件是基于 `el-upload` 组件的二次封装组件。

<!-- :::tip
- 使用预览附件功能, 必须保证 `this.$msgbox` 挂载了 `el-messagebox` 实例
- 使用钩子函数提示功能, 必须保证 `this.$message` 挂载了 `el-message` 实例, 在文件上传失败/文件个数/大小超出限制会触发默认提示语
- 和 `el-upload` 唯一不同的是，在 `onSuccess` 钩子函数中需返回一个包含 name，url 的特定对象, 如： `{name:"xx.jpg",url:'http://xxx.jpg}`，这样才能在上传成功后正确回填到表单
::: -->

## 搭配表单使用

`preview` 属性提供了基础的文件预览功能（图片，音频，视频，office文件），正确使用的前提是 `this.$msgbox` 挂载了 `el-messagebox` 实例。

`message` 属性在上传错误，文件大小，文件个数超出限制时，会触发默认提示语，正确使用的前提是`this.$message` 挂载了 `el-message` 实例。

`limitHide` 属性会在超出文件限制后隐藏上传按钮，通常使用在类型为 `picture-card` 的上传组件中。

`agel-upload` 唯一不同的是，在 `onSuccess` 钩子函数中需返回一个包含 name，url 的特定对象，如： `{name:"xx.jpg",url:'http://xxx.jpg}`，这样才能在能保证在上传成功后正确回填到表单。


<ClientOnly><upload-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/upload-form.vue
::: 

## 单独引入使用

<ClientOnly><upload-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/upload-demo.vue
::: 

## Upload Attributes

 
| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| ......      | ......          | .........   | Element-ui [Upload Attributes](https://element.eleme.cn/#/zh-CN/component/upload#upload-attributes)      | 
| drag        | Boolean         | false       | 是否开启拖拽                | 
| tip         | String          | -           | 提示语                      | 
| limitSize   | Number          | -           | 文件大小限制,单位kb                     | 
| limitHide   | Boolean         | false       | 超出允许上传个数，隐藏上传按钮               | 
| preview     | Boolean/Funciton| true        | 是否开启文件预览                      | 
| message     | Boolean         | true        | 是否开启钩子函数的默认提示                   |
| onSuccess   | Funciton        | -           | 需返回一个包含 {name,url} 的对象               |
| slots       | Object          | -           | 自定义 slots    | 