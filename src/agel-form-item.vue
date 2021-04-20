<template>
  <el-form-item v-show="item.show" v-bind="item._formItem">
    <slot-render v-if="item.slot" :render="$slots.default||item.slot"></slot-render>
    <slot-render v-if="item.slotLabel" :render="item.slotLabel" slot="label"></slot-render>
    <component v-else-if="item.custom" :is="item.component" :ref="prop" v-model="data[prop]" v-bind="item._component" :on="item.on"
      :slots="item.slots" @update-item="updateItem">
    </component>
    <component v-else :is="item.component" :ref="prop" v-model="data[prop]" v-bind="item._component" v-on="item.on">
      <slot-render v-for="(render,slot) in item.slots" :key="slot" :slot="slot" :render="render"></slot-render>
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
    updateItem(attrs) {
      this.$emit("update-item", this.prop, attrs);
    },
  },
};
</script>
 
