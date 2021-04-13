---
title: 更新日志
sidebar: auto
---

## v.0.1.2
- `修复` el-select 在开启 filter 且有分组的情况下，过滤报错的问题

## v.0.1.1
- `修复` el-upload 在外网预览 doc 文件失败，由 xdocin 转为 微软 officeapps 服务提供在线预览

## v.0.1.0
- `新增` items 支持数组配置，添加 getItem 内置方法
- `优化` 全局配置逻辑修改
- `新增` 自动添加 placeholder 属性
- `新增` 支持所有 el-row el-col 所有属性,便于实现响应式布局
- `新增` el-upload 组件多种样式兼容,添加预览文件功能，添加钩子函数默认提醒
- `新增` 支持组件 label slot 配置 
- `新增` 支持组件 slots 配置 
- `新增` 添加 ignore 属性


## v.0.0.1 - v.0.0.3
- `新增` 纯数据配置表单
- `新增` 封装 input-tree 组件
- `新增` 封装 upload 组件
- `新增` 封装 select 组件，支持过滤，组配置
- `新增` 封装 checkbox-grou 组件
- `新增` 封装 radio-group 组件
- `新增` 根据 required 生成必填 rules