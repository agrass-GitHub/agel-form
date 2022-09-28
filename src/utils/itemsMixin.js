import {
  getIncludeAttrs,
  getExcludeAttrs,
  getCustomProps,
  getArrItems,
  kebabcase,
  findRef,
  guid,
} from "../utils/utils"

import { agItemProps, agItemPropKeys, formItemPropKeys, inputArr, selectArr, componentDefaultValue, defaultComponentName, agComponentNames, layoutComponentNames } from "./const"

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
    // 关联 elForm.model 的 prop 
    modelProp: String,
  },
  data() {
    return {
      layoutItemKeys: [],
    }
  },
  computed: {
    agItems() {
      return getArrItems(this.items)
        .map((item) => Object.assign(getCustomProps(agItemProps), item))
        .filter((v) => v.display)
    },
    isDynamic() {
      return Array.isArray(this.elForm.model[this.modelProp])
    },
    dynamicData() {
      const data = this.isDynamic ? this.elForm.model[this.modelProp] : [this.elForm.model]
      return data.map(row => {
        if (this.isDynamic && row._key_ == undefined) row._key_ = guid()
        return row
      })
    },
  },
  watch: {
    "elForm.model"(newv, oldv) {
      if (newv !== oldv) {
        this.$nextTick(this.elForm.clearValidate)
      }
    }
  },
  methods: {
    getFormItemAttrs(scope) {
      const { item, rowIndex } = scope
      const formItem = getIncludeAttrs(formItemPropKeys, item)
      const prop = this.getFormItemProp(item, rowIndex)
      const rules = [].concat(formItem.rules || [], (this.elForm.rules || {})[prop] || [])
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
      formItem.prop = prop
      formItem.defaultValue = this.getDefaultValue(item)
      formItem.vmodel = item.vmodel
      return formItem
    },
    getComponentAttrs(scope) {
      const { item, row } = scope
      const component = { name: "", isTag: false, attrs: {}, slots: item.slots, on: item.on, }
      // 视图查看模式
      if (item.viewModel || (row._view_ && item.viewModel !== false)) {
        component.name = ({ value = "" }) => item.viewFormat ? item.viewFormat({ value, ...scope }) : String(value)
        return component
      }
      // 插槽模式
      if (item.slot) {
        const scopedSlots = this.wrapForm ? this.wrapForm.$scopedSlots : this.$scopedSlots
        component.name = item.slot === true ? (scopedSlots[item.prop] || "") : item.slot
        component.attrs = typeof component.name === "function" ? scope : {}
        return component
      }
      // 组件模式
      const invalidKeys = [].concat(
        agItemPropKeys,
        formItemPropKeys,
        this.layoutItemKeys,
        this.itemExtendKeys
      )
      const config = this.getComponentConfig(item)
      const attrs = getExcludeAttrs(invalidKeys, item)
      const $attrs = item.$component || {}
      component.name = this.getName(item, false)
      component.isTag = typeof component.name === 'string'
      component.attrs = Object.assign({}, config, attrs, $attrs)
      component.attrs.placeholder = item.placeholder || config.placeholder || this.getPlaceholder(item)
      component.attrs.disabled = (typeof item.disabled == 'function' ? item.disabled(scope.row) : item.disabled) || config.disabled
      // 当布局组件作为单组件使用时
      if (layoutComponentNames.includes(component.name)) {
        component.attrs.modelProp = item.prop
      }
      return component
    },
    getLayoutItemAttrs(item) {
      return getIncludeAttrs(this.layoutItemKeys, item)
    },
    getVif(scope) {
      const { item, row } = scope
      return typeof item.display == "function" ? item.display(row || {}) : item.display
    },
    getVshow(scope) {
      const { item, row } = scope
      return typeof item.show == "function" ? item.show(row || {}) : item.display
    },
    getFormItemProp(item, rowIndex) {
      return [this.modelProp, this.isDynamic ? String(rowIndex) : '']
        .concat(item.prop.split("."))
        .filter((v) => v)
        .join(".")
    },
    getPlaceholder(item) {
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
    getRequiredAsteriskClass(item, rowIndex) {
      if (this.elForm.hideRequiredAsterisk) return ""
      const prop = this.getFormItemProp(item, rowIndex)
      const rules = [].concat(item.rules || [], (this.elForm.rules || {})[prop] || [])
      return item.required || rules.some((v) => v.required) ? "agel-required-label" : ""
    },
    getDefaultValue(item) {
      const config = this.getComponentConfig(item)
      if (config.hasOwnProperty('defaultValue')) return config.defaultValue
      const name = this.getName(item)
      let value = undefined
      componentDefaultValue.every(v => {
        if (v.keys.includes(name)) {
          value = typeof v.value === 'function' ? v.value() : v.value
        }
        return value === undefined
      })
      if (name == "agel-checkbox" && item.options) value = ""
      return value
    },
    getComponentConfig(item) {
      const agConfig = this.$agelFormConfig || {}
      const componentConfigFun = agConfig[item.component] || agConfig[this.getName(item)]
      return typeof componentConfigFun == 'function' ? componentConfigFun(item) : {}
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