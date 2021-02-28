<template>
  <el-radio-group class="agel-radio-group" :value="value" v-bind="$attrs" v-on='on' @input="input">
    <component v-for="option of options" v-bind="option" :is="radioComponent" :key="option.value" :label="option.value">
      {{option.label}}
    </component>
  </el-radio-group>
</template>

<script>
import formMixin from "./formMixin";

export default {
  name: "agel-radio-group",
  mixins: [formMixin],
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    radioComponent() {
      return this.button ? "el-radio-button" : "el-radio";
    },
  },
};
</script>
