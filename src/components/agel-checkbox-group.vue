<template>
  <el-checkbox-group class="agel-checkbox-group" :value="value" v-bind="$attrs" v-on='on' @input="input">
    <component v-for="option of options" v-bind="option" :is="checkboxComponent" :key="option.value" :label="option.value">
      {{option.label}}
    </component>
  </el-checkbox-group>
</template>

<script>
import formMixin from "./formMixin";

export default {
  name: "agel-checkbox-group",
  mixins: [formMixin],
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
  data() {
    return {};
  },
  created() {
    if (this.value == undefined) {
      this.$emit("input", []);
    }
  },
  computed: {
    checkboxComponent() {
      return this.button ? "el-checkbox-button" : "el-checkbox";
    },
  },
};
</script>
