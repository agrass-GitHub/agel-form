# 快速开始

## 安装

`npm install agel-form --save # yarn add agel-form` 

## 引用

若是完整引入 `Element-UI`，可直接导入组件进行开发使用。

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import agelForm from 'agel-form';

const formConfig = {};

Vue.use(ElementUI);
Vue.use(agelForm,formConfig);
```

若是按需引入 `Element-UI`，至少需要全局引入 `Form, FormItem, Row, Col, Input` 五个表单组件 `agelForm` 才可正常使用。

```js
import { Form, FormItem, Row, Col, Input } from 'element-ui';
import agelForm from 'agel-form';
```

### 引用单组件

同时也支持在项目中引入单组件中进行开发使用，完整组件列表和引入方式如下：

```js
import {
  agelForm,
  agelSearchPanel,
  agelRadio, 
  agelCheckbox, 
  agelSelect, 
  agelUpload, 
  agelTreeSelect,
} from "agel-form";
```

## 全局配置

支持所有属性，配置将被继承到每个表单上。

也可单独为某个表单子组件设置全局配置，表单子组件支持函数写法，更加灵活。

<<< @/docs/.vuepress/components/agel-form-config.js