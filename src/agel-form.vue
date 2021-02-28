<template>
  <el-form class="agel-form" ref="form" :model="value.data" v-bind="attrs">
    <template v-if="value.inline">
      <agel-form-item v-for="(item, key) in items" :key="key" :prop="key" :item="item" :data="value.data">
        <slot :name="key"></slot>
      </agel-form-item>
    </template>
    <el-row v-else :gutter="value.gutter">
      <el-col v-for="(item, key) in items" :span="item.span" :offset="item.offset" :key="key">
        <agel-form-item :prop="key" :item="item" :data="value.data">
          <slot :name="key"></slot>
        </agel-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import agelFormItem from "./agel-form-item";

const defaultProps = [
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

const formProps = function () {
  return {
    data: {},
    items: {},
    on: {},
    gutter: 15, // 继承自 el-row gutter
    valueFormatter: (v) => v,
    resetFields: this.resetFields,
    getFormData: this.getFormData,
    validate: this.getFormData,
  };
};

const itemProps = function () {
  return {
    // 扩展属性
    component: "el-input", // 组件名称 String
    display: true, // 是否渲染 Boolean
    show: true, // 是否显示 Boolean
    slot: false, // 是否自定义 Boolean  RenderFunction
    defaultValue: undefined, // 默认值
    valueFormatter: undefined, // 格式化 Funciton
    on: undefined, // event 事件 Object
    // 继承 el-form-item
    label: undefined,
    "label-width": undefined,
    required: undefined,
    rules: undefined,
    // 继承 el-row
    span: 24,
    offset: 0,
  };
};

const kebabcase = (v) => v.replace(/([A-Z])/g, "-$1").toLowerCase();

export default {
  name: "agel-form",
  components: {
    agelFormItem,
  },
  props: {
    value: Object,
  },
  install(vue, opts = {}) {
    vue.prototype.$agelFormConfig = opts;
    vue.component(opts.name || this.name, this);
  },
  data() {
    return {};
  },
  created() {
    this.insertExtendApi();
  },
  computed: {
    attrs() {
      let attrs = {};
      for (const key in this.value) {
        if (
          defaultProps.includes(key) ||
          defaultProps.includes(kebabcase(key))
        ) {
          attrs[key] = this.value[key];
        }
      }
      return attrs;
    },
    // 表单项
    items() {
      let items = {};
      for (const prop in this.value.items) {
        let extendApi = itemProps(); // 扩展属性
        let item = this.value.items[prop]; // 组件配置
        let newItem = { attrs: {}, ...extendApi };
        let itemName = item.component || extendApi.component;
        let globalApi = this.$agelFormConfig[itemName] || {}; // 全局组件配置

        if (typeof globalApi == "function") {
          globalApi = globalApi(prop, item, this.value);
        }
        for (const key in globalApi) {
          if (!item.hasOwnProperty(key)) item[key] = globalApi[key];
        }
        for (const key in item) {
          let obj = extendApi.hasOwnProperty(key) ? newItem : newItem.attrs;
          obj[key] = item[key];
        }
        if (newItem.required && newItem.rules == undefined) {
          newItem.required = false;
          newItem.rules = {
            required: true,
            message: item.label + "必填",
            trigger: "blur",
          };
        }
        if (item.display === false) continue;
        items[prop] = newItem;
      }
      return items;
    },
  },
  methods: {
    insertExtendApi() {
      let extendApi = Object.assign(
        formProps.call(this),
        this.$agelFormConfig.form || {}
      );
      Object.keys(extendApi).forEach((key) => {
        if (!this.value.hasOwnProperty(key)) {
          this.$set(this.value, key, extendApi[key]);
        }
      });
    },
    getFormData() {
      let data = this.value.data;
      let newData = JSON.parse(JSON.stringify(this.value.data));
      for (const key in this.items) {
        let item = this.items[key];
        if (item.valueFormatter) {
          newData[key] = item.valueFormatter(data[key], data, item);
        }
      }
      return this.value.valueFormatter(newData);
    },
    validate(callback) {
      this.$refs.form.validate((is) => {
        if (is) {
          callback && callback(this.value.getFormData());
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
  },
};
</script>

<style lang="stylus">
.agel-form {
  .el-date-editor.el-input, .el-date-editor.el-input__inner, .el-select, .el-cascader, .el-input-number {
    width: 100%;
  }

  .el-form--label-top .el-form-item__label {
    padding: 0px;
  }

  .el-form-item {
    margin-bottom: 15px;
  }
}
</style>
