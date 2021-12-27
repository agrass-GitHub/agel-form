# 快速开始

## 安装

`npm install agel-form --save # yarn add agel-form` 

## 引用

若是完整引入 `Element-UI`，可直接导入组件进行开发使用；

若是按需引入 `Element-UI`，至少需要全局引入 `Form, FormItem, Row, Col, Input` 五个表单组件。

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import agelForm from 'agel-form';

const formConfig = {};

Vue.use(ElementUI);
Vue.use(agelForm,formConfig);
```

`Vue.use(agelForm)` 默认会注册所有核心组件到全局，无需在单独引入，组件列表如下：

```js
const coreComponents = [agelForm, agelFormItem, agelFormGrid, agelFormInline, agelFormTableditor, agelFormDescriptions,agelRadio,agelCheckbox, agelSelect,agelTreeSelect,agelUpload,agelText]
```


### 引用其他单组件

你也可以根据需求，按需引入其他单组件到项目进行开发使用。

```js
import {
  // 核心组件
  agelForm,
  // 其他组件按需引入
  agelMapInput,
  agelSearchPanel,
  agelFormDialog,
  tableditorMenuColumn,
} from "agel-form";
```

## 全局配置

支持全局属性，配置将被继承到每个表单上，也可单独为某个表单子组件设置全局配置，表单子组件支持函数写法。这是一把双刃剑，要仔细权衡利弊，宁缺毋滥。

<<< @/docs/.vuepress/components/agel-form-config.js