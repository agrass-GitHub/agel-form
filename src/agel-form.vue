<template>
  <el-form :class="['agel-form',{'agel-form-grid':!value.inline}]" ref="form" :model="value.data" v-bind="attrs.form" v-on="value.on||{}">
    <template v-if="value.inline">
      <slot name="prepend"></slot>
      <agel-form-item v-for="item in items" :item="item" :data="value.data" :prop="item.prop" :ref="item.prop" :key="item.prop" v-show="item.show!==false">
        <slot :name="item.prop"></slot>
      </agel-form-item>
      <slot name="append"></slot>
    </template>
    <el-row v-else v-bind="attrs.row">
      <slot name="prepend"></slot>
      <el-col v-for="item in items" v-bind="item.$col" :key="item.prop" v-show="item.show!==false">
        <agel-form-item :item="item" :data="value.data" :prop="item.prop" :ref="item.prop">
          <slot :name="item.prop"></slot>
        </agel-form-item>
      </el-col>
      <slot name="append"></slot>
    </el-row>
  </el-form>
</template>

<script>
import { isVNode } from "element-ui/src/utils/vdom";
import {
  addResizeListener,
  removeResizeListener,
} from "element-ui/src/utils/resize-event";

import {
  getIncludeAttrs,
  getExcludeAttrs,
  guid,
  each,
  extend,
  equalAgName,
} from "./utils/utils";

import {
  agFormProps,
  agItemProps,
  formPropKeys,
  itemPropKyes,
  rowPropsKeys,
  colPorpKeys,
  agItemPropKyes,
  defaultComponent,
  agComponentsKeys,
} from "./utils/props";

