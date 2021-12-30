import {
  getIncludeAttrs,
  getExcludeAttrs,
  getCustomProps,
  guid,
  extend,
  each,
} from "../utils/utils";

import { formItemPropKyes } from "./props";

const agItemProps = {
  // 是否自定义 Label slot
  label: {
    type: [String, Object, Function],
  },
  // 关联表单字段名称
  prop: {
    type: String,
    default: "",
  },
  // 是否显示隐藏
  show: {
    type: Boolean,
    default: true,
  },
  // 是否渲染
  display: {
    type: Boolean,
    default: true,
  },
  // 插槽
  slot: {
    type: [Boolean, String, Object, Function],
    default: false,
  },
}

// 渲染组件对象结构
const componentPorps = {
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
  }
}

export const defaultComponent = "el-input";

// 可省略 ag 前缀的组件
export const agComponents = [
  "agel-radio",
  "agel-checkbox",
  "agel-select",
  "agel-upload",
  "agel-tree-select",
  "agel-text",
  "agel-map-input",
]

// 作为单组件使用的 layout 组件
const layoutComponents = [
  "agel-form-grid",
  "agel-form-descriptions",
  "agel-form-inline",
  "agel-form-tableditor",
]

export default {
  inject: {
    elForm: {
      default: null
    },
    agElForm: {
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
      return each(this.items, "map", (v, i, k) => {
        const item = this.injectItemAttr(v, k);
        const agItem = this.getAgItemAttrs(item);
        agItem.$formItem = this.getFormItemAttrs(item);
        agItem.$component = this.getComponentAttrs(item);
        return this.agItemExtendHandle(agItem, item);
      }).filter((v) => v.display);
    },
  },
  methods: {
    agItemExtendHandle(agItrm) {
      return agItrm
    },
    // items 相关
    injectItemAttr(item, prop) {
      const agelFormConfig = this.$agelFormConfig || {};
      if (!item.prop && prop) item.prop = prop;
      let config = agelFormConfig[this.getName(item)] || agelFormConfig[item.component];
      if (config && config.constructor == Function) {
        config = config(item.prop, item);
      }
      if (config && config.constructor == Object) {
        extend(item, config);
      }
      if (item.prop == undefined) {
        item.prop = "_aguid_" + guid();
      }
      this.injectDataDefaultValue(item, this.value)
      return item;
    },
    injectDataDefaultValue(item, data) {
      if (
        data && data.constructor === Object &&
        item.prop.indexOf("_aguid_") === -1 &&
        !data.hasOwnProperty(item.prop)
      ) {
        this.$set(data, item.prop, this.getItemValue(item));
      }
    },
    getAgItemAttrs(item) {
      const agItem = getCustomProps(agItemProps, item);
      agItem.display =
        typeof item.display == "function"
          ? item.display(this.value, item)
          : agItem.display;
      agItem.show =
        typeof item.show == "function"
          ? item.show(this.value, item)
          : agItem.show;
      return agItem;
    },
    getFormItemAttrs(item) {
      const formItem = getIncludeAttrs(formItemPropKyes, item);
      formItem.prop = this.modelProp
        ? `${this.modelProp}.${item.prop}`
        : item.prop;
      return formItem;
    },
    getComponentAttrs(item) {
      const component = getCustomProps(componentPorps, item);
      if (item.slot) {
        const scopedSlots = this.agElForm ? this.agElForm.$scopedSlots : this.$scopedSlots;
        component.name = item.slot === true ? (scopedSlots[item.prop] || "") : item.slot;
        component.isTag = false;
      } else {
        const ignoreAttrKeys = ['component', '$component'].concat(
          Object.keys(componentPorps),
          Object.keys(agItemProps),
          formItemPropKyes,
          this.agItemExtendKeys,
          this.itemExtendKeys
        );
        component.name = this.getName(item);
        component.isTag = typeof component.name === 'string';
        component.attrs = Object.assign(getExcludeAttrs(ignoreAttrKeys, item), item.$component || {});
        component.attrs.disabled =
          typeof item.disabled == "function"
            ? item.disabled(this.value)
            : item.disabled;
        component.attrs.placeholder = this.getPlaceholder(item);

        // 当布局组件作为单组件使用时，可用
        if (layoutComponents.includes(component.name)) {
          component.attrs.modelProp = item.prop;
        }
      }
      return component
    },
    getItemValue(item) {
      let name = this.getName(item);
      if (
        name == "el-input" ||
        name == "el-autocomplete" ||
        name == "agel-select" ||
        name == "agel-tree-select" ||
        name == "el-date-picker" ||
        name == "el-time-select" ||
        name == "agel-radio" ||
        (name == "agel-checkbox" && item.options)
      ) {
        return "";
      }
      if (name == "el-switch" || (name == "agel-checkbox" && !item.options)) {
        return false;
      }
      if (name == "el-slider" || name == "el-rate") {
        return 0;
      }
      if (
        name == "el-cascader" ||
        name == "el-transfer" ||
        name == "agel-upload"
      ) {
        return [];
      }
      // if (name == "el-input-number") return undefined;
      return undefined;
    },
    getPlaceholder(item) {
      if (item.placeholder) return item.placeholder;
      const inputArr = ["el-input", "el-input-number", "el-autocomplete"];
      const selectArr = [
        "el-cascader",
        "el-time-select",
        "el-date-picker",
        "agel-select",
        "agel-tree-select",
      ];
      let name = this.getName(item);
      let label = typeof item.label == "string" ? item.label : "";
      if (inputArr.includes(name)) {
        return "请输入" + label;
      }
      if (selectArr.includes(name)) {
        return "请选择" + label;
      }
    },
    getName(item) {
      const name = item.component || defaultComponent;
      return typeof name == "string" && agComponents.includes("ag" + name)
        ? "ag" + name
        : name;
    },
    getRequiredAsteriskClass(agItem) {
      if (!this.elForm || this.elForm.hideRequiredAsterisk) return "";
      const formItem = agItem.$formItem;
      const rules = formItem.rules || (this.elForm.rules || {})[formItem.prop] || {};
      const rulesHasRequired = (Array.isArray(rules) ? rules.some((v) => v.required) : rules.required);
      return formItem.required || rulesHasRequired ? "agel-required-label" : "";
    },
    findRef(context, refName) {
      if (context.$refs[refName]) {
        return context.$refs[refName];
      } else {
        let ref = null;
        context.$children.every(vm => {
          ref = this.findRef(vm, refName);
          return ref === null;
        })
        return ref;
      }
    },
    // 暴露出去的功能函数
    getRef(prop) {
      return this.findRef(this, prop);
    },
    getItem(prop, deep) {
      if (deep) return this.agItems.find((v) => v.prop == prop);
      if (Array.isArray(this.items)) {
        return this.items.find((v) => v.prop == prop);
      } else {
        return this.items[prop];
      }
    },
  },
}