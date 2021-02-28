<template>
  <el-select ref="ref" class="agel-select" :value="value" v-bind="$attrs" v-on='on' @input="input">
    <el-option v-for="option of options" v-bind='option' :key="option.value">
    </el-option>
  </el-select>
</template>

<script>
import formMixin from "./formMixin";
export default {
  name: "agel-select",
  mixins: [formMixin],
  inheritAttrs: false,
  props: {
    options: Array,
  },
};
</script>
