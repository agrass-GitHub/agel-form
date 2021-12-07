import agComponents from "../lib/index"

// 支持 el-form 的参数 
export const formPropKeys = [
  "rules",
  "inline",
  "label-position",
  "label-width",
  "label-suffix",
  "hide-required-asterisk",
  "show-message",
  "inline-message",
  "status-icon",
  "validate-on-rule-change",
  "size",
  "disabled",
];

// 支持 el-form-item 的参数 
export const formItemPropKyes = ["prop", "label", "label-width", "required", "rules"];

// 支持 el-Row 的参数 
export const rowPropsKeys = ["gutter", "type", "justify", "align", "tag"];

// 支持 el-Col 的参数 
export const colPorpKeys = [
  "span",
  "offset",
  "push",
  "pull",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "tag",
];

// 支持 el-descriptions-item 的参数 
export const descriptionsPropkeys = [
  "border",
  "column",
  "direction",
  "size",
  "title",
  "extra",
  "colon",
  "labelClassName",
  "contentClassName",
  "labelStyle",
  "contentStyle",
];

// 支持 el-descriptions-item 的参数 
export const descriptionsItemPropkeys = [
  "label",
  "span",
  "labelClassName",
  "contentClassName",
  "labelStyle",
  "contentStyle",
];

// 默认组件名称
export const defaultComponent = "el-input";

// agel-form 组件的扩展参数
export const agFormProps = function () {
  return {
    // Object 表单数据
    data: {},
    // Object/Array 表单配置项
    items: [],
    // Object 表单事件
    on: undefined,
    // Boolean 是否开启响应式
    responsive: undefined,
    // Funciton 自定义响应式规则
    responsiveMethod: undefined,
    // Boolean 是否开启描述组件
    descriptions: undefined,
    // 暴露出去的方法
    getRef: this.getRef,
    getItem: this.getItem,
    validate: this.validate,
    resetFields: this.resetFields,
    clearValidate: this.clearValidate,
  }
};

// agel-form-item 组件的扩展参数
export const agItemProps = function () {
  return {
    // Funciton/Vnode/String 是否自定义 Label slot
    label: "",
    // String 关联表单字段名称
    prop: "",
    // Boolean/Functiion 是否显示隐藏
    show: true,
    // Boolean/Functiion 是否渲染
    display: true,
    // Boolean/Functiion 是否禁用
    disabled: false,
    // Boolean/Funciton/Vnode/String 是否自定义 FormItem slot
    slot: false,
    // Boolean 是否开启双向绑定
    vmodel: true,
    // Boolean 是否必填 自动回填必填 rules
    required: false,
    // String 组件名称
    component: defaultComponent,
    // Object/Funciton/Vnode/String 是否自定义 Component slots
    slots: {},
    // Object Component 组件 event 事件
    on: {},
    // 组件动态参数，当参数名与现有 item 属性产生冲突时，可写在此处
    $component: {},

  };
};

export const agItemPropKyes = Object.keys(agItemProps());

export const agComponentsKeys = Object.keys(agComponents);
