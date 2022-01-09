import {
  getIncludeAttrs,
  getExcludeAttrs,
  getCustomProps,
  getArrItems,
  kebabcase,
  findRef,
  guid,
} from "../utils/utils"

import { agItemProps, formItemPropKeys, inputArr, selectArr, componentDefaultValue, defaultComponentName, agComponentNames, layoutComponentNames } from "./const"
import renderComponent from "../form/render-component"

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
  components: {
    renderComponent,
  },
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
      return getArrItems(this.items).map(this.getAgItemAttrs).filter((v) => v.display)
    },
    isDynamic() {
      return Array.isArray(this.elForm.model[this.modelProp])
    },
    dynamicData() {
      const data = this.isDynamic ? this.elForm.model[this.modelProp] : [this.elForm.model]
      return data.map(row => {
        if (this.isDynamic && row._key_ == undefined) row._key_ = guid()
        return row;
      })
    },
  },
  methods: {
    getAgItemAttrs(item) {
      const agItem = Object.assign(getCustomProps(agItemProps), item)
      agItem.display =
        typeof item.display == "function"
          ? item.display(this.elForm.model)
          : agItem.display
      agItem.show =
        typeof item.show == "function"
          ? item.show(this.elForm.model)
          : agItem.show
      agItem.disabled =
        typeof item.disabled == "function"
          ? item.disabled(this.elForm.model)
          : item.disabled
      agItem.placeholder = this.getPlaceholder(item);
      return agItem
    },
    getFormItemAttrs(scope) {
      const { item, rowIndex } = scope;
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
      return formItem
    },
    getComponentAttrs(scope) {
      const { item, row } = scope;
      const component = getCustomProps(componentProps, item)
      if (item._edit_ === false || (row._edit_ === false && !item._edit_)) {
        component.name = ({ value = "" }) => item.formatter ? item.formatter(value) : String(value)
        component.isTag = false
        return component
      }
      if (item.slot) {
        const scopedSlots = this.wrapForm ? this.wrapForm.$scopedSlots : this.$scopedSlots
        component.name = item.slot === true ? (scopedSlots[item.prop] || "") : item.slot
        component.isTag = false
        component.attrs = typeof component.name === "function" ? scope : {}
        return component
      }
      const agConfig = this.$agelFormConfig || {}
      const componentConfigFun = agConfig[item.component] || agConfig[this.getName(item)]
      const componentConfig = typeof componentConfigFun == 'function' ? componentConfigFun(item) : {}
      const { defaultValue, ...componentGlobalAttrs } = componentConfig
      const invalidKeys = ['component', '$component'].concat(
        agItemPropKeys,
        formItemPropKeys,
        componentPropKeys,
        this.layoutItemKeys,
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
      // 当布局组件作为单组件使用时
      if (layoutComponentNames.includes(component.name)) {
        component.attrs.modelProp = item.prop
      }
      return component
    },
    getLayoutItemAttrs(item) {
      return getIncludeAttrs(this.layoutItemKeys, item)
    },
    getFormItemProp(item, rowIndex) {
      return [this.modelProp, this.isDynamic ? String(rowIndex) : '']
        .concat(item.prop.split("."))
        .filter((v) => v)
        .join(".")
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
    getRequiredAsteriskClass(item, rowIndex) {
      if (this.elForm.hideRequiredAsterisk) return ""
      const prop = this.getFormItemProp(item, rowIndex)
      const rules = [].concat(item.rules || [], (this.elForm.rules || {})[prop] || [])
      return item.required || rules.some((v) => v.required) ? "agel-required-label" : ""
    },
    getDefaultValue(item) {
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