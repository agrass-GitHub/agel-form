<template>
  <el-form-item v-show="item.show" v-bind="item._formItem">
    <slot-render v-if="item.slot" :render="$slots.default||item.slot"></slot-render>
    <slot-render v-if="item.slotLabel" :render="item.slotLabel" slot="label"></slot-render>
    <component v-else-if="item.custom" :is="item.component" :ref="prop" v-model="data[prop]" v-bind="item._component" :on="item.on"
      :slots="item.slots">
    </component>
    <component v-else :is="item.component" :ref="prop" v-model="data[prop]" v-bind="item._component" v-on="item.on">
      <slot-render v-for="(componentSlot,name) in item.slots" :key="name" :slot="name" :render="componentSlot">
      </slot-render>
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
      let ref = this.$refs[this.prop];
      return this.item.custom ? ref.getRef() : ref;
    },
  },
};
</script>
 
