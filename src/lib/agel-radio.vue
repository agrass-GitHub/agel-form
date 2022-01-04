<template>
  <span v-if="optionsLoading">
    <i class="el-icon-loading" style="width:inherit;height:inherit"></i>
  </span>
  <el-radio-group v-else-if="proxyOptions.length>0" ref="ref" class="agel-radio-group" :value="value" v-bind="getGroupProps($attrs)"
    v-on="$listeners">
    <component :is="is" v-for="(option,index) of proxyOptions" v-bind="getProps(option)" :key="option.value" :label="option.value">
      <slot name="option" :option="option" :index="index">{{option.label}}</slot>
    </component>
  </el-radio-group>
  <component v-else class="agel-radio" ref="ref" :is="is" :value="value" v-bind="getProps($attrs)" v-on="$listeners">
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
  "disabled",
  "border",
  "size",
  "name",
  "style",
  "class",
];

const groupPropsKyes = ["size", "disabled", "text-color", "fill"];

export default {
  name: "agel-radio",
  inheritAttrs: false,
  mixins: [optionsMinxin],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: "",
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    is() {
      return this.button ? "el-radio-button" : "el-radio";
    },
  },
  methods: {
    getProps(traget) {
      return getIncludeAttrs(propsKeys, traget);
    },
    getGroupProps(traget) {
      return getIncludeAttrs(groupPropsKyes, traget);
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
