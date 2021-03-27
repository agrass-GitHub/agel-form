<template>
  <el-form-item v-show="item.show" v-bind="item._formItem">
    <slot-render v-if="item.slot" :render="$slots.default||item.slot"></slot-render>
    <component v-else-if="isAgComponent" :is="'ag'+ item.component" :ref="prop" v-model="data[prop]" v-bind="item._component" :on="item.on">
    </component>
    <component v-else :is="item.component" :ref="prop" v-model="data[prop]" v-bind="item._component" v-on="item.on"> </component>
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
    prop() {
      return this.item._formItem.prop;
    },
    isAgComponent() {
      let agComponentKeys = Object.keys(components);
      return agComponentKeys.includes("ag" + this.item.component);
    },
  },
  created() {
    if (!this.data.hasOwnProperty(this.prop)) {
      this.$set(this.data, this.prop, this.item.defaultValue);
    }
  },
  methods: {
    getRef() {
      let ref = this.$refs[this.prop];
      return this.isAgComponent ? ref.getRef() : ref;
    },
  },
};
</script>
 
