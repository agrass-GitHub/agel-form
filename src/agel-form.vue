<template>
  <el-form class="agel-form" ref="form" :model="value.data" v-bind="attrs.form" v-on="value.on">
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
import agelFormItem from "./agel-form-item";
import components from "./lib/index";

const formProps = [
  "model",
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
    data: {},
    items: {},
    on: {},
    labelPosition: undefined,
    labelWidth: "auto",
    type: "flex",
    gutter: 15,
    getRef: this.getRef,
    getItem: this.getItem,
    initData: this.initData,
    validate: this.validate,
    resetFields: this.resetFields,
    clearValidate: this.clearValidate,
  };
};

const agFormItemProps = function () {
  return {
    // 扩展属性
    component: "el-input", // 组件名称 String
    vif: () => {},
    display: true, // 是否渲染 Boolean
    show: true, // 是否显示 Boolean
    ignore: false, // 是否忽略，若为 ture 则不会注入到 fromData
    custom: false, // 是否为自定义组件
    slot: false, // 是否自定义 FormItem slot Boolean/Funciton/Vnode/String
    slotLabel: false, // 是否自定义 FormItemLabel slot Object/Funciton/Vnode/String
    slots: {}, // 是否自定义 Component slot Object/Funciton/Vnode/String
    on: {}, // event 事件 Object
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
    let config = this.$agelFormConfig || {};
    let extendApi = Object.assign(agFormProps.call(this), config.form || {});
    Object.keys(extendApi).forEach((key) => {
      if (!this.value.hasOwnProperty(key)) {
        this.$set(this.value, key, extendApi[key]);
      }
    });
  },
  watch: {
    attach: {
      deep: true,
      immediate: true,
      handler: function () {
        for (let key in this.attach) {
          if (this.attach[key] !== undefined) {
            this.$set(this.value, key, this.attach[key]);
          }
        }
      },
    },
    "value.data": {
      immediate: true,
      handler: "initData",
    },
  },
  computed: {
    attrs() {
      return {
        form: this.getPorpsObj(formProps, this.value),
        row: this.getPorpsObj(rowProps, this.value),
      };
    },
    // 表单项
    items() {
      let items = {};
      let cofnig = this.$agelFormConfig || {};
      let itemsObj = this.value.items;
      let agComponentKeys = Object.keys(components);
      // 转成对象
      if (Array.isArray(this.value.items)) {
        itemsObj = {};
        this.value.items.forEach((v) => v.prop && (itemsObj[v.prop] = v));
      }
      for (const prop in itemsObj) {
        let agItem = agFormItemProps();
        let item = itemsObj[prop];
        let name = item.component || agItem.component;
        // 注入全局配置, 改变原始对象 item
        cofnig[name] && cofnig[name](prop, item, this.value);
        // if (item.display === false) continue;
        if (item.vif(this.value.data) === false) continue;
        if (
          (typeof item.display == "function" &&
            item.display(this.value.data) == false) ||
          (typeof item.display == "boolean" && item.display === false)
        ) {
          continue;
        }
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
        items[prop] = agItem;
      }
      return items;
    },
  },
  methods: {
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
