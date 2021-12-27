<template>
  <el-row class="agel-form-grid" ref="ELROW" v-bind="rowProps" style="flex-wrap: wrap">
    <slot name="prepend"></slot>
    <el-col v-for="item in agItems" v-bind="item.$col" :key="item.prop" v-show="item.show">
      <agel-form-item v-model="data[item.prop]" v-bind="item.$formItem" :component="item.$component" :label="item.label" :ref="item.prop" />
    </el-col>
    <slot name="append"></slot>
  </el-row>
</template>
 
<script>
import {
  addResizeListener,
  removeResizeListener,
} from "element-ui/src/utils/resize-event";
import itemsMinxin from "../utils/itemsMixin";
import { getIncludeAttrs } from "../utils/utils";

const rowProps = {
  type: {
    type: String,
    default: "flex",
  },
  gutter: {
    type: Number,
    default: 15,
  },
  justify: String,
  align: String,
};

const colProps = {
  span: Number,
  offset: Number,
  push: Number,
  pull: Number,
  xs: [Number, Object],
  sm: [Number, Object],
  md: [Number, Object],
  lg: [Number, Object],
  xl: [Number, Object],
  tag: String,
};

const rowPropsKeys = Object.keys(rowProps);
const colPropsKeys = Object.keys(colProps);

const responsiveMethod = function (width) {
  let arr = [];
  if (width <= 400) arr = [24, "top"];
  if (width > 400 && width <= 600) arr = [24, "right"];
  if (width > 600 && width <= 900) arr = [12, "right"];
  if (width > 900 && width <= 1200) arr = [8, "right"];
  if (width > 1200 && width <= 1600) arr = [6, "right"];
  if (width >= 1600) arr = [4, "right"];
  return { span: arr[0], labelPosition: arr[1] };
};

export default {
  name: "agel-form-grid",
  mixins: [itemsMinxin],
  inheritAttrs: false,
  props: {
    responsive: {
      type: Boolean,
      default: false,
    },
    responsiveMethod: {
      type: Function,
      default: responsiveMethod,
    },
    labelWidth: {
      type: String,
      default: "auto",
    },
    ...rowProps,
    ...colProps,
  },
  data() {
    return {
      agItemExtendKeys: colPropsKeys,
      resizeLayoutProps: {},
    };
  },
  mounted() {
    if (this.responsive) {
      addResizeListener(this.$refs.ELROW.$el, this.resize);
    }
  },
  beforeDestroy() {
    removeResizeListener(this.$refs.ELROW.$el, this.resize);
  },
  computed: {
    rowProps() {
      return getIncludeAttrs(rowPropsKeys, this.$props);
    },
  },
  methods: {
    agItemExtendHandle(agItem, item) {
      // if (agItem.$formItem.labelWidth) {
      // }
      agItem.$col = Object.assign(
        getIncludeAttrs(colPropsKeys, this.$props),
        getIncludeAttrs(colPropsKeys, this.resizeLayoutProps),
        getIncludeAttrs(colPropsKeys, item)
      );
      return agItem;
    },
    resize() {
      let width = this.$refs.ELROW.$el.clientWidth;
      if (!this.responsive || width == 0) return;
      this.resizeLayoutProps = this.responsiveMethod(width);
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>

<style>
.agel-form-grid .el-date-editor.el-input,
.agel-form-grid .el-date-editor.el-input__inner,
.agel-form-grid .el-select,
.agel-form-grid .el-cascader,
.agel-form-grid .el-input-number,
.agel-form-grid .el-autocomplete {
  width: 100%;
}
</style>
 
