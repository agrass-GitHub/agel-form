<template>
  <el-form class="agel-form" ref="form" :model="value.data" v-bind="attrs.form" v-on="value.on">
    <template v-if="value.inline">
      <agel-form-item v-for="(item, key) in items" :key="key" :item="item" :data="value.data">
        <slot :name="key"></slot>
      </agel-form-item>
    </template>
    <el-row v-else v-bind="attrs.row">
      <el-col v-for="(item, key) in items" v-bind="item._col" :key="key">
        <agel-form-item :item="item" :data="value.data" :ref="key">
          <slot :name="key"></slot>
        </agel-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import agelFormItem from "./agel-form-item";

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
    labelPosition: "right",
    labelWidth: "100px",
    type: "flex",
    gutter: 15,
    getRef: this.getRef,
    getItem: this.getItem,
    resetFields: this.resetFields,
    validate: this.validate,
    clearValidate: this.clearValidate,
  };
};

const agFormItemProps = function () {
  return {
    // 扩展属性
    component: "el-input", // 组件名称 String
    display: true, // 是否渲染 Boolean
    show: true, // 是否显示 Boolean
    slot: false, // 是否自定义 Boolean  RenderFunction
    defaultValue: undefined, // 默认值
    on: {}, // event 事件 Object
  };
};

const kebabcase = (v) => v.replace(/([A-Z])/g, "-$1").toLowerCase();

const humpcase = (v) => {
  return v.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
};

export default {
  name: "agel-form",
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
  data() {
    return {};
  },
  created() {
    let extendApi = Object.assign(
      agFormProps.call(this),
      this.$agelFormConfig.form || {}
    );
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
  },
  computed: {
    attrs() {
      return {
        form: this.getPorpObj(formProps, this.value),
        row: this.getPorpObj(rowProps, this.value),
      };
    },
    // 表单项
    items() {
      let items = {};
      let cofnig = this.$agelFormConfig || {};
      let itemsObj = this.value.items;

      if (Array.isArray(this.value.items)) {
        itemsObj = {};
        this.value.items.forEach((v) => v.prop && (itemsObj[v.prop] = v));
      }
      for (const prop in itemsObj) {
        let item = itemsObj[prop];
        let agItem = agFormItemProps();
        // 注入全局配置
        let name = item.component || agItem.component;
        let itemConfig = cofnig[name];
        if (itemConfig) {
          if (typeof itemConfig == "function") {
            itemConfig = itemConfig(prop, item, this.value);
          }
          for (const key in itemConfig) {
            if (!item.hasOwnProperty(key)) item[key] = itemConfig[key];
          }
        }
        // 划分出 col，formitem，component，组件属性
        let component = {};
        let col = Object.assign(
          this.getPorpObj(colPorps, this.value),
          this.getPorpObj(colPorps, item)
        );
        let formItem = Object.assign(
          this.getPorpObj(formItemProps, this.value),
          this.getPorpObj(formItemProps, item)
        );
        // 自动添加 required rules
        if (formItem.required && formItem.rules == undefined) {
          formItem.required = false;
          formItem.rules = {
            required: true,
            message: item.label + "必填",
            trigger: "blur",
          };
        }
        for (const key in item) {
          if (
            !agItem.hasOwnProperty(key) &&
            !this.includeKey(colPorps, key) &&
            !this.includeKey(formItemProps, key)
          ) {
            component[key] = item[key];
          }
        }
        console.log(
          this.getPorpObj(
            Object.keys(agItem).concat(colPorps, formItemProps),
            item,
            false
          ),
          component
        );
        agItem._col = col;
        agItem._formItem = formItem;
        agItem._component = component;
        agItem.prop = prop;
        if (agItem.display === false) continue;
        items[prop] = agItem;
      }
      return items;
    },
  },
  methods: {
    getPorpObj(arr, target, is = true) {
      let obj = {};
      arr.forEach((key) => {
        let value = target[kebabcase(key)] || target[humpcase(key)];
        is ? value && (obj[key] = value) : !value && (obj[key] = value);
      });
      return obj;
    },
    includeKey(arr, key) {
      return arr.includes(kebabcase(key)) || arr.includes(humpcase(key));
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
  },
};
</script>

<style lang="scss">
.agel-form.el-form--inline {
  display: inline-block;
}

.agel-form {
  .el-row--flex {
    flex-wrap: wrap;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner,
  .el-select,
  .el-cascader,
  .el-input-number {
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
