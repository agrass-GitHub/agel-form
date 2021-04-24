<template>
  <i v-if="optionsLoading" class="agel-options-loading el-icon-loading"></i>
  <el-checkbox class="agel-checkbox" v-else-if="optionsData.length==0" :value="value" ref="ref" v-bind="$attrs" v-on='on' @input="input">
    <slot-render v-for="(render,slot) in scopedSlots" :key="slot" :slot="slot" :render="render"></slot-render>
  </el-checkbox>
  <el-checkbox-group v-else ref="ref" class="agel-checkbox-group" :value="value" v-bind="$attrs" v-on='on' @input="input">
    <component :is="checkboxComponent" v-for="(option,index) of optionsData" v-bind="option" :key="option.value" :label="option.value">
      <slot-render v-for="(render,slot) in scopedSlots" :key="slot" :slot="slot" :render="render" :scopeProps="{option,index}"></slot-render>
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
  mounted() {
    console.log(this.$scopedSlots);
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
