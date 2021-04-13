---
title: 演示教程
sidebar: auto
---

# agel-form | 使 element-ui form 组件更简单

## 特性

该组件的思想就是以一个 form 对象来做所有的操作，纯数据配置也有高度的灵活性，还有更方便的全局配置, 支持 element-ui 所有组件配置, 支持所有 evets 事件，也支持所有 slots，也可以灵活搭配第三方或者自定义的组件进行使用, 也可灵活调整布局进行响应式排版。


## 安装使用

`npm install agel-form --save` 或者 [使用在线引用地址](https://www.jsdelivr.com/package/npm/agel-form)


## 典型表单 

默认 component 属性是 `el-input` ,会根据组件类型自动生成 `placeholder`, 设置 `required:true` 会自动生成必填 rules。

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
          file: [{ name: "活动清单.xlsx", url: "xxx.jpg" }],
        },
        items: {
          name: {
            label: "活动名称",
            required: true, // 设置 required 会自动生成必填 rules
          },
          region: {
            label: "活动区域",
            component: "el-select",
            options: [
              { label: "区域1", value: "区域1" },
              { label: "区域2", value: "区域2" },
            ],
          },
          date: {
            component: "el-date-picker",
            label: "活动时间",
            type: "date",
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

设置`ignore:true`，则表明该组件是一个纯展示组件，prop 值则不会注入到 form.data。

设置`on`，支持该组件的所有 events 事件。

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
            // 表明该组件是一个纯展示组件，prop 值则不会注入到 form.data
            ignore: true,
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

`slot` 属性是自定义 `Form Item` 组件的插槽, 支持四种类型写法，template模板，string字符串，render函数，vnode对象。

`label` 属性是自定义 `Form Item` 组件的 `label` 插槽, 支持三种类型写法，string字符串，render函数，vnode对象。

`slots` 属性是自定义 `Component` 组件的插槽，支持三种类型写法，string字符串，render函数，vnode对象，当存在多个插槽，必须定义一个具名对象。

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
        span: 15,
        data: {},
        items: {
          title1: {
            labelWidth: "0px",
            component: "el-divider",
            contentPosition: "left",
            slots: "label slot 使用演示，自定义Form Item Label的插槽",
          },
          label: {
            labelWidth: "100px",
            label: (h) => {
              return h("el-button", {}, "自定义label");
            },
          },
          title2: {
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
          title3: {
            labelWidth: "0px",
            component: "el-divider",
            contentPosition: "left",
            slots: "slots 使用演示 ，自定义组件 Component 的插槽",
            ignore: true,
          },
          slots: {
            component: "el-input",
            label: "网站",
            slots: {
              // 多个插槽时， slot name 名称和 key 保持一致
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
    <div><code>{{jsonstr}}</code></div>
    <p>
      <span>行内表单：</span>
      <el-switch v-model="inline"></el-switch>
      <span style="margin-left:20px" v-show="!inline">栅格span：</span>
      <el-input-number v-show="!inline" v-model="span" :min="6" :max="24"></el-input-number>
    </p>
    <agel-form v-model="form" :attach="{data,items,inline,span}"> </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        labelWidth: "auto",
      },
      data: {},
      inline: false,
      span: 13,
    };
  },
  computed: {
    items() {
      return {
        name: { label: "活动名称" },
        region: { label: "活动区域" },
        button: {
          label: "按钮",
          component: "el-button",
          type: "primary",
          icon: "el-icon-search",
          slots: "查询",
          display: this.inline,
        },
      };
    },
    jsonstr() {
      return JSON.stringify(this.form);
    },
  },
};
</script>
```
:::

## config 全局配置的使用

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
      // 需要 return 一个包含 name，url 的对象 {name:"xx.jpg",url:'http://xxx.jpg}
      return res.data;
    }
  },
  "el-date-picker": function (prop, item, form) {
    // 为 date-picker 设置全局 valueFormat 格式化属性
    if (item.type == undefined || item.type == "daterange") item.valueFormat = "yyyy-MM-dd";
    if (item.type == "datetime" || item.type == "datetimerange") item.valueFormat = "yyyy-MM-dd HH:mm:ss";
    if (item.type == "month")  item.valueFormat = "yyyy-MM";

    // 提供一个小 tip
    // 当使用日期范围模式时，经常需要在调用接口的时候手动将数组date转换为开始/结束日期两个字段
    // 使用如下配置，当变化时将自动关联上开始日期，结束日期两个字段
    // proprange:['startTime','endTime']
    if ((item.type == "daterange" || item.type == "datetimerange") && item.proprange) {
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

## component 单组件

下面的组件，是经过二次封装的基础组件，使用方式会稍微有些不同。

为了保持该组件的绝对的灵活性，轻量级，所有并没有为 `Form` 集成额外的比如`富文本编辑器`，`图标选择器`，`地图选择器`等单组件，但你可以根据自己需求定义专属的单组件进行使用，也可搭配 `el-dialog`,`el-drawer`等。

### select 选择器

开启 `filter` 可实现更好看关键字过滤，作用同 `filterable` 一致

<ClientOnly><select-form/></ClientOnly>

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
        span: 12,
        data: {},
        items: {
          region: {
            label: "分组过滤",
            component: "el-select",
            filter: true,
            clearable: true,
            props: { label: "name", value: "id", options: "children" },
            options: [
              {
                name: "热门城市",
                children: [
                  {
                    id: "Shanghai",
                    name: "上海",
                  },
                  {
                    id: "Beijing",
                    name: "北京",
                    disabled: true,
                  },
                ],
              },
              {
                name: "城市名",
                children: [
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
          },
          empty: {
            label: "插槽",
            component: "el-select",
            options: [],
            slots: {
              // default: () => {
              //   return <el-option value="1" label="插槽"></el-option>;
              // },
              prefix: () => {
                return <i class="el-icon-search"></i>;
              },
              empty: () => {
                return <div style="padding:10px">没有更多数据了</div>;
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

### checkboxGroup radioGroup 多单/选

开启 `button` 可实现按钮样式风格

<ClientOnly><checkboxgroup-radiogroup-form/></ClientOnly>

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
        span: 24,
        data: {},
        items: {
          radio: {
            label: "性别",
            component: "el-radio-group",
            options: [
              { label: "男", value: "男" },
              { label: "女", value: "女" },
              { label: "中性", value: "中性" },
            ],
          },
          checkbox: {
            label: "取向",
            component: "el-checkbox-group",
            options: [
              { label: "男", value: "男" },
              { label: "女", value: "女" },
              { label: "中性", value: "中性" },
            ],
          },
          radiobutton: {
            label: "button 样式",
            component: "el-radio-group",
            button: true,
            options: [
              { label: "男", value: "男" },
              { label: "女", value: "女" },
              { label: "中性", value: "中性" },
            ],
          },
        },
      },
    };
  },
};
</script>
```
:::

### upload 上传

:::tip
- 使用预览附件功能, 必须保证 `this.$msgbox` 挂载了 `el-messagebox` 实例
- 使用钩子函数提示功能, 必须保证 `this.$message` 挂载了 `el-message` 实例, 在文件上传失败/文件个数/大小超出限制会触发默认提示语
- 唯一不同的是，在 `onSuccess` 钩子函数中需返回一个包含 name，url 的特定对象, 如： ``` {name:"xx.jpg",url:'http://xxx.jpg}```
:::

<ClientOnly><upload-form/></ClientOnly>

::: details 点击查看代码
```html
<template>
  <agel-form v-model="form" class="demo"></agel-form>
</template>
 
<script>
export default {
  name: "upload-form",
  data() {
    return {
      form: {
        labelWidth: "100px",
        span: 18,
        data: {
          files1: [
            {
              name: "这是一个图片文件.png",
              url: "https://cn.vuejs.org/images/components.png",
            },
            {
              name: "这是一个视频文件.mp4",
              url: "https://www.runoob.com/try/demo_source/movie.mp4",
            },
            {
              name: "这是一个音频文件.mp3",
              url: "https://www.runoob.com/try/demo_source/horse.mp3",
            },
            {
              name: "这是一个docx文件.docx",
              url: "https://view.xdocin.com/doc/preview.docx",
            },
            {
              name: "这是一个不可预览文件.zip",
              url: "/xxx.zip",
            },
          ],
          files2: [
            {
              name: "这是一个图片文件.png",
              url: "https://cn.vuejs.org/images/components.png",
            },
          ],
          files3: [
            {
              name: "这是一个图片文件.png",
              url: "https://cn.vuejs.org/images/components.png",
            },
          ],
        },
        items: {
          files1: {
            label: "默认样式",
            component: "el-upload",
            action: "/xxx/upload",
            tip: "点击 file list 查看预览样式,且最大只能上传 10kb 大小",
            limitSize: 10,
            onSuccess: (res) => {
              // 需要 return 一个包含 name，url 的对象 {name:"xx.jpg",url:'http://xxx.jpg}
              return res.data;
            },
          },
          files2: {
            label: "picture-card 样式",
            component: "el-upload",
            action: "/xxx/upload",
            listType: "picture-card",
          },
          files3: {
            label: "picture 样式",
            component: "el-upload",
            action: "/xxx/upload",
            listType: "picture",
          },
          files4: {
            label: "拖拽样式",
            component: "el-upload",
            action: "/xxx/upload",
            drag: true,
          },
          files5: {
            label: "主动上传",
            component: "el-upload",
            action: "/xxx/upload",
            autoUpload: false,
          },
          files6: {
            label: "插槽样式",
            component: "el-upload",
            action: "/xxx/upload",
            slots: {
              trigger: () => {
                return <el-button>自定义选取文件</el-button>;
              },
              default: () => {
                return (
                  <el-button style="margin-left:10px">
                    自定义上传到服务器
                  </el-button>
                );
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

### input-tree 树形选择器

:::tip
`nodeKey` 必填，支持 `el-tree` 组件所有属性  
:::

- 可通过 `getRef` 方法获取 `tree` 组件实例，也可获取其他 `component` 组件实例
- 可通过 `getItem` 方法获取 itme 对象，在 `items` 是数组配置的情况下比较有用

<ClientOnly><tree-form/></ClientOnly>

::: details 点击查看代码
```html
<template>
  <div class="demo">
    <agel-form v-model="form"> </agel-form>
    <el-button type="primary" @click="getRef">获取组件实例（查看控制台）</el-button>
    <el-button type="primary" @click="getItem">获取组件Item（查看控制台）</el-button>
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
        items: [
          {
            prop: "tree1",
            label: "普通树形",
            component: "el-input-tree",
            nodeKey: "value",
            data: treeData,
          },
          {
            prop: "tree2",
            label: "多选树形",
            component: "el-input-tree",
            nodeKey: "value",
            showCheckbox: true,
            leafOnly: true,
            data: treeData,
          },
          {
            prop: "tree3",
            label: "过滤树形",
            component: "el-input-tree",
            nodeKey: "value",
            filter: true,
            data: treeData,
          },
          {
            prop: "tree4",
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
        ],
      },
    };
  },
  methods: {
    getRef() {
      console.log(this.form.getRef("tree1"));
    },
    getItem() {
      console.log(this.form.getItem("tree1"));
    },
  },
};
</script>
```
::: 









