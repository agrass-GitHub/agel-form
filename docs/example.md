---
title: 演示教程
sidebar: auto
---

<!--<ClientOnly><test-form/></ClientOnly>-->

# agel-form | 使 element-ui form 组件更简单

## 特性

该组件的思想就是以一个 form 对象来做所有的操作，纯数据配置也有高度的灵活性，还有更方便的全局配置, 支持 element-ui 所有组件配置，也可以灵活搭配第三方或者自定义的组件进行使用。


## 安装使用

`cnpm install agel-from --save`


## 典型表单 

默认 component 属性是 `el-input` , 设置 `required` 会自动生成必填 rules。

<ClientOnly><basics-form/></ClientOnly>

::: details 点击查看代码
```html
<template>
  <div class="demo">
    <agel-form v-model="form"> </agel-form>
    <el-button type="primary" @click="submit">立即创建</el-button>
    <el-button type="primary" @click="rest">初始化表单</el-button>
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
        data: {
          name: "agel-from",
          delivery: true,
          desc: "学习如何使用",
          file: [{ name: "活动清单.xlsx", url: "xxx.jpg" }],
        },
        items: {
          name: {
            label: "活动名称",
            required: true, // 设置 required 会自动生成必填 rules
          },
          region: {
            // 可设置搜索，配置 group
            label: "活动区域",
            component: "el-select",
            filter: true,
            clearable: true,
            props: { label: "name", value: "id", options: "options" },
            options: [
              {
                name: "热门城市",
                options: [
                  {
                    id: "Shanghai",
                    name: "上海",
                  },
                  {
                    id: "Beijing",
                    name: "北京",
                  },
                ],
              },
              {
                name: "城市名",
                options: [
                  {
                    id: "Chengdu",
                    name: "成都",
                  },
                  {
                    id: "Shenzhen",
                    name: "深圳",
                  },
                  {
                    id: "Guangzhou",
                    name: "广州",
                  },
                  {
                    id: "Dalian",
                    name: "大连",
                  },
                ],
              },
            ],
            on: {
              change: (v) => {
                console.log(v);
              },
            },
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
          file: {
            label: "活动附件",
            component: "el-upload",
            drag: true,
            required: true,
            tip: "这是一个活动附件提示",
            action: `/api/xxxx/upload`,
          },
        },
      },
    };
  },
  methods: {
    submit() {
      this.form.validate(() => {
        alert("submit!");
      });
    },
    rest() {
      this.form.resetFields();
    },
  },
};
</script>
```
:::

## 布局表单

设置 `form.gutter`, `form.span`, `form['label-width']`来设置布局, 也可单独为某一项设置 `span`, `offset`, `label-width` 进行灵活调整，该属性继承 `el-row el-col el-form-item`。

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
            placeholder: "设置 span 10",
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


## 行内表单 

设置为行内表单模式，`gutter` `offset` `span` 属性将会失效。

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

## 树形选择器

支持 `el-tree` 组件所有属性，可通过 `getRef` 方法获取 `tree` 组件实例，`nodeKey` 必填。

<ClientOnly><tree-form/></ClientOnly>

::: details 点击查看代码
```html
<template>
  <div class="demo">
    <agel-form v-model="form"> </agel-form>
    <el-button type="primary" @click="getRef">获取组件实例（控制台）</el-button>
  </div>

</template>
 
<script>
const treeData = [
  {
    label: "一级 1",
    value: "1",
    children: [
      {
        label: "二级 1-1",
        value: "1-1",
        children: [
          {
            label: "三级 1-1-1",
            value: "1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "一级 2",
    value: "2",
    children: [
      {
        label: "二级 2-1",
        value: "2-1",
        children: [
          {
            label: "三级 2-1-1",
            value: "2-1-1",
          },
        ],
      },
      {
        label: "二级 2-2",
        value: "2-2",
        children: [
          {
            label: "三级 2-2-1",
            value: "2-2-1",
          },
        ],
      },
    ],
  },
];
export default {
  data() {
    return {
      form: {
        "label-position": "right",
        "label-width": "80px",
        span: 18,
        data: {
          tree1: "2",
          tree2: ["1-1-1", "2-1-1"],
        },
        items: {
          tree1: {
            label: "普通树形",
            component: "el-input-tree",
            nodeKey: "value",
            data: treeData,
          },
          tree2: {
            label: "多选树形",
            component: "el-input-tree",
            nodeKey: "value",
            showCheckbox: true,
            leafOnly: true,
            data: treeData,
          },
          tree3: {
            label: "过滤树形",
            component: "el-input-tree",
            nodeKey: "value",
            filter: true,
            data: treeData,
          },
          tree4: {
            label: "懒加载树",
            component: "el-input-tree",
            nodeKey: "name",
            lazy: true,
            props: {
              label: "name",
              children: "zones",
              isLeaf: "leaf",
            },
            load: (node, resolve) => {
              if (node.level === 0) {
                return resolve([{ name: "region" }]);
              }
              if (node.level > 1) return resolve([]);
              setTimeout(() => {
                const data = [
                  {
                    name: "leaf",
                    leaf: true,
                  },
                  {
                    name: "zone",
                  },
                ];
                resolve(data);
              }, 500);
            },
          },
        },
      },
    };
  },
  methods: {
    getRef() {
      console.log(this.form.getRef("tree1"));
    },
  },
};
</script>
```
::: 

