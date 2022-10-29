# Upload 上传

`agel-upload` 组件是基于 `el-upload` 组件的二次封装组件

## 使用

组件会根据 `listType` `drag` 属性展示不同的默认插槽。

`preview` 属性提供了基础的文件预览功能（图片，音频，视频，office文件，需要`this.$msgbox` 挂载 `el-messagebox` 实例。

`message` 属性在上传错误，文件大小，文件个数超出限制时，会触发默认提示语，需要 `this.$message` 挂载 `el-message` 实例。

`limitHide` 属性会在超出文件限制后隐藏上传按钮，通常使用在类型为 `picture-card` 的上传组件中。

与 `el-upload` 唯一不同的是，在 `onSuccess` 钩子函数中需返回一个包含 name，url 的特定对象，如： `{name:"xx.jpg",url:'http://xxx.jpg}`，这样才能在能保证在上传成功后正确回填到表单。

<ClientOnly><upload-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/upload-demo.vue
::: 

## 演示

<ClientOnly><upload-form/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/upload-form.vue
::: 

## Upload Attributes

 
| 属性        | 类型         | 默认值  | 说明                                 | 
| ----------- | ------------  | ------ | ------------------------------------ | 
| value       | Array/String  | []       | 附件列表，[{name,url}] / url                | 
| drag        | Boolean         | false       | 是否开启拖拽                | 
| tip         | String          | -           | 提示语                      | 
| limitSize   | Number          | -           | 文件大小限制,单位kb                     | 
| limitHide   | Boolean         | false       | 超出允许上传个数隐藏上传按钮               | 
| preview     | Boolean/Funciton| true        | 是否开启文件预览                      | 
| message     | Boolean         | true        | 是否开启钩子函数的默认提示                   |
| onSuccess   | Funciton        | -           | 需返回一个包含 {name,url} 的对象               |
| ......      | ......          | .........   | [el-upload 属性](https://element.eleme.cn/#/zh-CN/component/upload#upload-attributes)      | 

## Upload slots

| 属性          |   说明                                   | 
| -----------    |   ------------------------------------  | 
| default        |  默认插槽                                |
| trigger        |  触发文件选择框的内容                        |
| tip            |  提示说明文字                        |

## Upload Methods

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| submit        | -             |  手动上传文件列表                       |
| abort         | -             |  取消上传请求                       |

## Upload Events

| 属性          | 参数           |  说明                                   | 
| -----------   | ------------  |  ------------------------------------  | 
| ......        | ......        | [el-upload 事件](https://element.eleme.cn/#/zh-CN/component/upload#upload-events)      | 