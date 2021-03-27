<template>
  <el-radio-group ref="ref" class="agel-radio-group" :value="value" v-bind="$attrs" v-on='on' @input="input">
    <component :is="radioComponent" v-for="option of options" v-bind="option" :key="option.value" :label="option.value">
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
