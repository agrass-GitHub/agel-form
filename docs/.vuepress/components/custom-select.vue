<template>
  <el-select ref="ref" v-bind="$attrs" :value="value" v-on='on' @input="input">
    <el-option v-for="(option) of options" :label="option.label" :value="option.value" :key="option.label">
    </el-option>
    <slot-render v-for="(render,name) in slots" :key="name" :slot="name" :render="render">
    </slot-render>
    <el-select>
</template>

<script>
import formMixin from "agel-form/src/lib/formMixin.js";
export default {
  name: "custom-select",
  mixins: [formMixin],
  props: {
    options: Array,
  },
};
</script>