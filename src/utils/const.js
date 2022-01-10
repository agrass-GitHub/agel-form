// 支持的 el-form 组件参数
export const formPropKeys = [
  "rules",
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
]

// 支持的 el-form-item 组件参数
export const formItemPropKeys = [
  "prop",
  "label",
  "label-width",
  "required",
  "rules",
  "show-message",
  "error",
  "inline-message"
]

// 支持的 el-row 组件参数
export const rowPropKeys = ["gutter", "type", "justify", "align"]

// 支持的 el-col 组件参数
export const colPropKeys = [
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
]

// 支持的 agel-form-grid 组件参数
export const gridPropKeys = ["responsive", "responsiveMethod"].concat(rowPropKeys, colPropKeys)

// 支持的 el-descriptions 组件参数
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
]

// 支持的 el-descriptions-item 组件参数
export const descriptionsItemPropkeys = [
  "label",
  "span",
  "labelClassName",
  "contentClassName",
  "labelStyle",
  "contentStyle",
]

// 支持的 el-table 组件参数
export const tablePropKeys = [
  "height",
  "max-height",
  "stripe",
  "border",
  "size",
  "fit",
  "show-header",
  "highlight-current-row",
  "empty-text",
  "tooltip-effect",
  "show-summary",
  "sum-text",
  "summary-method",
  "cell-class-name",
  "header-cell-class-name",
]

// 支持的 el-table-column 组件参数
export const tableColumnPropKeys = [
  "prop",
  "width",
  "fixed",
  "min-width",
  "show-overflow-tooltip",
  "align",
  "header-align",
]

// 用于判断 placeholder[输入/选择]  rules.trigger[blur/change] 
export const inputArr = ["el-input", "el-input-number", "el-autocomplete"]
export const selectArr = ["el-cascader", "el-time-select", "el-date-picker", "agel-select", "agel-tree-select", "agel-map-input"]

// 组件默认值支持情况，未涉及到的建议在全局手动配置
export const componentDefaultValue = [
  { value: "", keys: ["el-input", "el-autocomplete", "agel-select", "agel-tree-select", "el-date-picker", "el-time-select", "agel-radio"], },
  { value: false, keys: ["el-switch", "agel-checkbox"] },
  { value: 0, keys: ["el-slider", "el-rate"] },
  { value: () => [], keys: ["el-cascader", "el-transfer", "agel-upload", "agel-dynamic-tags", "agel-map-input"] },
]

// 内置的核心单组件 可省略 ag 前缀的组件
export const agComponentNames = [
  "agel-radio",
  "agel-checkbox",
  "agel-select",
  "agel-tree-select",
  "agel-upload",
  "agel-text",
]

// 作为单组件使用的 layout 组件
export const layoutComponentNames = [
  "agel-form-grid",
  "agel-form-descriptions",
  "agel-form-inline",
  "agel-form-tableditor",
]

// 默认组件名称
export const defaultComponentName = "el-input"

// form.item 对象基础结构
export const agItemProps = {
  // label 名称 / 插槽
  label: {
    type: [String, Object, Function],
    default: "",
  },
  // data 关联字段名
  prop: {
    type: String,
    default: "",
  },
  // 是否渲染
  display: {
    type: [Boolean, Function],
    default: true,
  },
  // 是否显示
  show: {
    type: [Boolean, Function],
    default: true,
  },
  // 是否生成必填验证
  required: {
    type: Boolean,
    default: false,
  },
  // 是否开启 vmoedl，可选 .number .trim 修饰符
  vmodel: {
    type: [Boolean, String],
    default: true,
  },
  // Item 自定义插槽
  slot: {
    type: [Boolean, String, Object, Function],
    default: false,
  },
  // 组件名称/实例/异步组件
  component: {
    type: [String, Object, Function],
    default: defaultComponentName,
  },
  // 组件的动态属性，解决属性名冲突使用
  $component: {
    type: Object,
    default: {},
  },
  // 组件是否禁用
  disabled: {
    type: [Boolean, Function],
    default: false,
  },
  // 组件的子插槽
  slots: {
    type: [String, Object, Function],
    default: () => new Object,
  },
  // 组件的事件
  on: {
    type: Object,
    default: () => new Object,
  },
  // 是否开启视图模式
  viewModel: {
    type: Boolean,
  },
  // 视图模式 对 value 进行格式化 可返回 Vnode
  viewFormat: {
    type: Function
  },
}

export const agItemPropKeys = Object.keys(agItemProps)