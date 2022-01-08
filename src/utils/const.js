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
export const tablePropsKeys = [
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
export const tableColumnPropsKeys = [
  "prop",
  "width",
  "fixed",
  "min-width",
  "show-overflow-tooltip",
  "align",
  "header-align",
  "formatter",
]

// 用于判断 placeholder[输入/选择]  rules.trigger[blur/change] 
export const inputArr = ["el-input", "el-input-number", "el-autocomplete"]
export const selectArr = ["el-cascader", "el-time-select", "el-date-picker", "agel-select", "agel-tree-select", "agel-map-input"]

// 组件默认值支持情况，未涉及到的建议在全局手动配置
export const componentDefaultValue = [
  { value: "", keys: ["el-input", "el-autocomplete", "agel-select", "agel-tree-select", "el-date-picker", "el-time-select", "agel-radio"], },
  { value: false, keys: ["el-switch", "agel-checkbox"] },
  { value: 0, keys: ["el-slider", "el-rate"] },
  { value: [], keys: ["el-cascader", "el-transfer", "agel-upload", "agel-dynamic-tags", "agel-map-input"] },
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