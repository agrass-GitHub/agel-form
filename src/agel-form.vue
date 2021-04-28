<template>
  <el-form class="agel-form" ref="form" :model="value.data" v-bind="attrs.form" v-on="value.on||{}">
    <template v-if="value.inline">
      <agel-form-item v-for="item in items" :item="item" :data="value.data" :prop="item.prop" :ref="item.prop" :key="item.prop">
        <slot :name="item.prop"></slot>
      </agel-form-item>
    </template>
    <el-row v-else v-bind="attrs.row">
      <el-col v-for="item in items" v-bind="item._col" :key="item.prop">
        <agel-form-item :item="item" :data="value.data" :prop="item.prop" :ref="item.prop">
          <slot :name="item.prop"></slot>
        </agel-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { isVNode } from "element-ui/src/utils/vdom";
import {
  addResizeListener,
  removeResizeListener,
} from "element-ui/src/utils/resize-event";

import agelFormItem from "./agel-form-item";
import components from "./lib/index";
import { getIncludeAttrs, getExcludeAttrs, guid } from "./utils/utils";
import {
  agFormProps,
  agItemProps,
  layoutPorps,
  formPropKeys,
  itemPropKyes,
  rowPropsKeys,
  colPorpKeys,
  agItemPropKyes,
  defaultComponent,
} from "./utils/props";

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
  data() {
    return {
      load: false,
    };
  },
  created() {
    this.injectConfig();
    this.asyncConfig();
    this.initFields();
    this.$nextTick(() => (this.load = true));
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
      let attrs = { form: {}, row: {} };
      if (!this.load) return attrs;
      attrs.form = getIncludeAttrs(formPropKeys, this.value);
      attrs.row = getIncludeAttrs(rowPropsKeys, this.value);
      return attrs;
    },
    items() {
      let agItems = {};
      if (!this.load) return agItems;
      this.eachItems((item) => {
        let display = item.display;
        if (typeof display == "function") {
          display = item.display(this.value.data);
        }
        if (display === false) return;
        const agItem = this.getAgFormItemAttrs(item);
        agItem._col = this.getColAttrs(item);
        agItem._formItem = this.getFormItemAttrs(item, agItem);
        agItem._component = this.getComponentAttrs(item, agItem);
        // agItems.push(agItem);
        agItems[item.prop] = agItem;
      });
      return agItems;
    },
  },
  watch: {
    attach: {
      deep: true,
      handler: "asyncConfig",
    },
    "value.data": "initFields",
  },
  methods: {
    // 注入全局配置，和扩展属性
    injectConfig() {
      let form = this.value;
      let config = this.$agelFormConfig || {};
      this.extend(form, config.form || {}, false);
      this.extend(form, agFormProps.call(this), false);
      !form.inline && this.extend(form, layoutPorps(), false);

      this.eachItems((item, prop) => {
        item.prop = prop || "_aguid_" + guid();
        let name = item.component || defaultComponent;
        let itemConfig = config[name] || {};
        if (itemConfig && itemConfig.constructor == Function) {
          itemConfig = itemConfig(item.prop, item, form);
        }
        if (itemConfig && itemConfig.constructor == Object) {
          this.extend(item, itemConfig, false);
        }
      });
    },
    // 同步配置到 value
    asyncConfig() {
      this.extend(this.value, this.attach);
    },
    // 初始化表单字段
    initFields() {
      for (const prop in this.items) {
        let item = this.items[prop];
        let name = item.component;
        let attrs = item._component;
        let value = undefined;
        if (item.ignore || this.value.data.hasOwnProperty(prop)) continue;
        const types = [
          {
            arr: [name == "el-switch", name == "agel-checkbox"],
            value: false,
          },
          {
            arr: [name == "el-date-picker", name == "el-time-select"],
            value: null,
          },
          {
            arr: [name == "el-input", "agel-select", "agel-tree-select"],
            value: "",
          },
          {
            arr: [name == "el-slider", name == "el-rate"],
            value: 0,
          },
          {
            arr: [
              name == "el-cascader",
              name == "el-transfer",
              name == "agel-upload",
              name == "agel-checkbox" && attrs.options != undefined,
              name == "agel-select" && attrs.multiple,
              name == "agel-tree-select" && attrs.multiple,
            ],
            value: [],
          },
        ];
        types.forEach((v) => v.arr.includes(true) && (value = v.value));
        this.$set(this.value.data, prop, value);
      }
    },
    // 根据容器宽度响应式变化
    resize() {
      let width = this.$refs.form.$el.clientWidth;
      if (!this.value.responsive || width == 0) return;
      let method = this.value.responsiveMethod || this.responsiveMethod;
      let keys = ["labelPosition", "labelWidth", "gutter"];
      let layoutPropKeys = keys.concat(colPorpKeys);
      let layoutProps = method(width);
      this.extend(this.value, getIncludeAttrs(layoutPropKeys, layoutProps));
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
    // 循环 items
    eachItems(fn) {
      let items = this.value.items || [];
      if (items.constructor == Array) {
        return items.forEach((item) => fn(item, item.prop));
      }
      if (items.constructor == Object) {
        for (const prop in items) fn(items[prop], prop);
      }
    },
    // 继承属性
    extend(obj, target, cover = true) {
      for (const key in target) {
        if ((obj.hasOwnProperty(key) && !cover) || target[key] == undefined) {
          continue;
        }
        this.$set(obj, key, target[key]);
      }
    },
    getAgFormItemAttrs(item) {
      const agKeys = Object.keys(components);
      const name = item.component || defaultComponent;
      const agItem = Object.assign(
        agItemProps(),
        getIncludeAttrs(agItemPropKyes, item)
      );
      agItem.component = agKeys.includes("ag" + name) ? "ag" + name : name;
      agItem.slots = this.getSlots(agItem.slots);
      agItem.slotLabel =
        typeof item.label == "function" || isVNode(item.label)
          ? item.label
          : "";
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
    getComponentAttrs(item, agItem) {
      const ignoreKeys = [].concat(colPorpKeys, itemPropKyes, agItemPropKyes);
      const component = getExcludeAttrs(ignoreKeys, item);
      component.placeholder = this.getPlaceholder(component, agItem);
      component.disabled =
        typeof agItem.disabled == "function"
          ? item.disabled(this.value.data)
          : component.disabled;
      return component;
    },
    getPlaceholder(component, agItem) {
      if (component.placeholder) return component.placeholder;
      let inputArr = ["el-input", "el-input-number"];
      let selectArr = [
        "agel-select",
        "agel-tree-select",
        "el-cascader",
        "el-time-select",
        "el-date-picker",
      ];
      let text = typeof agItem.label == "string" ? agItem.label : "";
      if (inputArr.includes(agItem.component)) {
        return "请输入" + text;
      }
      if (selectArr.includes(agItem.component)) {
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
    getItem(prop) {
      if (Array.isArray(this.value.items)) {
        return this.value.items.find((v) => (v.prop = prop));
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
      for (const key in this.items) {
        if (this.items[key].component == "el-upload") {
          this.value.data[key] = [];
        }
      }
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

.agel-form .el-slider__runway {
  margin: 12px 0px;
}
</style>
