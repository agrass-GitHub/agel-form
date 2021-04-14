<template>
  <el-form-item v-show="item.show" v-bind="item._formItem" :label="label.text">
    <slot-render v-if="label.slot" :render="label.slot" slot="label"></slot-render>
    <slot-render v-if="item.slot" :render="$slots.default||item.slot"></slot-render>
    <component v-else-if="item.custom" :is="item.component" :ref="prop" v-model="data[prop]" v-bind="item._component" :on="item.on" :slots="slots">
    </component>
    <component v-else :is="item.component" :ref="prop" v-model="data[prop]" v-bind="item._component" v-on="item.on">
      <slot-render v-for="(componentSlot,name) in slots" :key="name" :slot="name" :render="componentSlot">
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
    item: Object,
    data: Object,
  },
  computed: {
    label() {
      let label = this.item._formItem.label;
      if (typeof label === "string") {
        return { text: label, slot: undefined };
      } else {
        return { text: undefined, slot: label };
      }
    },
    prop() {
      return this.item._formItem.prop;
    },
    slots() {
      let slots = this.item.slots;
      let isText = typeof slots == "string";
      let isRender = typeof slots == "function";
      let isVnode = typeof slots == "object" && slots.tag;
      // 如果是单个，就包裹一层 default
      return isText || isRender || isVnode
        ? { default: this.item.slots }
        : slots;
    },
  },
  created() {
    if (!this.data.hasOwnProperty(this.prop) && this.item.ignore !== true) {
      this.$set(this.data, this.prop, this.item.defaultValue);
    }
  },
  methods: {
    getRef() {
      let ref = this.$refs[this.prop];
      return this.item.custom ? ref.getRef() : ref;
    },
  },
};
</script>
 
