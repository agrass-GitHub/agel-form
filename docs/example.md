---
title: 演示教程
sidebar: auto
---

# agel-form | 使 element-ui form 组件更简单

## 特性

该组件的思想就是以一个 form 对象来做所有的操作，纯数据配置也有高度的灵活性，还有更方便的全局配置, 支持 element-ui 所有组件配置。


## 安装使用

`cnpm install agel-from --save`


## 典型表单 

<ClientOnly><basics-form/></ClientOnly>

::: details 点击查看代码
```html
<template>
  <div class="demo" >
    <agel-form v-model="form"> </agel-form>
    <el-button type="primary" @click="submitForm">立即创建</el-button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        "label-position": "right",
        "label-width": "80px",
        span: 18,
        data: {},
        items: {
          name: {
            label: "活动名称",
            required: true, // 设置 required 会自动生成必填 rules
          },
          region: {
            label: "活动区域",
            component: "el-select",
            options: [
              { label: "区域一", value: "shanghai" },
              { label: "区域二", value: "beijing" },
            ],
            rules: [
              { required: true, message: "请选择活动区域", trigger: "change" },
            ],
          },
          date: {
            component: "el-date-picker",
            label: "活动时间",
            type: "date",
            placeholder: "选择日期",
          },
          delivery: {
            component: "el-switch",
            label: "即时配送",
          },
          type: {
            component: "el-checkbox-group",
            label: "活动性质",
            options: [
              { label: "美食/餐厅线上活动", value: "1" },
              { label: "地推活动", value: "2" },
              { label: "线下主题活动", value: "3" },
              { label: "单纯品牌曝光", value: "4" },
            ],
            rules: [
              {
                type: "array",
                required: true,
                message: "请至少选择一个活动性质",
                trigger: "change",
              },
            ],
          },
          resource: {
            component: "el-radio-group",
            label: "特殊资源",
            options: [
              { label: "线上品牌商赞助", value: "1" },
              { label: "线下场地免费", value: "2" },
            ],
            rules: [
              { required: true, message: "请选择活动资源", trigger: "change" },
            ],
          },
          desc: {
            label: "活动形式",
            type: "textarea",
            required: true,
          },
        },
      },
    };
  },
  methods: {
    submitForm() {
      this.form.validate(() => {
        alert("submit!");
      });
    },
  },
};
</script>
```
:::

## 行内表单 

<ClientOnly><inline-form/></ClientOnly>

::: details 点击查看代码
```html
<template>
  <agel-form class="demo" v-model="form"> </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        inline: true,
        data: {},
        items: {
          name: { label: "活动名称" },
          region: { label: "活动区域" },
        },
      },
    };
  },
};
</script>
```
::: 

## 布局表单

<ClientOnly><layout-form/></ClientOnly>

::: details 点击查看代码
```html
<template>
  <agel-form class="demo" v-model="form"> </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        "label-position": "right",
        "label-width": "80px",
        data: {},
        gutter: 5, // 栅格间距
        span: 24, // 全局span
        items: {
          name: {
            label: "姓名",
            span: 10,
            placeholder: "设置 span 6",
          },
          region: {
            label: "地址",
            span: 13,
            offset: 1,
            placeholder: "设置 span 13 offset1",
          },
          span: {
            label: "介绍",
            placeholder: "不设置则受全局 form span  label-width 影响",
          },
          labelWidth: {
            label: "标签很长很长",
            "label-width": "135px",
            placeholder: "单独设置 label-width 135px",
          },
        },
      },
    };
  },
};
</script>
```
::: 