## slot on 属性

<ClientOnly><slot-form/></ClientOnly>

::: details 点击查看代码
```html
<template>
  <agel-form class="demo" v-model="form">
    <template slot="region">
      <span>这是一段 template 模板自定义文字</span>
    </template>
  </agel-form>
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
            slot: (h) => {
              return h("span", {}, "这是一段 render 函数自定义文字");
            },
          },
          region: { label: "活动区域", slot: true },
          slider: {
            label: "触发事件",
            component: "el-slider",
            defaultValue: 10,
            on: {
              change: (v) => alert(v),
            },
          },
        },
      },
    };
  },
};
</script>
```
:::  

## attach 属性

:::tip
在设计上，主张的是聚拢所有的参数为一个 form 对象，在组件初始化完成后会为 form 参数添加额外的内置属性和方法，因此该参数必须使用 `v-model`，且不可设为计算属性

为了保持其灵活性，添加了 `attach` 参数，配置项与 form 一致，不仅可聚拢也可打散，也可为计算属性，当其发生变化时候，会同步合并到 form 对象中
:::

<ClientOnly><attach-form/></ClientOnly>

::: details 点击查看代码
```html
<template>
  <div class="demo">
    <p>
      <span>行内表单：</span>
      <el-switch v-model="inline"></el-switch>
      <span style="margin-left:20px" v-show="!inline">栅格span：</span>
      <el-input-number v-show="!inline" v-model="span" :min="6" :max="24"></el-input-number>
    </p>
    <agel-form v-model="form" :attach="{items,inline,span}"> </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      inline: true,
      span: 24,
      form: {
        data: {},
      },
    };
  },
  computed: {
    items() {
      return {
        name: { label: "活动名称" },
        region: { label: "活动区域" },
        sex: { label: "性别" },
        age: { label: "年龄", display: !this.inline },
      };
    },
  },
};
</script>
```
::: 

## 全局配置的妙处

:::tip
支持所有属性，以下配置将应用到每个表单上，也可单独为某个表单子组件设置全局配置
:::

可以很方便的为每一个 `el-date-pciker` 设置好日期格式化，也可以配置好公用的 `el-upload` 组件，至于其它的表单子组件就看自己需要去使用配置了。

```js
import agelTable from "agel-from";

Vue.use(agelForm, {
  form: {
    "label-width":"100px",
    span:8,
  },
  "el-upload": function (prop, item, form) {
    const config = {
      action: "/xxxx/upload",
      headers: { token: store.getters.token },
      data: { id: prop },
      onSuccess: (res) => {
        if (res.code == 0) {
          form.data[prop].push(res.data);
        } else {
          Message.error("上传报错");
        }
      },
      onError: () => {
        Message.error("上传报错");
      },
      onPreview: (file) => {
        let suffix = file.name.split(".").pop();
        let isImg = ["png", "jpg", "PNG", "JPG"].includes(suffix);
        let h = new Vue().$createElement;
        MessageBox({
          title: "附件预览",
          message: (() => {
            if (isImg) {
              return <img src={file.url} class="upload-preview" />;
            } else {
              return <span>只可预览图片附件</span>;
            }
          })(),
          confirmButtonText: "下载",
        }).then(() => window.open(file.url, "_blank"));
      },
    }
    return config
  },
  "el-date-picker": function (prop, item) {
    let valueFormat = undefined;
    if (item.type == undefined || item.type == "daterange") valueFormat = "yyyy-MM-dd";
    if (item.type == "datetime" || item.type == "datetimerange") valueFormat = "yyyy-MM-dd HH:mm:ss";
    if (item.type == "month") valueFormat = "yyyy-MM";
    return {
      valueFormat
    }
  }
});
```