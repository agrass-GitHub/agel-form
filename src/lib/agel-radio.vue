<template>
  <i v-if="optionsLoading" class="agel-options-loading el-icon-loading"></i>
  <el-radio-group v-else ref="ref" class="agel-radio-group" :value="value" v-bind="$attrs" v-on='on' @input="input">
    <component :is="radioComponent" v-for="option of optionsData" v-bind="option" :key="option.value" :label="option.value">
      <slot-render v-for="(render,slot) in scopedSlots" :key="slot" :slot="slot" :render="render" :scopeProps="option"></slot-render>
    </component>
  </el-radio-group>
</template>

<script>
import formMixin from "../utils/formMixin";
import optionsMinxin from "../utils/optionsMinxin";

export default {
  name: "agel-radio",
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
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
