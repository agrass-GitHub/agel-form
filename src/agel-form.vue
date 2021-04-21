<template>
  <el-form class="agel-form" ref="form" :model="value.data" v-bind="attrs.form" v-on="attrs.on||{}">
    <template v-if="value.inline">
      <agel-form-item v-for="(item, prop) in items" :item="item" :data="value.data" :prop="prop" :ref="prop" :key="prop" @update-item="updateItem">
        <slot :name="prop"></slot>
      </agel-form-item>
    </template>
    <el-row v-else v-bind="attrs.row">
      <el-col v-for="(item, prop) in items" v-bind="item._col" :key="prop">
        <agel-form-item :item="item" :data="value.data" :prop="prop" :ref="prop" @update-item="updateItem">
          <slot :name="prop"></slot>
        </agel-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import {
  addResizeListener,
  removeResizeListener,
} from "element-ui/src/utils/resize-event";
// isVnode 导入判断

import agelFormItem from "./agel-form-item";
import components from "./lib/index";

const formProps = [
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

const formItemProps = ["prop", "label", "label-width", "required", "rules"];

const rowProps = ["gutter", "type", "justify", "align", "tag"];

const colPorps = [
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

const agFormProps = function () {
  return {
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
    // 默认布局属性 继承自 FormItem，Row 属性
    labelWidth: "auto",
    type: "flex",
    gutter: 15,
    // 暴露出去的方法
    getRef: this.getRef,
    getItem: this.getItem,
    validate: this.validate,
    resetFields: this.resetFields,
    clearValidate: this.clearValidate,
  };
};

const agFormItemProps = function () {
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
    // Boolean/Funciton/Vnode/String 是否自定义 FormItem slot
    slot: false,
    // Object/Funciton/Vnode/String 是否自定义 Component slot
    slots: {},
    // Object 组件 event 事件
    on: {},
  };
};

const kebabcase = (v) => v.replace(/([A-Z])/g, "-$1").toLowerCase();

const humpcase = (v) => v.replace(/-(\w)/g, (a, b) => b.toUpperCase());

export default {
  name: "agel-form",
  inheritAttrs: false,
  components: {
    agelFormItem,
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
  },
  install(vue, opts = {}) {
    vue.prototype.$agelFormConfig = opts;
    vue.component(opts.name || this.name, this);
  },
  created() {
    this.injectConfig();
    this.initData();
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
    attrs() {
      return {
        form: this.getPorpsObj(formProps, this.value),
        row: this.getPorpsObj(rowProps, this.value),
      };
    },
    items() {
      return this.getAgItems();
    },
  },
  watch: {
    attach: {
      deep: true,
      immediate: true,
      handler: "asyncConfig",
    },
    "value.data": {
      immediate: true,
      handler: "initData",
    },
  },
  methods: {
    injectConfig() {
      let config = this.$agelFormConfig || {};
      let extendApi = Object.assign(agFormProps.call(this), config.form || {});
      this.extend(this.value, extendApi);
      this.each(this.value.items, (item, prop) => {
        let name = item.component || agFormItemProps().component;
        let itemConfig = config[name] || {};
        if (itemConfig && itemConfig.constructor == Function) {
          itemConfig = itemConfig(prop, item, this.value);
        }
        if (itemConfig && itemConfig.constructor == Object) {
          this.extend(item, itemConfig);
        }
      });
    },
    asyncConfig() {
      this.each(this.attach, (item, key) => {
        item && this.$set(this.value, key, item);
      });
    },
    initData() {
      for (const prop in this.items) {
        let item = this.items[prop];
        let name = item.component;
        let component = item._component;
        let value = undefined;
        if (item.ignore || this.value.data.hasOwnProperty(prop)) continue;
        let types = [
          {
            types: [name == "el-switch", name == "agel-checkbox"],
            value: false,
          },
          {
            types: [name == "el-date-picker", name == "el-time-select"],
            value: null,
          },
          {
            types: [name == "el-input", "agel-select", "agel-tree-select"],
            value: "",
          },
          {
            types: [name == "el-slider", name == "el-rate"],
            value: 0,
          },
          {
            types: [
              name == "el-cascader",
              name == "el-transfer",
              name == "agel-upload",
              name == "agel-checkbox" && component.options != undefined,
              name == "agel-select" && component.multiple,
              name == "agel-tree-select" && component.multiple,
            ],
            value: [],
          },
        ];
        types.forEach((v) => {
          v.types.includes(true) && (value = v.value);
        });
        this.$set(this.value.data, prop, value);
      }
    },
    includesKey(keys, key) {
      return keys.includes(kebabcase(key)) || keys.includes(humpcase(key));
    },
    getPorpsObj(keys, target) {
      let obj = {};
      keys.forEach((key) => {
        let value = target[kebabcase(key)] || target[humpcase(key)];
        value && (obj[key] = value);
      });
      return obj;
    },
    getRef(prop) {
      if (prop == undefined) return this.$refs.form;
      return this.$refs[prop] ? this.$refs[prop][0].getRef() : null;
    },
    getItem(prop) {
      if (Array.isArray(this.value.items)) {
        return this.value.items.find((v) => (v.prop = prop));
      } else {
        return this.value.items[prop];
      }
    },
    getAgItems() {
      let agItems = {};
      let agComponentKeys = Object.keys(components);
      this.each(this.value.items, (item, prop) => {
        let agItem = agFormItemProps();
        let name = item.component || agItem.component;
        // 是否渲染
        let display = item.display;
        if (typeof display == "function") display = display(this.value.data);
        if (display === false) return;
        // 合并 agItem 属性
        Object.assign(agItem, this.getPorpsObj(Object.keys(agItem), item));
        // 是否为二次封装组件
        if (agComponentKeys.includes("ag" + name)) {
          agItem.custom = true;
          agItem.component = "ag" + name;
        }
        // 包裹默认 slots
        if (agItem.slots.constructor !== Object || agItem.slots.tag) {
          agItem.slots = { default: agItem.slots };
        }
        // 划分出 col，formitem，component组件 对应的属性
        let col = Object.assign(
          this.getPorpsObj(colPorps, this.value),
          this.getPorpsObj(colPorps, item)
        );
        let formItem = Object.assign(
          this.getPorpsObj(formItemProps, this.value),
          this.getPorpsObj(formItemProps, item)
        );
        let component = {};
        let ignoreKeys = Object.keys(agItem).concat(colPorps, formItemProps);
        for (const key in item) {
          if (!this.includesKey(ignoreKeys, key)) component[key] = item[key];
        }
        if (!agItem.ignore) formItem.prop = prop;
        // 设置 slotLabel
        if (typeof formItem.label !== "string") {
          agItem.slotLabel = formItem.label;
          formItem.label = "";
        }
        // 自动添加 required rules
        if (formItem.required && formItem.rules == undefined) {
          formItem.required = undefined;
          formItem.rules = {
            required: true,
            message: formItem.label + "必填",
            trigger: "blur",
          };
        }
        // 自动设置 placeholder 属性
        if (component.placeholder == undefined) {
          let inputArr = ["el-input", "el-input-number"];
          let selectArr = [
            "agel-select",
            "agel-tree-select",
            "el-cascader",
            "el-time-select",
            "el-date-picker",
          ];
          if (inputArr.includes(agItem.component)) {
            component.placeholder = "请输入" + formItem.label;
          }
          if (selectArr.includes(agItem.component)) {
            component.placeholder = "请选择" + formItem.label;
          }
        }
        agItem._col = col;
        agItem._formItem = formItem;
        agItem._component = component;
        agItems[prop] = agItem;
      });
      return agItems;
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
      for (const key in this.items) {
        if (this.items[key].component == "el-upload") {
          this.value.data[key] = [];
        }
      }
    },
    clearValidate(props) {
      this.$refs.form.clearValidate(props);
    },
    resize() {
      if (!this.value.responsive) return;
      let w = this.$refs.form.$el.clientWidth;
      let method = this.value.responsiveMethod || this.responsiveMethod;
      let [span, labelPosition] = method(w);
      this.$set(this.value, "span", span);
      this.$set(this.value, "labelPosition", labelPosition);
    },
    responsiveMethod(w) {
      if (w <= 400) return [24, "top"];
      if (w > 400 && w <= 600) return [24, "right"];
      if (w > 400 && w <= 900) return [12, "right"];
      if (w > 900 && w <= 1200) return [8, "right"];
      if (w > 1200 && w <= 1600) return [6, "right"];
      if (w >= 1600) return [4, "right"];
    },
    updateItem(prop, attrs) {
      let item = this.getItem(prop);
      for (const key in attrs) {
        if (item.hasOwnProperty(key)) {
          item[key] = attrs[key];
        } else {
          this.$set(item, key, attrs[key]);
        }
      }
    },
    each(target, fn) {
      if (target.constructor == Array) target.forEach(fn);
      if (target.constructor == Object) {
        for (const key in target) fn(target[key], key);
      }
    },
    extend(target, form) {
      for (const key in form) {
        if (!target.hasOwnProperty(key) && form[key] !== undefined) {
          this.$set(target, key, form[key]);
        }
      }
    },
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

.agel-form .el-form--label-top .el-form-item__label {
  padding: 0px;
}

.agel-form .el-form-item {
  margin-bottom: 15px;
}

.agel-form .el-date-editor.el-input,
.agel-form .el-date-editor.el-input__inner,
.agel-form .el-select,
.agel-form .el-cascader,
.agel-form .el-input-number {
  width: 100%;
}

.agel-form .agel-checkbox-group {
  display: inline-block;
}
</style>
