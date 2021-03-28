---
title: 演示教程
sidebar: auto
---

# agel-form | 使 element-ui form 组件更简单

## 特性

该组件的思想就是以一个 form 对象来做所有的操作，纯数据配置也有高度的灵活性，还有更方便的全局配置, 支持 element-ui 所有组件配置，也可以灵活搭配第三方或者自定义的组件进行使用, 也可灵活调整布局进行响应式排版。


## 安装使用

`cnpm install agel-form --save` 或者 [使用在线引用地址](https://www.jsdelivr.com/package/npm/agel-form)


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
        labelWidth: "80px",
        span: 18,
        data: {
          name: "agel-form",
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
        },
      },
    };
  },
  methods: {
    submit() {
      this.form.validate(() => {
        this.$message.success("成功");
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

`Form` 可以设置 `el-row` `el-col` 的所有属性，进行灵活布局，也可设置用 `xs、sm、md、lg、xl`实现响应式布局，作为 `Form` 直接子元素会继承该值; 若 `Form-Item` 单独设置布局属性的优先级更高。

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
        labelWidth: "80px",
        data: {},
        gutter: 5, // 栅格间距
        span: 20, // 全局span
        xs: { span: 24, push: 0 }, // <768px 设置为 24 span
        items: {
          name: {
            label: "姓名",
            span: 10,
            placeholder: "设置 span 10",
          },
          region: {
            label: "地址",
            span: 9,
            push: 1,
            placeholder: "设置 span 9 push 1",
          },
          span: {
            label: "介绍",
            placeholder: "不设置则受全局 form 布局属性影响",
          },
          labelWidth: {
            label: "标签很长很长",
            labelWidth: "135px",
            placeholder: "单独设置 labelWidth 135px",
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

设置`inline:true`为行内表单模式，`el-row`,`el-col` 的布局属性将会失效，一般用于列表的搜索查询。

<ClientOnly><inline-form/></ClientOnly>

::: details 点击查看代码
```html
<template>
  <agel-form class="demo" v-model="form"></agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        inline: true,
        data: {},
        items: {
          name: { label: "活动名称", style: "width:120px" },
          www: { label: "活动网站" },
          button: {
            component: "el-button",
            type: "primary",
            icon: "el-icon-search",
            slots: "查询",
            on: {
              click: () => {
                this.$message.info("查询");
              },
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

## slot slots 插槽自定义

:::tip
`slot` 属性是自定义 `Form Item` 组件的插槽, 支持四种类型写法，template模板，render函数，string字符串，vnode对象。

`slots` 属性是自定义 `Component` 组件的插槽，支持三种类型写法，render函数，string字符串，vnode对象，当存在多个插槽，必须定义一个具名对象。
:::

<ClientOnly><slot-form/></ClientOnly>

::: details 点击查看代码
```html
<template>
  <agel-form class="demo" v-model="form">
    <template slot="template">
      <span>这是一段 template 模板类型自定义插槽</span>
    </template>
  </agel-form>
</template>
 
<script>
export default {
  data() {
    const h = this.$createElement;
    return {
      form: {
        labelWidth: "50px",
        span: 18,
        data: {},
        items: {
          title: {
            labelWidth: "0px",
            component: "el-divider",
            contentPosition: "left",
            slots: "slot 使用演示，自定义Form Item的插槽",
          },
          template: { label: "插槽1", slot: true },
          render: {
            label: "插槽2",
            slot: (h) => {
              return h("span", {}, "这是一段 render 函数类型自定义插槽");
            },
          },
          string: {
            label: "插槽3",
            slot: "这是一段 string 类型自定义插槽",
          },
          vnode: {
            label: "插槽4",
            slot: h("span", {}, "这是一段 vnode 对象类型自定义插槽"),
          },
          title2: {
            labelWidth: "0px",
            component: "el-divider",
            contentPosition: "left",
            slots: "slots 使用演示 ，自定义组件的子插槽",
          },
          slots: {
            component: "el-input",
            label: "事件",
            slots: {
              // slot name 名称和 key 保持一致
              prepend: "Http://",
              append: h("el-tag", { attrs: { type: "success" } }, ".com"),
            },
          },
          button: {
            label: "按钮",
            component: "el-button",
            type: "primary",
            icon: "el-icon-search",
            slots: "查询",
          },
        },
      },
    };
  },
};
</script>
```
:::

## attach 属性的使用

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
支持所有属性，以下配置将被继承到每个表单上，也可单独为某个表单子组件设置全局配置
:::

可以很方便的为每一个 `el-date-pciker` 设置好日期格式化，也可以配置好公用的 `el-upload` 组件，至于其它的需求就发挥你的大脑去灵活配置了。

```js
import agelForm from "agel-form";

const config = {
 form: {
    labelWidth:"100px",
    span:8,
    xs:24,
  },
  // 为 component 设置全局配置，必须是一个函数，参数： prop/item对象/form对象
  "el-upload": function (prop, item, form) {
    // 为 upload 设置全局上传参数
    item.action = "/xxxx/upload";
    item.headers = { token: store.getters.token };
    item.data ={id: prop};
    item.onSuccess = (res)=>{
      if (res.code == 0) {
        return res.data;
      } else {
        Message.error("上传报错");
      }
    }
  },
  "el-date-picker": function (prop, item) {
    // 为 date-picker 设置全局 valueFormat 格式化属性
    if (item.type == undefined || item.type == "daterange") item.valueFormat = "yyyy-MM-dd";
    if (item.type == "datetime" || item.type == "datetimerange") item.valueFormat = "yyyy-MM-dd HH:mm:ss";
    if (item.type == "month")  item.valueFormat = "yyyy-MM";

    // 提供一个小 tips
    // 当使用日期范围模式时，经常需要在调用接口的时候手动将数组date转换为开始/结束日期两个字段
    // 使用如下配置，当变化时将自动关联上开始日期，结束日期两个字段
    // proprange:['startTime','endTime']
    if (item.type == "daterange" && item.proprange) {
      let [startTimeProp, endTimeProp] = item.proprange;
      form.data[startTimeProp] = "";
      form.data[endTimeProp] = "";
      item.on = item.on || {}
      item.on.change = (value) => {
        form.data[startTimeProp] = value ? value[0] : "";
        form.data[endTimeProp] = value ? value[1] : "";
      }
    }
  }
}

Vue.use(agelForm, config);

// or

Vue.prototype.$agelFormConfig = config;
Vue.component('agel-form', agelForm);
```


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




