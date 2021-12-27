<template>
  <div class="agel-form-inline" style="display: inline-block">
    <slot name="prepend"></slot>
    <agel-form-item v-for="item in agItems" :key="item.prop" v-show="item.show" v-model="data[item.prop]" v-bind="item.$formItem"
      :component="item.$component" :label="item.label" :ref="item.prop" />
    <slot name="append"></slot>
  </div>
</template>
 
<script>
import itemsMinxin from "../utils/itemsMixin";

export default {
  name: "agel-form-inline",
  mixins: [itemsMinxin],
  inheritAttrs: false,
};
</script>
 
