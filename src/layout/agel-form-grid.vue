<template>
  <el-row class="agel-form-grid-layout agel-item-w100" v-bind="$attrs" style="flex-wrap: wrap">
    <slot name="prepend"></slot>
    <el-col v-for="item in items" v-bind="item.$col" :key="item.prop" v-show="item.show">
      <agel-form-item v-model="data[item.prop]" v-bind="item.$formItem" :label="item.label" :item="item" :ref="item.prop" />
    </el-col>
    <slot name="append"></slot>
  </el-row>
</template>
 
<script>
import agelFormItem from "./agel-form-item.vue";
export default {
  name: "agel-form-grid-layout",
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
 
