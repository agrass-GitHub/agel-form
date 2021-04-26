<template>
  <i v-if="optionsLoading" class="agel-options-loading el-icon-loading"></i>
  <component v-else-if="optionsData.length==0" class="agel-checkbox" :is="is" :value="value" ref="ref" v-bind="getProps($attrs)" v-on="$listeners">
    <template v-slot:default>
      <slot name="default" />
    </template>
  </component>
  <el-checkbox-group v-else ref="ref" class="agel-checkbox-group" :value="value" v-bind="getGroupPorps($attrs)" v-on="$listeners">
    <component :is="is" v-for="(option,index) of optionsData" v-bind="getProps(option)" :key="option.value" :label="option.value">
      <slot name="option" :option="option" :index="index">{{option.label}}</slot>
    </component>
  </el-checkbox-group>
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
];

const groupPropsKyes = ["size", "disabled", "min", "max", "text-color", "fill"];

export default {
  name: "agel-checkbox",
  inheritAttrs: false,
  mixins: [optionsMinxin],
  props: {
    value: [Boolean, Array],
    button: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    is() {
      return this.button ? "el-checkbox-button" : "el-checkbox";
    },
  },
  methods: {
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
