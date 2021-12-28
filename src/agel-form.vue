<template>
  <el-form class="agel-form" ref="elForm" v-bind="formPorps" v-on="value.on||{}">
    <!-- 内联 布局 -->
    <agel-form-inline v-if="value.layout=='inline'" v-bind="layoutProps" ref="layout">
      <slot v-for="name in ['prepend', 'append']" :slot="name" :name="name" />
    </agel-form-inline>

    <!-- 栅格 布局 -->
    <agel-form-grid v-else-if="value.layout=='grid'" v-bind="layoutProps" :labelPositionProxy.sync="gridLabelPositionProxy" ref="layout">
      <slot v-for="name in ['prepend', 'append']" :slot="name" :name="name" />
    </agel-form-grid>

    <!-- descriptions 布局 -->
    <agel-form-descriptions v-else-if="value.layout=='descriptions'" v-bind="layoutProps" ref="layout">
      <slot v-for="name in ['prepend', 'append','title','extra']" :slot="name" :name="name" />
    </agel-form-descriptions>

    <!-- tableditor 布局 -->
    <agel-form-tableditor v-else-if="value.layout=='tableditor'" v-bind="layoutProps" :modelProxy.sync="tableditorModelProxy" v-on="value.on||{}"
      ref="layout">
      <slot v-for="name in ['prepend', 'append']" :slot="name" :name="name" />
    </agel-form-tableditor>

  </el-form>

</template>

<script>
import { getIncludeAttrs, extend, each } from "./utils/utils";

import {
  formPropKeys,
  gridPropKeys,
  tablePropsKeys,
  descriptionsPropkeys,
} from "./utils/props";

export default {
  name: "agel-form",
  inheritAttrs: false,
  provide() {
    return {
      agElForm: this,
    };
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
    itemExtendKeys: {
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
        extend(this.value, {
          layout: "grid",
          items: [],
          data: {},
          getRef: this.getRef,
          getItem: this.getItem,
          validate: this.validate,
          resetFields: this.resetFields,
          clearValidate: this.clearValidate,
        });
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
  data() {
    return {
      gridLabelPositionProxy: "",
      tableditorModelProxy: {},
    };
  },
  computed: {
    formPorps() {
      const props = getIncludeAttrs(formPropKeys, this.value);
      extend(props, { labelWidth: "auto" });
      if (this.value.layout === "grid" && this.value.responsive) {
        props.labelPosition = this.gridLabelPositionProxy;
      }
      if (this.value.layout === "tableditor") {
        props.model = this.tableditorModelProxy;
      } else {
        props.model = this.value.data;
      }
      return props;
    },
    layoutProps() {
      const props = {
        data: this.value.data,
        items: this.value.items,
        itemExtendKeys: this.itemExtendKeys,
      };
      let layoutPropsKeys = [];
      switch (this.value.layout) {
        case "grid":
          layoutPropsKeys = gridPropKeys;
          break;
        case "descriptions":
          layoutPropsKeys = descriptionsPropkeys;
          break;
        case "tableditor":
          layoutPropsKeys = tablePropsKeys;
          break;
      }
      return Object.assign(getIncludeAttrs(layoutPropsKeys, this.value), props);
    },
  },
  methods: {
    // 暴露出去的功能函数
    getRef(prop) {
      if (prop == undefined || prop === "elForm") return this.$refs.elForm;
      if (prop === "elLayout") return this.$refs.layout;
      return this.$refs.layout.getRef(prop);
    },
    getItem(prop, deep) {
      return this.$refs.layout.getItem(prop, deep);
    },
    validate(callback, erroCallback) {
      this.$refs.elForm.validate((is) => {
        if (is) {
          callback && callback(this.value.data);
        } else {
          erroCallback && erroCallback();
        }
      });
    },
    resetFields() {
      this.$refs.elForm.resetFields();
    },
    clearValidate(props) {
      this.$refs.elForm.clearValidate(props);
    },
  },
};
</script>


