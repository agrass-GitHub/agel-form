

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
export const itemPropKyes = ["prop", "label", "label-width", "required", "rules"];

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

// agelForm 组件的扩展参数，以及内置的功能函数
export const agFormProps = function () {

  // 扩展参数
  const attrs = {
    // Object 表单数据
    data: {},
    // Object/Array 表单配置项
    items: {},
    // Object 表单事件
    on: undefined,
    // Boolean 是否开启响应式
    responsive: undefined,
    // Funciton 自定义响应式规则
    responsiveMethod: undefined,
  }

  // 默认布局属性 继承自 FormItem，Row 属性
  const layout = {
    labelWidth: "auto",
    type: "flex",
    gutter: 15,
  }

  // 暴露出去的方法
  const methods = {
    getRef: this.getRef,
    getItem: this.getItem,
    validate: this.validate,
    resetFields: this.resetFields,
    clearValidate: this.clearValidate,
  }

  return Object.assign(attrs, layout, methods)
};

// agelFormItem 组件的扩展参数
export const agItemProps = function () {
  return {
    // String 组件名称
    component: "el-input",
    // Boolean/Functiion 是否渲染
    display: true,
    // Boolean 是否忽略，若为 ture 则不会关联表单
    ignore: false,
    // Boolean 是否为自定义组件
    custom: false,
    // Funciton/Vnode/String 是否自定义 FormItemLabel slot
    label: "",
    // Boolean/Funciton/Vnode/String/Array[Vnode] 是否自定义 FormItem slot
    slot: false,
    // Object/Funciton/Vnode/String 是否自定义 Component slot
    slots: {},
    // Object 组件 event 事件
    on: {},
  };
};

export const agItemPropKyes = Object.keys(agItemProps());