# 表单组件

下面的组件，是经过二次封装的基础组件，使用方式会稍微有些不同。

为了保持该组件的绝对的灵活性，轻量级，所有并没有为 `Form` 集成额外的比如`富文本编辑器`，`图标选择器`，`地图选择器`等单组件，但你可以根据自己需求定义专属的单组件进行使用。

支持在项目中单独引入中进行开发使用, 完整组件列表和引入方式如下：

```js
import { agelRadio, agelCheckbox, agelSelect, agelUpload, agelTreeSelect } from "agel-form";

Vue.use(agelRadio);
Vue.use(agelCheckbox);
Vue.use(agelSelect);
Vue.use(agelUpload);
Vue.use(agelTreeSelect);
```