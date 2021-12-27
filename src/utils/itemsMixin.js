import {
  getIncludeAttrs,
  getExcludeAttrs,
  getCustomProps,
  guid,
  extend,
  each,
} from "../utils/utils";


const defaultComponent = "el-input";

const agItemProps = {
  // 是否自定义 Label slot
  label: {
    type: String,
    default: "",
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
    type: [Boolean, Function, Object, String],
    default: false,
  },
  // 初始值
  defaultValue: {
    default: undefined,
  },
}

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
const formItemPropKyes = ["prop", "label", "label-width", "required", "rules",];

const agComponents = [
  "agel-radio",
  "agel-checkbox",
  "agel-select",
  "agel-upload",
  "agel-tree-select",
  "agel-text",
  "agel-map-input",
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
    data: {
      type: Object,
      required: true,
    },
    items: {
      type: [Array, Object],
      required: true,
      default: () => new Array()
    },
    itemExtendKeys: {
      type: Array,
      default: () => new Array()
    }
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
        const agItem = this.getAgFormItemAttrs(item);
        agItem.$component = this.getComponentAttrs(item);
        agItem.$formItem = getIncludeAttrs(formItemPropKyes, item);
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
      this.injectDataDefaultValue(item, this.data)
      return item;
    },
    injectDataDefaultValue(item, data) {
      if (
        data.constructor === Object &&
        item.prop.indexOf("_aguid_") === -1 &&
        !data.hasOwnProperty(item.prop)
      ) {
        this.$set(data, item.prop, this.getItemValue(item));
      }
    },
    getAgFormItemAttrs(item) {
      const agItem = getCustomProps(agItemProps, item);
      agItem.display =
        typeof item.display == "function"
          ? item.display(this.data, item)
          : agItem.display;
      agItem.show =
        typeof item.show == "function"
          ? item.show(this.data, item)
          : agItem.show;
      return agItem;
    },
    getComponentAttrs(item) {
      const component = getCustomProps(componentPorps, item);
      if (item.slot) {
        const scopedSlots = this.agElForm ? this.agElForm.$scopedSlots : this.$scopedSlots;
        component.name = item.slot === true ? (scopedSlots[item.prop] || "") : item.slot;
        component.isTag = false;
      } else {
        const agItemPropKyes = Object.keys(agItemProps);
        const ignoreAttrKeys = [].concat('component', agItemPropKyes, formItemPropKyes, this.agItemExtendKeys, this.itemExtendKeys);
        component.name = this.getName(item);
        component.isTag = typeof component.name === 'string';
        component.attrs = Object.assign(getExcludeAttrs(ignoreAttrKeys, item), item.$component || {});
        component.attrs.disabled =
          typeof item.disabled == "function"
            ? item.disabled(this.data)
            : item.disabled;
        component.attrs.placeholder = this.getPlaceholder(item);
      }
      return component
    },
    getItemValue(item) {
      let name = this.getName(item);
      if (item.hasOwnProperty("defaultValue")) return item.defaultValue;
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
    // 暴露出去的功能函数
    getRef(prop) {
      const agFormItemRef = this.$refs[prop];
      if (!agFormItemRef || agFormItemRef.length == 0) return null;
      if (agFormItemRef.length == 1) {
        return agFormItemRef[0].$refs.component;
      } else {
        return agFormItemRef.map((v) => v.$refs.component);
      }
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