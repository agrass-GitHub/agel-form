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
import { getIncludeAttrs, getExcludeAttrs, getProp, guid } from "./utils/utils";
import {
  agFormProps,
  agItemProps,
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
  watch: {
    value: {
      immediate: true,
      handler: "injectConfig",
    },
    attach: {
      deep: true,
      immediate: true,
      handler: function () {
        this.extend(this.value, this.attach, true);
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
    attrs() {
      let form = getIncludeAttrs(formPropKeys, this.value);
      let row = getIncludeAttrs(rowPropsKeys, this.value);
      if (!form.inline) {
        this.extend(form, { labelWidth: "auto" });
        this.extend(row, { type: "flex", gutter: 15 });
      }
      return { form, row };
    },
    items() {
      let items = this.value.items || [];
      if (!Array.isArray(items)) {
        items = Object.keys(items).map((key) => {
          if (items[key].prop == undefined) items[key].prop = key;
          return items[key];
        });
      }
      return items
        .map((v) => {
          const item = this.injectConfig(v);
          const agItem = this.getAgFormItemAttrs(item);
          agItem._formItem = this.getFormItemAttrs(item, agItem);
          agItem._col = this.getColAttrs(item);
          agItem._component = this.getComponentAttrs(item);
          return agItem;
        })
        .filter((v) => v.display !== false);
    },
  },
  methods: {
    // 注入全局配置，和扩展属性
    injectConfig(trget) {
      let form = this.value;
      let agelFormConfig = this.$agelFormConfig || {};
      if (trget == this.value || trget == undefined) {
        let config = agelFormConfig.form || {};
        this.extend(trget, config);
        this.extend(trget, agFormProps.call(this));
      } else {
        let name = trget.component || defaultComponent;
        let config = agelFormConfig[name];
        if (trget.prop === undefined) {
          trget.prop = "_aguid_" + guid();
          trget.ignore = true;
        }
        if (config && config.constructor == Function) {
          config = config(trget.prop, trget, form);
        }
        if (config && config.constructor == Object) {
          this.extend(trget, config);
        }
        this.initField(trget);
      }
      return trget;
    },
    // 初始化表单字段
    initField(item) {
      let name = item.component || defaultComponent;
      let value = undefined;
      if (item.ignore || this.value.data.hasOwnProperty(item.prop)) return;
      const types = [
        {
          arr: [name == "el-switch", name == "el-checkbox"],
          value: false,
        },
        {
          arr: [name == "el-date-picker", name == "el-time-select"],
          value: null,
        },
        {
          arr: [
            name == "el-input",
            name == "el-checkbox" && item.options != undefined,
            "el-select",
            "el-tree-select",
          ],
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
            name == "el-upload",
            // name == "el-checkbox" && item.options != undefined,
            // name == "el-select" && item.multiple,
            // name == "el-tree-select" && item.multiple,
          ],
          value: [],
        },
      ];
      types.forEach((v) => v.arr.includes(true) && (value = v.value));
      this.$set(this.value.data, item.prop, value);
    },
    // 根据容器宽度响应式变化
    resize() {
      let width = this.$refs.form.$el.clientWidth;
      if (!this.value.responsive || width == 0) return;
      let method = this.value.responsiveMethod || this.responsiveMethod;
      let keys = ["labelPosition", "labelWidth", "gutter"];
      let layoutPropKeys = keys.concat(colPorpKeys);
      let layoutProps = getIncludeAttrs(layoutPropKeys, method(width));
      this.extend(this.value, layoutProps, true);
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
    // 继承属性
    extend(obj, target, cover = false) {
      for (const key in target) {
        let a = getProp(obj, key) !== undefined && !cover;
        let b = getProp(target, key) === undefined;
        if (a || b) continue;
        this.$set(obj, key, target[key]);
      }
    },
    // 获取 agItem 属性相关函数
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
      agItem.display =
        typeof item.display == "function"
          ? item.display(this.value.data)
          : item.display;
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
      const ignoreKeys = [].concat(colPorpKeys, itemPropKyes, agItemPropKyes);
      const component = getExcludeAttrs(ignoreKeys, item);
      component.placeholder = this.getPlaceholder(item);
      component.disabled =
        typeof item.disabled == "function"
          ? item.disabled(this.value.data)
          : item.disabled;
      return component;
    },
    getPlaceholder(item) {
      if (item.placeholder) return item.placeholder;
      let name = item.component || defaultComponent;
      let inputArr = ["el-input", "el-input-number"];
      let selectArr = [
        "el-select",
        "el-tree-select",
        "el-cascader",
        "el-time-select",
        "el-date-picker",
      ];
      let text = typeof item.label == "string" ? item.label : "";
      if (inputArr.includes(name)) return "请输入" + text;
      if (selectArr.includes(name)) return "请选择" + text;
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
