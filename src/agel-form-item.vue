<template>
  <el-form-item v-show="item.show" :prop="prop" :label="item.label" :label-width="item['label-width']" :required="item.required" :rules="item.rules">
    <slot-render v-if="item.slot" :render="$slots.default||item.slot"></slot-render>
    <component v-else :is="componentName" :ref="prop" v-model="data[prop]" v-bind="item.attrs" v-on="item.on"> </component>
  </el-form-item>
</template>
 
<script>
import components from "./components/index";

export default {
  name: "agel-form-item",
  components,
  props: {
    prop: String,
    item: Object,
    data: Object,
  },
  computed: {
    isAgComponent() {
      let agComponentKeys = Object.keys(components);
      return agComponentKeys.includes("ag" + this.item.component);
    },
    componentName() {
      return this.isAgComponent
        ? "ag" + this.item.component
        : this.item.component;
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
 
