<template>
  <i v-if="optionsLoading" class="agel-options-loading el-icon-loading"></i>
  <component v-else-if="optionsData.length==0" class="agel-checkbox" :is="is" :value="value" ref="ref" v-bind="$attrs" v-on="$listeners">
    <template v-slot:default>
      <slot name="default" />
    </template>
  </component>
  <el-checkbox-group v-else ref="ref" class="agel-checkbox-group" :value="value" v-bind="$attrs" v-on="$listeners">
    <component :is="is" v-for="(option,index) of optionsData" v-bind="option" :key="option.value" :label="option.value">
      <slot name="option" :option="option" :index="index"></slot>
    </component>
  </el-checkbox-group>
</template>

<script>
import optionsMinxin from "../utils/optionsMinxin";

export default {
  name: "agel-checkbox",
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
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
