<template>
  <el-form class="agel-form" ref="form" v-bind="attrs.$form" :inline="value.layout=='inline'" v-on="value.on||{}">

    <!-- 内联 布局 -->
    <inline-layout v-if="value.layout=='inline'" :data="value.data" :items="items" ref="layout">
      <slot v-for="name in ['prepend','append']" :slot="name" :name="name" />
    </inline-layout>

    <!-- 栅格 布局 -->
    <grid-layout v-else-if="value.layout=='grid'" v-bind="attrs.$row" :data="value.data" :items="items" ref="layout">
      <slot v-for="name in ['prepend','append']" :slot="name" :name="name" />
    </grid-layout>

    <!-- descriptions 布局 -->
    <descriptions-layout v-else-if="value.layout=='descriptions'" v-bind="attrs.$descriptions" :data="value.data" :items="items" :getRequiredAsteriskClass="getRequiredAsteriskClass" ref="layout">
      <slot v-for="name in ['prepend','append','title','extra']" :slot="name" :name="name" />
    </descriptions-layout>

    <!-- tableditor 布局 -->
    <tableditor-layout v-else-if="value.layout=='tableditor'" v-bind="attrs.$table" v-on="value.on||{}" :data="value.data" :items="items" :getRequiredAsteriskClass="getRequiredAsteriskClass" ref="layout">
      <slot v-for="name in ['prepend','append']" :slot="name" :name="name" />
    </tableditor-layout>

  </el-form>
</template>

<script>
import {
  addResizeListener,
  removeResizeListener,
} from "element-ui/src/utils/resize-event";

import {
  getIncludeAttrs,
  getExcludeAttrs,
  getProp,
  guid,
  each,
  extend,
} from "./utils/utils";

import {
  defaultComponent,
  agFormProps,
  agItemProps,
  agItemPropKyes,
  formPropKeys,
  formItemPropKyes,
  rowPropsKeys,
  colPorpKeys,
  descriptionsPropkeys,
  descriptionsItemPropkeys,
  tablePropsKeys,
  tableColumnPropsKeys,
} from "./utils/props";

import gridLayout from "./layout/agel-form-grid.vue";
import inlineLayout from "./layout/agel-form-inline.vue";
import tableditorLayout from "./layout/agel-form-tableditor.vue";

const inputArr = ["el-input", "el-input-number", "el-autocomplete"];
const selectArr = [
  "el-cascader",
  "el-time-select",
  "el-date-picker",
  "agel-select",
  "agel-tree-select",
];

const agComponents = {
  "agel-radio": () => import("./lib/agel-radio"),
  "agel-checkbox": () => import("./lib/agel-checkbox"),
  "agel-select": () => import("./lib/agel-select"),
  "agel-upload": () => import("./lib/agel-upload"),
  "agel-tree-select": () => import("./lib/agel-tree-select"),
  "agel-map-input": () => import("./lib/agel-map-input"),
  "agel-text": () => import("./lib/agel-text"),
};

