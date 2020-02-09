<template>
  <el-checkbox-group v-model="newVal" v-bind="$attrs" v-on='events'>
    <component
      v-for="option of options"
      v-bind="option"
      :is="checkboxComponent"
      :key="option.value"
      :label="option.value"
    >
      {{ option.label }}
    </component>
  </el-checkbox-group>
</template>

<script>
import formMixin from "@/mixins/formMixin";

export default {
  name: "agel-checkbox",
  mixins: [formMixin],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    button: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    checkboxComponent() {
      return this.button ? "el-checkbox-button" : "el-checkbox";
    }
  }
};
</script>
