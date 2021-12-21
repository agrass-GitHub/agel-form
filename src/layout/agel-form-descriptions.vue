<template>
  <el-descriptions class="agel-form-tableditor-layout  agel-item-w100" v-bind="$attrs">
    <slot name="title" slot="title"></slot>
    <slot name="extra" slot="extra"></slot>
    <slot name="prepend"></slot>
    <el-descriptions-item v-for="item in items" v-bind="item.$descriptionsItem" label="" :key="item.prop">
      <render-component v-if="item.label" :render="item.label" :class="getRequiredAsteriskClass(item)" slot="label"></render-component>
      <agel-form-item v-model="data[item.prop]" v-bind="item.$formItem" label="" label-width="0px" :item="item" :ref="item.prop" v-show="item.show" />
    </el-descriptions-item>
    <slot name="append"></slot>
  </el-descriptions>
</template>
 
<script>
import agelFormItem from "./agel-form-item.vue";
import renderComponent from "./render-component";
export default {
  name: "agel-form-descriptions-layout",
  inheritAttrs: false,
  components: {
    agelFormItem,
    renderComponent,
  },
  props: {
    data: Object,
    items: Array,
    getRequiredAsteriskClass: Function,
  },
  data() {
    return {};
  },
};
</script>
 
