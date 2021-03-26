<template>
  <el-form-item v-show="item.show" v-bind="item._formItem">
    <slot-render v-if="item.slot" :render="$slots.default||item.slot"></slot-render>
    <component v-else-if="isAgComponent" :is="'ag'+item.component" :ref="item.prop" v-model="data[item.prop]" v-bind="item._component" :on="item.on">
    </component>
    <component v-else :is="item.component" :ref="item.prop" v-model="data[item.prop]" v-bind="item._component" v-on="item.on"> </component>
  </el-form-item>
</template>
 
<script>
import components from "./lib/index";

export default {
  name: "agel-form-item",
  components,
  props: {
    item: Object,
    data: Object,
  },
  computed: {
    isAgComponent() {
      let agComponentKeys = Object.keys(components);
      return agComponentKeys.includes("ag" + this.item.component);
    },
  },
  created() {
    if (!this.data.hasOwnProperty(this.item.prop)) {
      this.$set(this.data, this.item.prop, this.item.defaultValue);
    }
  },
  methods: {
    getRef() {
      let ref = this.$refs[this.item.prop];
      return this.isAgComponent ? ref.getRef() : ref;
    },
  },
};
</script>
 
