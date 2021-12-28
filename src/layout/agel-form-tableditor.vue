<template>
  <el-table class="agel-form-tableditor" ref="elTable" :data="data" v-bind="$attrs" :border="border" v-on="$listeners">
    <slot name="prepend"></slot>
    <el-table-column v-for="item in agItems" v-bind="item.$tableColumn" label="" :key="item.prop">
      <render-component v-if="item.label" :render="item.label" :class="getRequiredAsteriskClass(item)" slot="header"></render-component>
      <template v-if="!types.includes(item.$tableColumn.type)" v-slot:default="{row,column,$index}">
        <agel-form-item v-if="row._edit_!==false||item.$tableColumn.type=='expand'" v-show="item.show" v-model="row[item.prop]"
          v-bind="item.$formItem" :component="item.$component" label="" label-width="0px" :prop="`${item.prop}-${$index}`" :ref="item.prop" />
        <span class="tableditor-cell-text" v-else>{{getColumnText(item,row,column,row[item.prop],$index)}}</span>
      </template>
    </el-table-column>
    <slot name="append"></slot>
  </el-table>
</template>
 
<script>
import itemsMinxin from "../utils/itemsMixin";
import renderComponent from "./render-component";
import { getIncludeAttrs } from "../utils/utils";
import { tableColumnPropsKeys } from "../utils/props";

export default {
  name: "agel-form-tableditor",
  mixins: [itemsMinxin],
  inheritAttrs: false,
  components: {
    renderComponent,
  },
  props: {
    border: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: () => new Array(),
    },
    modelProxy: {
      type: Object,
    },
  },
  provide() {
    return {
      validateRow: this.validateRow,
    };
  },
  data() {
    return {
      types: ["selection", "index"],
      agItemExtendKeys: tableColumnPropsKeys,
    };
  },
  computed: {
    tableFormModel() {
      const model = {};
      this.data.forEach((row, index) => {
        this.agItems.forEach((v) => {
          if (v.prop.indexOf("_aguid_") !== -1) return;
          model[`${v.prop}-${index}`] = row[v.prop];
        });
      });
      return model;
    },
  },
  watch: {
    tableFormModel: {
      immediate: true,
      handler() {
        if (!this.modelProxy) return;
        this.$emit("update:modelProxy", this.tableFormModel);
      },
    },
  },
  methods: {
    validateRow(index, callback) {
      let props = this.agItems.map((v) => `${v.prop}-${index}`);
      let ok = true;
      this.elForm.validateField(props, (errMsg) => {
        if (errMsg) ok = false;
      });
      ok && callback && callback();
    },
    agItemExtendHandle(agItem, item) {
      agItem.$tableColumn = getIncludeAttrs(tableColumnPropsKeys, item);
      return agItem;
    },
    getColumnText(item, row, column, cellValue, index) {
      return item.$tableColumn.formatter
        ? item.$tableColumn.formatter(row, column, cellValue, index)
        : cellValue;
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
<style>
.agel-form-tableditor .el-date-editor.el-input,
.agel-form-tableditor .el-date-editor.el-input__inner,
.agel-form-tableditor .el-select,
.agel-form-tableditor .el-cascader,
.agel-form-tableditor .el-input-number,
.agel-form-tableditor .el-autocomplete {
  width: 100%;
}

.agel-form-tableditor .el-form-item {
  margin-bottom: 0px;
}
.agel-form-tableditor .el-form-item__error {
  position: inherit;
}
.agel-form-tableditor .agel-required-label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
 
