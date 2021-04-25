<template>
  <el-form-item v-bind="item._formItem">
    <slot-render v-if="item.slotLabel" :render="item.slotLabel" slot="label"></slot-render>
    <slot-render v-if="item.slot" :render="$slots.default||item.slot"></slot-render>
    <component v-else :is="item.component" :ref="prop" v-model="data[prop]" v-bind="item._component" v-on="item.on">

      <template v-for="(slot,noPorpsName) in slots.noPorpsSlots" v-slot:[noPorpsName]>
        <slot-render :key="noPorpsName" :render="slot"></slot-render>
      </template>

      <template v-for="(slot,hasPropsName) in slots.hasPorpsSlots" v-slot:[hasPropsName]="scopeProps">
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
  computed: {
    slots() {
      let noPorpsSlots = {};
      let hasPorpsSlots = {};
      for (const name in this.item.slots) {
        let slot = this.item.slots[name];
        if (typeof slot == "function" && slot.length != 0) {
          hasPorpsSlots[name] = slot;
        } else {
          noPorpsSlots[name] = slot;
        }
      }
      return { hasPorpsSlots, noPorpsSlots };
    },
  },
  methods: {
    getRef() {
      return this.$refs[this.prop];
    },
  },
};
</script>
 
