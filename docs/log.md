---
title: 更新日志
sidebar: auto
---


## v.0.3.3

#### agel-form
- `bug` 修复部分内置组件初始值为 undefined 时触发表单 rules
- `bug` 修复 el-descriptions-item 的属性被注入到 component 中
- `new` 新增 form.layout tableditor 表格编辑器布局
- `new` 新增 item.defaultValue 属性
- `new` 新增 item.vmodel 支持 .number .trim 修饰符
- `new` 新增 item.componet 支持类型 支持组件实例，异步组件
- `change` el-input-number 默认值由 0 调整为 undefined；
- `change` 优化 descriptions 布局 在 border:false 时排版
- `patch` 新增 form.layout 属性支持布局，仍兼容旧写法（不推荐）
```js
// old
const form = { inline:true }  || { descriptions:true }
// new
const form = { layout:"inline" }  || { layout:'descriptions' }
```

#### agel-search-panel
- `bug` 修复自定义表单插槽时 input v-model 失效
- `new` 在点击查询按钮时验证表单规则
- `new` 新增了折叠，搜索，重置按钮插槽，移除了按钮属性配置
- `change` 移除了该组件的全局配置
- `change` 优化按钮在栅格布局下的排版
- `patch` props 参数修改为依靠组件本身传递，仍兼容从 form 中获取 porps 参数（不推荐）
```vue
<template>
  <!--old--->
  <agel-search-panel :form="{panelPosition,searchButton, resetButton,collapse,collapseButton,collapseAlive}"/>
  <!--new--->
  <agel-search-panel :form="form" panelPosition searchButton resetButton collapse collapseButton collapseAlive/>
</template>
```

#### agel-checkbox
- `new` 新增 active-value inactive-value 属性

#### agel-map-input
- `new` 新增地图选择器组件

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
`new` 新增表单弹窗组件


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