<template>
  <el-form-item v-bind="item._formItem">
    <slot-render v-if="item.slotLabel" :render="item.slotLabel" slot="label"></slot-render>
    <slot-render v-if="item.slot" :render="$slots.default||item.slot"></slot-render>
    <component v-else :is="item.component" :ref="prop" v-model="data[prop]" v-bind="item._component" v-on="item.on">
      <!-- <slot-render v-if="isDefaultSlot" :render="item.slots.default"></slot-render> -->
      <template v-for="(render,name) in item.slots" v-slot:[name]="scopeProps">
        <slot-render :key="name" :render="render" v-bind="scopeProps"></slot-render>
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
  mounted() {},
  computed: {
    isDefaultSlot() {
      return (
        this.item.slots.default && Object.keys(this.item.slots).length == 1
      );
    },
  },
  methods: {
    getRef() {
      return this.$refs[this.prop];
    },
  },
};
</script>
 
