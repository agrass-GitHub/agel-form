---
title: 更新日志
sidebar: auto
---

:::warning
[#v.0.3.30](/log.html#v-0-3-30-2022-01-04) 版本重构了部分代码，有破坏性更新，请按照升级提示操作。

有需要可联系作者:agrass-weixin。
:::

## v.0.3.38 （ #2022-10-30 ）

#### tableditor-menu-column
- `bug` del 设置false 失效

## v.0.3.37 （ #2022-10-29 ）

#### agel-upload
- `bug` onRemove 回调函数报错
- `new` file.name 不再是必须，默认取 fiel.url 文件后缀作为 name
- `new` 新增支持 string 类型 vlaue
- `change` 移除了附件列表的过渡效果 

## v.0.3.36 （ #2022-09-28 ）

#### agel-form
- `bug` disabled 失效 优先级调整
- `bug` placeholder 优先级调整
- `new` 支持动态增减表单 display show 取到当前行数据 （tableditor display 除外）

## v.0.3.35 （ #2022-09-25 ）

#### agel-form
- `bug` 修复渲染 Array[Vnode] 类型插槽报错
- `new` 新增支持 placeholder 属性在全局配置
- `new` 新增支持 disabled 属性在全局配置

## v.0.3.34 （ #2022-01-12 ）

#### agel-form
- `new` 新增在验证错误时返回验证信息 form.validate(call,errCall([errorInfo]())) 

#### agel-slect，agel-radio，agel-checkbox
- `bug` getValueOption 方法新增 value 参数，修复在 input change 事件获取异常；修复在多选时偶发性获取异常；修复 agel-slect 在分组下获取失败

#### agel-search-panel
- `bug` 修复折叠报错的问题
- `new` 新增 getRef 方法

## v.0.3.33（ #2022-01-10 ）

#### agel-form
- `bug` 修复form.data 被赋值新对象时回填默认值未生效 [[bug by v.0.3.3]]()
- `bug` 修复回填组件默认值为数组时，引用对象地址相同的问题 [[bug by v.0.3.3]]()
- `bug` 修复使用 vite 启动项目报错[issues[6]](https://github.com/agrass-GitHub/agel-form/issues/6)
- `new` form.data 被赋值新对象时会清空表单验证信息
- `new` 新增动态表单功能，支持所有布局
- `new` 新增视图模式功能，支持所有布局，新增item.viewModel, item.viewFormat data._view_ 属性
- `change` tableditor inlien grid descriptions 布局组件移除 value 参数，不必要的参数

#### agel-form-tableditor
- `bug` 修复被删除行的验证信息继承到下一行的问题

#### tableditor-menu-column
- `bug` 修复编辑保存需要点击两次的问题
- `new` add edit del 属性支持函数回调
- `new` 新增 delConfirm 删除确认属性

#### agel-dynamic-tags
- `bug` 修复 rule 验证在 change 时没有实时触发的问题
- `new` 新增 create 事件

#### agel-uplaod
- `bug` 修复 rule 验证在 change 时没有实时触发的问题
- `bug` 修复调用 clearFiles 方法报错


## v.0.3.32（ #2022-01-06 ）

#### agel-select
- `bug` 修复开启 remote remote-method 异常展示的问题 [issues[5]](https://github.com/agrass-GitHub/agel-form/issues/5)

#### agel-select，agel-tree-select，agel-checkbox，agel-radio 
- `bug` 修复 :value="xx" 时未绑定事件报错的问题
- `bug` 修复 :value="xx" 时未绑定 @input，@change 值为空的问题

## v.0.3.30 （ #2022-01-04 ）

#### agel-form
- `bug` 修复 agel-radio 组件因初始值为 undefined 时触发表单 rules，初始值调整为 ""
- `bug` 修复 el-descriptions-item 的属性被注入到 component 中
- `new` 新增 表格编辑器布局
- `new` 新增(拆分) inline grid descriptions tableditor 四个布局子组件
- `new`  item.prop 支持深层级深结构绑定
- `new`  item.vmodel 支持 .number .trim 修饰符
- `new`  item.componet 支持组件实例，异步组件
- `new`  item.slot slots label 插槽支持组件实例
- `change` el-input-number 默认值由 0 调整为 undefined；
- `change` el-date-picker el-time-select 默认值由 null 调整为 ""
- `change` descriptions 布局默认开启 border样式，优化在 border:false 时排版
- `change` grid 布局自适应规则调整，只支持响应 el-col 参数
- `change` 修改组件导入逻辑, Vue.use(agelForm) 会默认注册核心组件到全局
```js
const coreComponents = [agelForm, agelFormItem, agelFormGrid, agelFormInline, agelFormTableditor, agelFormDescriptions,agelRadio,agelCheckbox, agelSelect,agelTreeSelect,agelUpload,agelText]
```
- `破坏性` 全局配置逻辑修改，单组件配置必须使用函数返回配置，移除 prop form 参数，新增可配置组件初始值 defaultValue 
```js
// old
"el-input":{ clearable:true }
"el-input":(prop,item,form)=> return { clearable:true }
// new
"el-input":(item)=> return { clearable:true }
```
- `破坏性` agel-form 转为包装组件，布局由 form.layout 属性来支持
```js
// old
const form = { inline:true }  || { descriptions:true }
// new
const form = { layout:"inline" }  || { layout:'descriptions' }
```

#### agel-search-panel
- `bug` 修复自定义表单插槽时 input v-model 失效
- `new` 在点击查询按钮时验证表单规则
- `change` 默认折叠调整为 true
- `破坏性` 移除了按钮属性配置，调整为在全局配置提供按钮 render
- `破坏性` 移除了 form 参数，调整为从组件中获取 props 参数，把 :form 改成 v-bind 可快速兼容

```html
<!--old--->
<agel-search-panel :form="{data,items,....}"/>  || <agel-search-panel :form="form" />
<!--new--->
<agel-search-panel :data="data" :items="items" /> || <agel-search-panel v-bind="form" />
```

#### agel-map-input
- `new` 新增地图选择器组件

#### agel-dynamic-tags
- `new` 新增动态标签组件

#### agel-checkbox
- `new` 新增 active-value inactive-value 属性

#### agel-tree-select
- `new` 新增 closableTags 属性

#### agel-form-dialog
- `new` 开启 loading 时 dialog footer 插槽中所有按钮都会禁用
- `change` loading 开启时确定按钮由 loading 调整为禁用状态，避免场景歧义

#### agel-upload
- `new` 文件预览兼容大写后缀名

## v.0.3.2

#### agel-form
- `bug` 修复必填 required 在部分组件中未生效
- `new` 新增 descriptions 属性，支持 el-descriptions 组件布局
- `new` 新增 item.vmodel 属性，控制是否双向绑定
- `new` 新增 agel-text 内置组件
- `change` 移除 item.ignore 属性
 
#### agel-upload
- `bug` beforeUpload 钩子函数未生效
- `bug` 修复手动上传错误，样式不可调整
- `bug` abort 方法失效

#### agel-form-dialog 
- `new` 新增表单弹窗组件


## v.0.3.1

#### agel-form
- `new` el-autocomplete 组件支持 placeholder value 回填

#### agel-select，agel-tree-select，agel-checkbox，agel-radio
- `bug` 修复 options 变化未触发响应式更新
- `bug` 修复多选时 value[string(1,2,3)] 与 option value[number(1)] 类型不一致导致匹配异常的问题，
- `bug` 修复 change 事件与 input 事件回调参数不一致的问题
- `new` option 支持 class，style 配置

#### agel-select，agel-tree-select
- `bug` 修复多选时loading 图标和 loading-placeholder 被 tags 遮挡，调整为 v-loading 实现加载效果，取消loading-placeholder 展示

#### agel-checkbox，agel-radio
- `bug` 修复内联表单下设置 style 固定宽度，loading 图标旋转展示异常的问题

#### agel-tree-select
- `bug` 修复 value 存在 options 为空时报错
- `bug` 修复 value 未找到对应树节点时报错
- `bug` 修复懒加载 value 关联异常的问题
- `new` 新增 prefix 插槽
- `new` 新增 option 插槽，以支持模板写法
- `change` 选中树节点，勾选树节点相关逻辑，value，代理value，展示value 相关逻辑


## v.0.3.0

#### agel-select
- `bug` 修复 filter 属性在开启组配置时过滤失效
- `bug` 修复 loading-placeholder 导致异步请求 options 时触发表单 rules


## v.0.2.9

#### agel-tree-select
- `bug` 修复 options 配置异常

## v.0.2.8

#### agel-tree-select
- `bug` value 发生变化，自动触发更新 tree 选中状态和 el-select 的 value

## v.0.2.7

#### agel-form
- `bug` placeholder 智能回填

#### agel-search-panel 
- `bug` items 为对象时折叠失败
- `change` button 插槽调整为默认


## v.0.2.6

#### agel-form
- `new` 添加搜索面板组件 agel-search-panel 
- `new` 添加 item.show 属性, 支持函数配置
- `new` 添加 form.itemExtendKeys 属性, 便于二次封装
- `change` 表单项在内联布局和栅格布局情况采用不同的排版优化
- `change` 在 labelPosition 为 top 的情况下,对 radio checkbox 组件的布局排版优化
 
## v.0.2.5

#### agel-form
- `new` 添加 prepend append 插槽，方便自定义标题按钮等
- `change` agel-select，agel-tree-select 表单默认回填为 "" 空字符串 
- `change` item.component 包含 agel-xxx 的情况下，智能回填失效的问题

## v.0.2.4

#### agel-form
- `new` item.$component 属性，解决组件动态属性与现有属性产生冲突的问题

#### agel-select，agel-tree-select，agel-checkbox，agel-radio
- `bug` 异步加载 options 刷新组件选中状态，不再每次刷新触发 input 事件
- `new`  getValueOption 方法

#### agel-select，agel-tree-select
- `new` setSelected 方法， agel-tree-select 的 selected 方法名更改为 setSelected



## v.0.2.3

#### agel-tree-select
- `bug` input change 事件触发多次的问题

## v.0.2.2

#### agel-form
- `bug` placeholder 智能回填失败的问题
- `bug` 重构了部分逻辑
- `change` 只有在栅格布局情况下，才会注入默认的栅格布局属性
- `change` prop 属性取消必填，将默认生成 guid, 若未填写该字段将不与表单关联
- `change` 动态增加表单项也能智能回填字段默认值


#### agel-select，agel-tree-select，agel-checkbox，agel-radio
- `new` agel-select，agel-tree-select，agel-checkbox，agel-radio options 属性支持字符串配置
- `new` 多选时 value 可设置为字符串，逗号间隔

#### agel-tree-select
- `new` selected 方法


## v.0.2.1

#### agel-form
- `bug` display 属性导致显示错误的问题

## v.0.2.0

#### agel-form
- `change` 移除 item.custom 属性，重构自定义组件逻辑，更加方便纯粹
- `change` 移除 item.show 属性
- `change` slot render 函数不再传递 h（$createElement） 参数
- `new` 根据表单字段初始化 form.data，关联响应式
- `new` form.responsive  form.responsiveMethod 根据父容器宽度自动响应式
- `new` item.display  属性支持函数配置，实现表单联动
- `new` item.disabled 属性支持函数配置，实现表单联动
- `new` 单组件支持在项目中单独引入使用
- `change` 全局配置支持对象，函数形式写法
- `change` 使用文档重构

#### agel-radio-group -> agel-radio
- `change` agel-radio-group 更改名称为 agel-radio，对 radio 和 radio-group 进行了合并

#### agel-checkbox-group -> agel-checkbox
- `change` agel-checkbox-group 更改名称为 agel-checkbox，对 checkbox 和 checkbox-group 进行了合并

#### agel-select，agel-tree-select，agel-checkbox，agel-radio
- `new` options 属性支持字符串数组，异步函数，Promise

## v.0.1.2
- `bug` agel-select 在开启 filter 且有分组的情况下，过滤报错的问题
- `bug` agel-tree-select，value change 的时候没有自动回填
- `change` 取消打包为 lib.umd.js，包直接指向 src
- `change` agel-input-tree 更改名称为 agel-tree-select
- `new` agel-upload 添加 limitHide 属性，超出限制隐藏上传按钮
- `new` agel-upload 添加 preview 属性可设置为函数
- `new` 方便自定义组件，新增 item.custom 属性


## v.0.1.1
- `bug` agel-upload 在外网预览 doc 文件失败，由 xdocin 转为 微软 officeapps 服务提供在线预览

## v.0.1.0
- `new` items 支持数组配置，添加 getItem 内置方法
- `new` 支持 el-row el-col 所有属性
- `new` 支持组件 label slot 配置 
- `new` 支持组件 slots 配置 
- `new` 自动添加 placeholder 属性
- `new` 添加 item.ignore 属性
- `new` agel-upload 组件多种样式兼容,添加预览文件功能，添加钩子函数默认提醒
- `change` 全局配置逻辑修改


## v.0.0.1 - v.0.0.3
- `new` 纯数据配置表单
- `new` 封装 agel-input-tree 组件
- `new` 封装 agel-upload 组件
- `new` 封装 agel-select 组件，支持过滤，组配置
- `new` 封装 agel-checkbox-group 组件
- `new` 封装 agel-radio-group 组件
- `new` 根据 required 生成必填 rules