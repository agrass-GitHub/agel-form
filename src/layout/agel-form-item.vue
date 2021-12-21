<template>
  <el-form-item v-bind="$attrs" label="">
    <render-component v-if="label" :render="label" slot="label" />
    <render-component v-if="item.slot" :render="item.slot" />
    <render-component v-else-if="item.component" :is="item.component" ref="component" :value="value" v-bind="item.$component" v-on="item.on"
      @input="input">
      <template v-for="(slot,staticName) in slots.staticSlots" v-slot:[staticName]>
        <render-component :key="staticName" :render="slot" />
      </template>
      <template v-for="(slot,scopedName) in slots.scopedSlots" v-slot:[scopedName]="slotPorps">
        <render-component :key="scopedName" :render="slot" v-bind="slotPorps" />
      </template>
    </render-component>
  </el-form-item>
</template>
 
<script>
import renderComponent from "./render-component";
export default {
  name: "agel-form-item",
  inheritAttrs: false,
  components: {
    renderComponent,
  },
  props: {
    value: {},
    item: Object,
    label: {
      type: [String, Number, Object, Array, Function],
      default: "",
    },
  },
  computed: {
    slots() {
      let slots = this.item.slots || {};
      let scopedSlots = {};
      let staticSlots = {};
      if (slots.constructor == Object) {
        for (const name in slots) {
          const slot = slots[name];
          if (slot.constructor == Function && slot.length > 0) {
            scopedSlots[name] = slot;
          } else {
            staticSlots[name] = slot;
          }
        }
      } else {
        staticSlots = { default: slots };
      }
      return { scopedSlots, staticSlots };
    },
  },
  methods: {
    input(value) {
      const vmodel = this.item.vmodel;
      if (vmodel === false) return;
      if (typeof vmodel == "string" && typeof value === "string") {
        if (vmodel == ".trim") {
          value = value.trim();
        } else if (vmodel == ".number" && !isNaN(parseFloat(value))) {
          value = parseFloat(value);
        }
      }
      this.$emit("input", value);
    },
  },
};
</script>
 
