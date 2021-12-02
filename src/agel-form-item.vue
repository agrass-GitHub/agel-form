<template>
  <el-form-item :class="'form-item-'+item.component" v-bind="item.$formItem" :label="showLabel?item.$formItem.label:''">
    <slot-render v-if="item.label && showLabel && item.label.constructor!==String" :render="item.label" slot="label"></slot-render>
    <slot-render v-if="item.slot" :render="item.slot"></slot-render>
    <component v-else :is="item.component" :ref="item.prop" :value="value" v-bind="item.$component" v-on="item.on" @input="input">
      <template v-for="(slot,noPorpsName) in item.slots.noPorpsSlots" v-slot:[noPorpsName]>
        <slot-render :key="noPorpsName" :render="slot"></slot-render>
      </template>
      <template v-for="(slot,hasPropsName) in item.slots.hasPorpsSlots" v-slot:[hasPropsName]="scopeProps">
        <slot-render :key="hasPropsName" :render="slot" v-bind="scopeProps"></slot-render>
      </template>
    </component>
  </el-form-item>
</template>
 
<script>
import components from "./lib/index";

export default {
  name: "agel-form-item",
  components,
  props: {
    value: {},
    item: Object,
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getRef() {
      return this.$refs[this.item.prop];
    },
    input(vlaue) {
      if (this.item.vmodel) this.$emit("update:value", vlaue);
    },
  },
};
</script>
 
