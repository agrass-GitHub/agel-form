# DynamicTags 动态标签

`agel-dynamic-tags` 组件是基于 `el-tag`  `el-input` 的封装组件。


## 使用

<ClientOnly><dynamic-tags-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/dynamic-tags-demo.vue
:::


## DynamicTags Attributes

| 属性         | 类型            |  默认值  | 说明                                 | 
| ------------ | ------------    | ------ | ------------------------------------ | 
| value        | Array           | []     | 绑定值                |  
| disabled     | Boolean         | false  | 是否禁用                  |  
| createable   | Boolean         | true   | 是否可创建标签                |  
| repeatable   | Boolean         | false  | 是否可创建重复标签                |  
| closable     | Boolean         | false  | 是否可关闭标签     |
| type         | String          | -      | 类型       |
| effect       | String          | -      | 主题       |
| color        | String          | -      | 颜色       |
| hit          | String          | -      | 描边       |
| tagPropHandle | Function(tag,index )        |        | 自定义每个标签的 prop


## DynamicTags Events

| 属性          | 参数           |  说明                                   | 
| -----------  | ------------  |  ------------------------------------  | 
| close        | tag,index        | 关闭时触发                     |
| click        | tag,index        | 点击时触发                     |