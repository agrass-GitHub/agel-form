---
title: 更新日志
sidebar: auto
---

## v.0.2.1
- `bug` display 属性导致显示错误的问题

## v.0.2.0
- `调整` 移除 item.custom 属性，重构自定义组件逻辑，更加方便纯粹
- `调整` 移除 item.show 属性
- `调整` slot render 函数不再传递 h（$createElement） 参数
- `调整` agel-radio-group 更改名称为 agel-radio，对 radio 和 radio-group 进行了合并
- `调整` agel-checkbox-group 更改名称为 agel-checkbox，对 checkbox 和 checkbox-group 进行了合并
- `新增` agel-select agel-checkbox agel-radio 组件的 options 属性支持字符串数组，异步函数，Promise
- `新增` el-tree-select 新增 options 属性，支持异步函数，Promise，兼容 data 属性
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