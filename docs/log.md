---
title: 更新日志
sidebar: auto
---

## v.0.2.7

- `优化` agel-search-panel button 插槽调整为默认
- `bug` agel-search-panel items 为对象时折叠失败
- `bug` placeholder 智能回填

## v.0.2.6
- `新增` 添加搜索面板组件 agel-search-panel 
- `新增` 添加 item.show 属性, 支持函数配置
- `优化` 表单项在内联布局和栅格布局情况采用不同的排版优化
- `优化` 在 labelPosition 为 top 的情况下,对 radio checkbox 组件的布局排版优化
- `新增` 添加 form.itemExtendKeys 属性, 便于二次封装
 
## v.0.2.5

- `新增` agel-form 添加 prepend append 插槽，方便自定义标题按钮等
- `优化` agel-select，agel-tree-select 表单默认回填为 "" 空字符串 
- `优化` item.component 包含 agel-xxx 的情况下，智能回填失效的问题

## v.0.2.4

- `新增` agel-select 添加 setSelected 方法， agel-tree-select 的 selected 方法名更改为 setSelected
- `新增` agel-select，agel-tree-select，agel-checkbox，agel-radio option 添加 getValueOption 方法
- `新增` item.$component 属性，解决组件动态属性与现有属性产生冲突的问题
- `优化` 异步加载 options 刷新组件选中状态，不再每次刷新触发 input 事件

## v.0.2.3

- `bug` agel-tree-select input change 事件触发多次的问题

## v.0.2.2

- `优化` 只有在栅格布局情况下，才会注入默认的栅格布局属性
- `优化` prop 属性取消必填，将默认生成 guid, 若未填写该字段将不与表单关联
- `优化` 动态增加表单项也能智能回填字段默认值
- `新增` agel-tree-select 新增 selected 方法
- `新增` agel-select，agel-tree-select，agel-checkbox，agel-radio options 属性支持字符串配置
- `新增` agel-select，agel-tree-select，agel-checkbox，多选时 value 可设置为字符串，逗号间隔
- `bug` placeholder 智能回填失败的问题
- `bug`  修复一些不稳定因素


## v.0.2.1
- `bug` display 属性导致显示错误的问题

## v.0.2.0
- `调整` 移除 item.custom 属性，重构自定义组件逻辑，更加方便纯粹
- `调整` 移除 item.show 属性
- `调整` slot render 函数不再传递 h（$createElement） 参数
- `调整` agel-radio-group 更改名称为 agel-radio，对 radio 和 radio-group 进行了合并
- `调整` agel-checkbox-group 更改名称为 agel-checkbox，对 checkbox 和 checkbox-group 进行了合并
- `新增` agel-select agel-checkbox agel-radio 组件的 options 属性支持字符串数组，异步函数，Promise
- `新增` agel-tree-select 新增 options 属性，支持异步函数，Promise，兼容 data 属性
- `新增` 根据表单字段初始化 form.data，关联响应式
- `新增` form.responsive  form.responsiveMethod 根据父容器宽度自动响应式
- `新增` item.display  属性支持函数配置，实现表单联动
- `新增` item.disabled 属性支持函数配置，实现表单联动
- `新增` 单组件支持在项目中单独引入使用
- `优化` 全局配置支持对象，函数形式写法
- `优化` 使用文档重构

## v.0.1.2
- `bug` agel-select 在开启 filter 且有分组的情况下，过滤报错的问题
- `bug` agel-tree-select，value change 的时候没有自动回填
- `新增` agel-upload 添加 limitHide 属性，超出限制隐藏上传按钮
- `新增` agel-upload 添加 preview 属性可设置为函数
- `新增` 方便自定义组件，新增 item.custom 属性
- `调整` 取消打包为 lib.umd.js，包直接指向 src
- `调整` agel-input-tree 更改名称为 agel-tree-select

## v.0.1.1
- `bug` agel-upload 在外网预览 doc 文件失败，由 xdocin 转为 微软 officeapps 服务提供在线预览

## v.0.1.0
- `新增` items 支持数组配置，添加 getItem 内置方法
- `新增` 支持所有 el-row el-col 所有属性
- `新增` 支持组件 label slot 配置 
- `新增` 支持组件 slots 配置 
- `新增` 自动添加 placeholder 属性
- `优化` 全局配置逻辑修改
- `新增` 添加 item.ignore 属性
- `新增` agel-upload 组件多种样式兼容,添加预览文件功能，添加钩子函数默认提醒


## v.0.0.1 - v.0.0.3
- `新增` 纯数据配置表单
- `新增` 封装 agel-input-tree 组件
- `新增` 封装 agel-upload 组件
- `新增` 封装 agel-select 组件，支持过滤，组配置
- `新增` 封装 agel-checkbox-group 组件
- `新增` 封装 agel-radio-group 组件
- `新增` 根据 required 生成必填 rules