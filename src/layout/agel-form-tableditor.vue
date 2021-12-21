<template>
  <el-table class="agel-form-tableditor-layout agel-item-w100" ref="tableditor" :data="data" v-bind="$attrs" v-on="$listeners">
    <slot name="prepend"></slot>
    <el-table-column v-for="item in items" v-bind="item.$tableColumn" label="" :key="item.prop">
      <render-component v-if="item.label" :render="item.label" :class="getRequiredAsteriskClass(item)" slot="header"></render-component>
      <template v-if="!types.includes(item.$tableColumn.type)" v-slot:default="{row,column,$index}">
        <agel-form-item v-if="row._edit_!==false||item.$tableColumn.type=='expand'" v-model="row[item.prop]" v-bind="item.$formItem" label=""
          label-width="0px" :prop="`${item.prop}-${$index}`" :item="item" :ref="item.prop" v-show="item.show" />
        <span class="tableditor-cell-text" v-else>{{getColumnText(item,row,column,row[item.prop],$index)}}</span>
      </template>
    </el-table-column>
    <slot name="append"></slot>
  </el-table>
</template>
 
<script>
import agelFormItem from "./agel-form-item.vue";
import renderComponent from "./render-component";
export default {
  name: "agel-form-tableditor-layout",
  inheritAttrs: false,
  components: {
    agelFormItem,
    renderComponent,
  },
  props: {
    data: Array,
    items: Array,
    getRequiredAsteriskClass: Function,
  },
  data() {
    return {
      types: ["selection", "index"],
    };
  },
  watch: {
    data() {
      if (this.data && this.data.length > 0) {
        this.data.forEach((row) => {
          if (!row.hasOwnProperty("_edit_")) this.$set(row, "_edit_", true);
        });
      }
    },
  },
  methods: {
    getColumnText(item, row, column, cellValue, index) {
      return item.$tableColumn.formatter
        ? item.$tableColumn.formatter(row, column, cellValue, index)
        : cellValue;
    },
  },
};
</script>
 