export default {
  name: "agel-form",
  inheritAttrs: false,
  components: {
    inlineLayout: inlineLayout,
    gridLayout: gridLayout,
    tableditorLayout,
    descriptionsLayout: () => import("./layout/agel-form-descriptions"),
  },
  props: {
    value: {
      required: true,
      type: Object,
      default: () => new Object(),
    },
    attach: {
      type: Object,
      default: () => new Object(),
    },
    "item-extend-keys": {
      type: Array,
      default: () => new Array(),
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: function (newv, oldv) {
        if (newv === oldv) return;
        const agelFormConfig = this.$agelFormConfig || {};
        extend(this.value, agelFormConfig.form || {});
        extend(this.value, agFormProps.call(this));
        // patch 此处兼容 v.0.3.3 之前版本
        if (this.value.inline) this.value.layout = "inline";
        if (this.value.descriptions) this.value.layout = "descriptions";
      },
    },
    attach: {
      deep: true,
      immediate: true,
      handler: function () {
        extend(this.value, this.attach, true);
      },
    },
  },
  mounted() {
    if (this.value.responsive && value.layout == "grid") {
      this.resize();
      addResizeListener(this.$refs.form.$el, this.resize);
    }
  },
  beforeDestroy() {
    removeResizeListener(this.$refs.form.$el, this.resize);
  },
  computed: {
    attrs() {
      const $form = getIncludeAttrs(formPropKeys, this.value);
      $form.model = this.value.data;
      if (this.value.layout == "inline") return { $form };
      if (this.value.layout == "grid") {
        const $row = getIncludeAttrs(rowPropsKeys, this.value);
        extend($form, { labelWidth: "auto" });
        extend($row, { type: "flex", gutter: 15 });
        return { $form, $row };
      }
      if (this.value.layout == "descriptions") {
        const $descriptions = getIncludeAttrs(descriptionsPropkeys, this.value);
        return { $form, $descriptions };
      }
      if (this.value.layout == "tableditor") {
        const $table = getIncludeAttrs(tablePropsKeys, this.value);
        extend($table, { border: true });
        $form.model = {};
        this.items.forEach((v) => {
          let prop = v.prop;
          this.value.data.forEach((row, index) => {
            $form.model[`${prop}-${index}`] = row[prop];
          });
        });
        return { $form, $table };
      }
    },
    items() {
      return each(this.value.items, "map", (v, i, k) => {
        const item = this.injectItemAttr(v, k);
        const agItem = this.getAgFormItemAttrs(item);
        agItem.$formItem = this.getFormItemAttrs(item);
        agItem.$component = this.getComponentAttrs(item);
        if (this.value.layout == "grid") {
          agItem.$col = Object.assign(
            getIncludeAttrs(colPorpKeys, this.value),
            getIncludeAttrs(colPorpKeys, item)
          );
        }
        if (this.value.layout == "descriptions") {
          agItem.$descriptionsItem = getIncludeAttrs(
            descriptionsItemPropkeys,
            item
          );
        }
        if (this.value.layout == "tableditor") {
          agItem.$tableColumn = getIncludeAttrs(tableColumnPropsKeys, item);
        }
        return agItem;
      }).filter((v) => v.display);
    },
  },
  methods: {
    // items 相关
    injectItemAttr(item, prop) {
      const agelFormConfig = this.$agelFormConfig || {};
      if (!item.prop && prop) item.prop = prop;
      let config = agelFormConfig[this.getName(item)];
      if (config && config.constructor == Function) {
        config = config(item.prop, item, this.value);
      }
      if (config && config.constructor == Object) {
        extend(item, config);
      }
      if (item.prop == undefined) {
        item.prop = "_aguid_" + guid();
      }
      if (
        this.value.data.constructor === Object &&
        item.prop.indexOf("_aguid_") === -1 &&
        !this.value.data.hasOwnProperty(item.prop)
      ) {
        this.$set(this.value.data, item.prop, this.getItemValue(item));
      }
      return item;
    },
    getAgFormItemAttrs(item) {
      const name = this.getName(item);
      const agItem = Object.assign(
        agItemProps(),
        getIncludeAttrs(agItemPropKyes, item)
      );
      agItem.component = agComponents[name] ? agComponents[name] : name;
      agItem.display =
        typeof item.display == "function"
          ? item.display(this.value.data, item)
          : agItem.display;
      agItem.show =
        typeof item.show == "function"
          ? item.show(this.value.data, item)
          : agItem.show;
      agItem.slot =
        item.slot === true ? this.$scopedSlots[item.prop] : agItem.slot;
      return agItem;
    },
    getFormItemAttrs(item) {
      const formItem = getIncludeAttrs(formItemPropKyes, item);
      const rules = item.rules || (this.value.rules || {})[item.prop];
      if (item.required && rules == undefined) {
        formItem.required = undefined;
        formItem.rules = [
          {
            required: true,
            message: formItem.label + "必填",
            trigger: inputArr.includes(this.getName(item)) ? "blur" : "change",
          },
        ];
      }
      return formItem;
    },
    getComponentAttrs(item) {
      const ignoreKeys = [].concat(
        colPorpKeys,
        formItemPropKyes,
        agItemPropKyes,
        descriptionsItemPropkeys,
        this.itemExtendKeys
      );
      const component = Object.assign(
        getExcludeAttrs(ignoreKeys, item),
        item.$component || {}
      );
      component.placeholder = this.getPlaceholder(item);
      component.disabled =
        typeof item.disabled == "function"
          ? item.disabled(this.value.data)
          : item.disabled;
      return component;
    },
    getItemValue(item) {
      const name = this.getName(item);
      if (item.hasOwnProperty("defaultValue")) return item.defaultValue;
      if (
        name == "el-input" ||
        name == "el-autocomplete" ||
        name == "agel-select" ||
        name == "agel-tree-select" ||
        name == "agel-radio" ||
        (name == "agel-checkbox" && item.options)
      ) {
        return "";
      }
      if (name == "el-date-picker" || name == "el-time-select") {
        return null;
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
    getName(item) {
      const name = item.component || defaultComponent;
      return typeof name == "string" && agComponents["ag" + name]
        ? "ag" + name
        : name;
    },
    getPlaceholder(item) {
      if (item.placeholder) return item.placeholder;
      let name = this.getName(item);
      let label = typeof item.label == "string" ? item.label : "";
      if (inputArr.includes(name)) {
        return "请输入" + label;
      }
      if (selectArr.includes(name)) {
        return "请选择" + label;
      }
    },
    getRequiredAsteriskClass(item) {
      if (getProp(this.value, "hide-required-asterisk")) return "";
      const rules = item.rules || (this.value.rules || {})[item.prop] || {};
      const required =
        item.required ||
        (Array.isArray(rules) ? rules.some((v) => v.required) : rules.required);
      return required ? "agel-required-label" : "";
    },
    // 根据容器宽度响应式变化
    resize() {
      let width = this.$refs.form.$el.clientWidth;
      if (!this.value.responsive || width == 0) return;
      let method = this.value.responsiveMethod || this.responsiveMethod;
      let keys = ["labelPosition", "labelWidth", "gutter"];
      let layoutPropKeys = keys.concat(colPorpKeys);
      let layoutProps = getIncludeAttrs(layoutPropKeys, method(width));
      extend(this.value, layoutProps, true);
    },
    // 响应式规则
    responsiveMethod(w) {
      let arr = [];
      if (w <= 400) arr = [24, "top"];
      if (w > 400 && w <= 600) arr = [24, "right"];
      if (w > 600 && w <= 900) arr = [12, "right"];
      if (w > 900 && w <= 1200) arr = [8, "right"];
      if (w > 1200 && w <= 1600) arr = [6, "right"];
      if (w >= 1600) arr = [4, "right"];
      return { span: arr[0], labelPosition: arr[1] };
    },
    // 暴露出去的功能函数
    getRef(prop) {
      if (prop == undefined) return this.$refs.form;
      const layoutRef = this.$refs.layout;
      if (prop == "layout:tableditor") {
        return layoutRef.$refs.tableditor;
      }
      const agFormItemRef = layoutRef.$refs[prop];
      if (!agFormItemRef || agFormItemRef.length == 0) return null;
      if (agFormItemRef.length == 1) {
        return agFormItemRef[0].$refs.component;
      } else {
        return agFormItemRef.map((v) => v.$refs.component);
      }
    },
    getItem(prop, deep) {
      if (deep) return this.items.find((v) => v.prop == prop);
      if (Array.isArray(this.value.items)) {
        return this.value.items.find((v) => v.prop == prop);
      } else {
        return this.value.items[prop];
      }
    },
    validate(callback, erroCallback) {
      this.$refs.form.validate((is) => {
        if (is) {
          callback && callback(this.value.data);
        } else {
          erroCallback && erroCallback();
        }
      });
    },
    resetFields() {
      this.$refs.form.resetFields();
    },
    clearValidate(props) {
      this.$refs.form.clearValidate(props);
    },
  },
  install(vue, opts = {}) {
    vue.prototype.$agelFormConfig = opts;
    vue.component(opts.name || this.name, this);
  },
};
</script>

<style>
@import "./style.css";
</style>
import { layout } from 'echarts/lib/layout/barGrid'
