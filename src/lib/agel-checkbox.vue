<template>
  <i v-if="optionsLoading" class="agel-options-loading el-icon-loading"></i>
  <el-checkbox class="agel-checkbox" v-else-if="optionsData.length==0" :value="value" ref="ref" @input="input">
    <slot-render v-for="(render,slot) in slots" :key="slot" :slot="slot" :render="render"></slot-render>
  </el-checkbox>
  <el-checkbox-group v-else ref="ref" class="agel-checkbox-group" :value="value" v-bind="$attrs" v-on='on' @input="input">
    <component :is="checkboxComponent" v-for="option of optionsData" v-bind="option" :key="option.value" :label="option.value">
      <slot-render v-for="(render,slot) in slots" :key="slot" :slot="slot" :render="render" :scope="option"></slot-render>
    </component>
  </el-checkbox-group>
</template>

<script>
import formMixin from "../utils/formMixin";
import optionsMinxin from "../utils/optionsMinxin";

export default {
  name: "agel-checkbox",
  mixins: [formMixin, optionsMinxin],
  props: {
    value: [Boolean, Array],
    button: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    checkboxComponent() {
      return this.button ? "el-checkbox-button" : "el-checkbox";
    },
  },
};
</script>
