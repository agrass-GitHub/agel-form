import {
  getIncludeAttrs,
  getExcludeAttrs,
  getCustomProps,
  getArrItems,
  kebabcase,
  findRef,
} from "../utils/utils"

import { formItemPropKeys, inputArr, selectArr, componentDefaultValue, defaultComponentName, agComponentNames, layoutComponentNames } from "./const"

// agItem 组件对象结构
const agItemProps = {
  label: {
    type: [String, Object, Function],
    default: "",
  },
  prop: {
    type: String,
    default: "",
  },
  show: {
    type: Boolean,
    default: true,
  },
  display: {
    type: Boolean,
    default: true,
  },
  slot: {
    type: [Boolean, String, Object, Function],
    default: false,
  },
}

// 渲染组件对象结构
const componentProps = {
  name: {
    type: [String, Object, Function],
    type: "",
  },
  vmodel: {
    type: [Boolean, String],
    default: true,
  },
  attrs: {
    type: Object,
    default: () => new Object,
  },
  slots: {
    type: Object,
    default: () => new Object,
  },
  on: {
    type: Object,
    default: () => new Object,
  },
  isTag: {
    type: Boolean,
    default: false,
  },
  defaultValue: {
    default: undefined,
  }
}

const componentPropKeys = Object.keys(componentProps)
const agItemPropKeys = Object.keys(agItemProps)

export default {
  inject: {
    elForm: {
      default: null
    },
    wrapForm: {
      default: null
    }
  },
  props: {
    items: {
      type: [Array, Object],
      default: () => new Array()
    },
    itemExtendKeys: {
      type: Array,
      default: () => new Array()
    },
    // 关联 elForm.model 的 prop 名称，用于表单验证
    modelProp: String,
  },
  data() {
    return {
      agItemExtendKeys: [],
    }
  },
  computed: {
    agItems() {
      return getArrItems(this.items).map(item => {
        const agItem = this.getAgItemAttrs(item)
        agItem.$formItem = this.getFormItemAttrs(item)
        agItem.$component = this.getComponentAttrs(item)
        return this.agItemExtendHandle(agItem, item)
      }).filter((v) => v.display)
    },
  },
  methods: {
    agItemExtendHandle(agItrm) {
      return agItrm
    },
    getAgItemAttrs(item) {
      const agItem = getCustomProps(agItemProps, item)
      agItem.display =
        typeof item.display == "function"
          ? item.display(this.elForm.model)
          : agItem.display
      agItem.show =
        typeof item.show == "function"
          ? item.show(this.elForm.model)
          : agItem.show
      return agItem
    },
    getFormItemAttrs(item) {
      const formItem = getIncludeAttrs(formItemPropKeys, item)
      formItem.prop = this.modelProp ? `${this.modelProp}.${item.prop}` : item.prop
      const rules = [].concat(formItem.rules || [], (this.elForm.rules || {})[formItem.prop] || [])
      const label = typeof item.label == "string" ? item.label : ""
      if (formItem.required && rules.length === 0) {
        formItem.required = undefined
        formItem.rules = [
          {
            required: true,
            message: label + "必填",
            trigger: inputArr.includes(this.getName(item)) ? "blur" : "change",
          },
        ]
      }
      return formItem
    },
    getComponentAttrs(item) {
      const component = getCustomProps(componentProps, item)
      if (item.slot) {
        const scopedSlots = this.wrapForm ? this.wrapForm.$scopedSlots : this.$scopedSlots
        component.name = item.slot === true ? (scopedSlots[item.prop] || "") : item.slot
        component.isTag = false
      } else {
        const agConfig = this.$agelFormConfig || {}
        const componentConfigFun = agConfig[item.component] || agConfig[this.getName(item)]
        const componentConfig = typeof componentConfigFun == 'function' ? componentConfigFun(item) : {}
        const { defaultValue, ...componentGlobalAttrs } = componentConfig
        const invalidKeys = ['component', '$component'].concat(
          formItemPropKeys,
          componentPropKeys,
          agItemPropKeys,
          this.agItemExtendKeys,
          this.itemExtendKeys
        )
        component.name = this.getName(item, false)
        component.isTag = typeof component.name === 'string'
        component.defaultValue = componentConfig.hasOwnProperty('defaultValue') ? defaultValue : this.getDefaultValue(item)
        component.attrs = Object.assign(
          { ...componentGlobalAttrs },
          getExcludeAttrs(invalidKeys, item),
          item.$component || {}
        )
        component.attrs.disabled =
          typeof item.disabled == "function"
            ? item.disabled(this.elForm.model)
            : item.disabled
        component.attrs.placeholder = this.getPlaceholder(item)

        // 当布局组件作为单组件使用时
        if (layoutComponentNames.includes(component.name)) {
          component.attrs.modelProp = item.prop
        }
      }
      return component
    },
    getPlaceholder(item) {
      if (item.placeholder) return item.placeholder
      let name = this.getName(item)
      let label = typeof item.label == "string" ? item.label : ""
      if (inputArr.includes(name)) {
        return "请输入" + label
      }
      if (selectArr.includes(name)) {
        return "请选择" + label
      }
    },
    getName(item, deep = true) {
      let value = item.component || defaultComponentName
      if (deep && typeof value === 'object' && typeof value.render === 'function' && value.name) {
        value = value.name
      }
      if (typeof value === 'string') {
        value = kebabcase(value)
        if (agComponentNames.includes("ag" + value)) value = "ag" + value
      }
      return value
    },
    getRequiredAsteriskClass(agItem) {
      if (this.elForm.hideRequiredAsterisk) return ""
      const formItem = agItem.$formItem
      const rules = [].concat(formItem.rules || [], (this.elForm.rules || {})[formItem.prop] || [])
      return formItem.required || rules.some((v) => v.required) ? "agel-required-label" : ""
    },
    getDefaultValue(item) {
      const name = this.getName(item)
      let value = undefined
      componentDefaultValue.every(v => {
        if (v.keys.includes(name)) {
          value = typeof value === 'object' ? JSON.parse(JSON.stringify(value)) : v.value
        }
        return value === undefined
      })
      if (name == "agel-checkbox" && item.options) value = ""
      return value
    },
    // 暴露出去的功能函数
    getRef(prop) {
      return findRef(this, prop)
    },
    getItem(prop, deep) {
      if (deep) return this.agItems.find((v) => v.prop == prop)
      if (Array.isArray(this.items)) {
        return this.items.find((v) => v.prop == prop)
      } else {
        return this.items[prop]
      }
    },
  },
}