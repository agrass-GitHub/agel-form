(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{532:function(e,t,o){"use strict";o.r(t);var n=o(158),l={data:function(){var e=this.$createElement,t=function(e){return{component:"el-divider",labelWidth:"0px",contentPosition:"left",slots:e}};return{form:{labelWidth:"100px",span:15,data:{},items:[t("label 属性使用演示，自定义 Item Label 的插槽"),{prop:"x1",label:function(){return e("el-button",["自定义label"])},labelWidth:"100px"},t("slot 属性使用演示，自定义 Form Item 的插槽"),{prop:"x2",label:"Function 插槽",slot:function(){return e("el-tag",["这是一段 render 函数类型自定义插槽"])}},{prop:"x3",label:"String 插槽",slot:"这是一段 string 类型自定义插槽"},{prop:"x4",label:"VNode 插槽",slot:this.$createElement("el-tag",{},"这是一段 vnode 对象类型自定义插槽")},Object(n.a)(Object(n.a)(Object(n.a)({prop:"x5"},"prop","name"),"label","Template 插槽"),"slot",!0),t("slots 属性使用演示 ，自定义组件 Component 的插槽"),{prop:"x6",component:"el-input",label:"子插槽",slots:{prepend:"Http://",append:function(){return e("el-tag",[".com"])}}},{prop:"x7",label:"参数子插槽",component:"el-checkbox",options:["带有","参数","插槽"],slots:{option:function(t){var o=t.option,n=t.index;return e("el-tag",[n,"：",o.label])}}},{component:"el-button",label:"文字插槽",type:"primary",icon:"el-icon-search",slots:"查询"}]}}}},r=o(3),a=Object(r.a)(l,(function(){var e=this,t=e._self._c;return t("agel-form",{staticClass:"demo border",scopedSlots:e._u([{key:"name",fn:function(){return[t("el-tag",[e._v("这是一段 template 类型自定义插槽")])]},proxy:!0}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}})}),[],!1,null,null,null);t.default=a.exports}}]);