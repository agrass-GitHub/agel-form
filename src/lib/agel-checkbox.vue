<template>
  <span v-if="optionsLoading">
    <i class="el-icon-loading" style="width:inherit;height:inherit"></i>
  </span>
  <el-checkbox-group v-else-if="multiple" ref="ref" class="agel-checkbox-group" :value="proxyValue" v-bind="getGroupPorps($attrs)" v-on="$listeners">
    <component :is="is" v-for="(option,index) of proxyOptions" v-bind="getProps(option)" :key="option.value" :label="option.value">
      <slot name="option" :option="option" :index="index">{{option.label}}</slot>
    </component>
  </el-checkbox-group>
  <component v-else class="agel-checkbox" :is="is" :value="proxyValue" ref="ref" v-bind="getProps($attrs)" v-on="$listeners">
    <template v-slot:default>
      <slot name="default" />
    </template>
  </component>
</template>

<script>
import optionsMinxin from "../utils/optionsMinxin";
import { getIncludeAttrs } from "../utils/utils";

const propsKeys = [
  "label",
  "true-label",
  "false-label",
  "disabled",
  "border",
  "size",
  "name",
  "checked",
  "indeterminate",
  "style",
  "class",
];

const groupPropsKyes = ["size", "disabled", "min", "max", "text-color", "fill"];

export default {
  name: "agel-checkbox",
  inheritAttrs: false,
  mixins: [optionsMinxin],
  props: {
    value: {
      type: [String, Number, Boolean, Array],
      default: "",
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    is() {
      return this.button ? "el-checkbox-button" : "el-checkbox";
    },
    multiple() {
      return this.options !== undefined;
    },
    proxyValue() {
      if (this.multiple) {
        if (this.isProxyStrValue) {
          return String(this.value)
            .split(",")
            .filter((v) => v.trim() != "");
        }
        return this.value;
      } else {
        return this.value === this.activeValue;
      }
    },
  },
  created() {
    if (
      !this.multiple &&
      this.value !== this.activeValue &&
      this.value !== this.inactiveValue
    ) {
      this.$emit("input", this.inactiveValue);
    }
  },
  methods: {
    proxyInput(value) {
      if (value === this.value) return;
      if (this.multiple) {
        if (this.isProxyStrValue) {
          value = Array.isArray(value) ? value.join() : "";
        }
      } else {
        value = value ? this.activeValue : this.inactiveValue;
      }
      this.$emit("input", value);
    },
    getProps(traget) {
      return getIncludeAttrs(propsKeys, traget);
    },
    getGroupPorps(traget) {
      return getIncludeAttrs(groupPropsKyes, traget);
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
