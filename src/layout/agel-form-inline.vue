<template>
  <div class="agel-form-inline-layout" style="display: inline-block">
    <slot name="prepend"></slot>
    <agel-form-item v-for="item in items" v-model="data[item.prop]" v-bind="item.$formItem" :label="item.label" :item="item" :ref="item.prop"
      :key="item.prop" v-show="item.show" />
    <slot name="append"></slot>
  </div>
</template>
 
<script>
import agelFormItem from "./agel-form-item.vue";
export default {
  name: "agel-form-inline-layout",
  inheritAttrs: false,
  components: {
    agelFormItem,
  },
  props: {
    data: Object,
    items: Array,
  },
};
</script>
 
