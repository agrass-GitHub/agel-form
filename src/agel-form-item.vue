<template>
  <el-form-item v-bind="item.$formItem">
    <slot-render v-if="item.slotLabel" :render="item.slotLabel" slot="label"></slot-render>
    <slot-render v-if="item.slot" :render="$slots.default||item.slot"></slot-render>
    <component v-else :is="item.component" :ref="prop" v-model="data[prop]" v-bind="item.$component" v-on="item.on">
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
    prop: String,
    data: Object,
    item: Object,
  },
  methods: {
    getRef() {
      return this.$refs[this.prop];
    },
  },
};
</script>
 