export default {
  name: "agel-form",
  inheritAttrs: false,
  components: {
    agelFormItem: () => import("./agel-form-item"),
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
    if (this.value.responsive) {
      this.resize();
      addResizeListener(this.$refs.form.$el, this.resize);
    }
  },
  beforeDestroy() {
    removeResizeListener(this.$refs.form.$el, this.resize);
  },
  computed: {
    items() {
      return each(
        this.value.items,
        (v, i, k) => {
          const item = this.injectItemAttr(v, k);
          const agItem = this.getAgFormItemAttrs(item);
          agItem.$formItem = this.getFormItemAttrs(item, agItem);
          agItem.$col = this.getColAttrs(item);
          agItem.$component = this.getComponentAttrs(item);
          return agItem;
        },
        "map"
      ).filter((v) => v.display !== false);
    },
    attrs() {
      let form = getIncludeAttrs(formPropKeys, this.value);
      let row = getIncludeAttrs(rowPropsKeys, this.value);
      if (!form.inline) {
        extend(form, { labelWidth: "auto" });
        extend(row, { type: "flex", gutter: 15 });
      }
      return { form, row };
    },
  },
  methods: {
    injectItemAttr(item, prop) {
      const agelFormConfig = this.$agelFormConfig || {};
      if (!item.prop && prop) item.prop = prop;
      if (!item.component) item.component = defaultComponent;
      let config = agelFormConfig[item.component];
      if (config && config.constructor == Function) {
        config = config(item.prop, item, this.value);
      }
      if (config && config.constructor == Object) {
        extend(item, config);
      }
      if (item.prop == undefined || item.component == "el-button") {
        item.ignore = true;
      }
      if (item.prop == undefined) {
        item.prop = "_aguid_" + guid();
      }
      if (!item.ignore && !this.value.data.hasOwnProperty(item.prop)) {
        this.$set(this.value.data, item.prop, this.getItemValue(item));
      }
      return item;
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
    getAgFormItemAttrs(item) {
      const name = item.component || defaultComponent;
      const agItem = Object.assign(
        agItemProps(),
        getIncludeAttrs(agItemPropKyes, item)
      );
      agItem.component = agComponentsKeys.includes("ag" + name)
        ? "ag" + name
        : name;
      agItem.slotLabel =
        typeof item.label == "function" || isVNode(item.label)
          ? item.label
          : "";
      agItem.display =
        typeof item.display == "function"
          ? item.display(this.value.data)
          : item.display;
      agItem.show =
        typeof item.show == "function" ? item.show(this.value.data) : item.show;
      agItem.slots = this.getSlots(agItem.slots);
      return agItem;
    },
    getFormItemAttrs(item, agItem) {
      const formItem = getIncludeAttrs(itemPropKyes, item);
      formItem.prop = agItem.ignore ? "" : item.prop;
      formItem.label = agItem.slotLabel ? "" : formItem.label;
      if (formItem.required && formItem.rules == undefined) {
        formItem.required = undefined;
        formItem.rules = {
          required: true,
          message: formItem.label + "必填",
          trigger: "blur",
        };
      }
      return formItem;
    },
    getColAttrs(item) {
      return Object.assign(
        getIncludeAttrs(colPorpKeys, this.value),
        getIncludeAttrs(colPorpKeys, item)
      );
    },
    getComponentAttrs(item) {
      const ignoreKeys = [].concat(
        colPorpKeys,
        itemPropKyes,
        agItemPropKyes,
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
      const name = item.component || defaultComponent;
      if (
        name == "el-input" ||
        name == "el-autocomplete" ||
        equalAgName(name, "agel-select") ||
        equalAgName(name, "agel-tree-select") ||
        (equalAgName(name, "agel-checkbox") && item.options)
      ) {
        return "";
      }
      if (name == "el-date-picker" || name == "el-time-select") {
        return null;
      }
      if (
        name == "el-switch" ||
        (equalAgName(name, "agel-checkbox") && !item.options)
      ) {
        return false;
      }
      if (
        name == "el-slider" ||
        name == "el-rate" ||
        name == "el-input-number"
      ) {
        return 0;
      }
      if (
        name == "el-cascader" ||
        name == "el-transfer" ||
        equalAgName(name, "agel-upload")
      ) {
        return [];
      }
    },
    getPlaceholder(item) {
      if (item.placeholder) return item.placeholder;
      let name = item.component || defaultComponent;
      let text = typeof item.label == "string" ? item.label : "";
      if (
        name == "el-input" ||
        name == "el-input-number" ||
        name == "el-autocomplete"
      ) {
        return "请输入" + text;
      }
      if (
        name == "el-cascader" ||
        name == "el-time-select" ||
        name == "el-date-picker" ||
        equalAgName(name, "agel-select") ||
        equalAgName(name, "agel-tree-select")
      ) {
        return "请选择" + text;
      }
    },
    getSlots(slots) {
      let noPorpsSlots = {};
      let hasPorpsSlots = {};
      if (slots.constructor !== Object || isVNode(slots)) {
        slots = { default: slots };
      }
      for (const name in slots) {
        let slot = slots[name];
        if (slot.constructor == Function && slot.length != 0) {
          hasPorpsSlots[name] = slot;
        } else {
          noPorpsSlots[name] = slot;
        }
      }
      return { hasPorpsSlots, noPorpsSlots };
    },
    // 暴露出去的功能函数
    getRef(prop) {
      if (prop == undefined) return this.$refs.form;
      return this.$refs[prop] ? this.$refs[prop][0].getRef() : null;
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
      this.items.forEach((v) => {
        if (v.component == "agel-upload") this.value.data[v.prop] = [];
      });
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
.agel-form.el-form--inline {
  display: inline-block;
}

.agel-form .el-row--flex {
  flex-wrap: wrap;
}

.agel-form .el-form-item {
  margin-bottom: 18px;
}

.agel-form.el-form--label-top .el-form-item__label {
  padding: 0px;
}

.agel-form .el-slider__runway {
  margin: 12px 0px;
}

/* 对 checkbox radio 在 label-top 情况下的展示优化*/
.agel-form.el-form--label-top .form-item-agel-checkbox .el-form-item__content,
.agel-form.el-form--label-top .form-item-agel-radio .el-form-item__content {
  display: inline-block;
}
.agel-form.el-form--label-top .form-item-agel-checkbox .el-form-item__label,
.agel-form.el-form--label-top .form-item-agel-radio .el-form-item__label {
  display: inline-block;
  padding: 0px 12px 0px 0px;
}

/* 在栅格布局情况下组件宽度撑满  考虑是否单独添加属性*/
.agel-form-grid .el-date-editor.el-input,
.agel-form-grid .el-date-editor.el-input__inner,
.agel-form-grid .el-select,
.agel-form-grid .el-cascader,
.agel-form-grid .el-input-number {
  width: 100%;
}

/* 调整 v-loading 在 form-item 中的表现 */
.agel-item-loading .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.5);
}

.agel-item-loading .el-loading-mask .el-loading-spinner {
  top: 0px;
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.agel-item-loading .el-loading-spinner .circular {
  width: 20px;
  height: 20px;
}
</style>
