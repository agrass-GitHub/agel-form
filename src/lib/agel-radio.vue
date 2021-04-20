<template>
  <i v-if="optionsLoading" class="agel-options-loading el-icon-loading"></i>
  <el-radio-group v-else ref="ref" class="agel-radio-group" :value="value" v-bind="$attrs" v-on='on' @input="input">
    <component :is="radioComponent" v-for="option of optionsData" v-bind="option" :key="option.value" :label="option.value">
      {{option.label}}
      <!-- <slot-render v-for="(render,slot) in slots" :key="slot" :slot="slot" :render="render" :scope="option"></slot-render> -->
    </component>
  </el-radio-group>
</template>

<script>
import formMixin from "../utils/formMixin";
import optionsMinxin from "../utils/optionsMinxin";

export default {
  name: "agel-radio-group",
  mixins: [formMixin, optionsMinxin],
  inheritAttrs: false,
  props: {
    value: [String, Number, Boolean],
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
