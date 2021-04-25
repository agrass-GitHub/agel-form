<template>
  <el-select class="agel-tree-select" :popper-class="treePopperClass" ref="select" :value="isLoading?undefined:text" :multiple="multiple"
    :disabled="disabled" :collapseTags="collapseTags" :clearable="clearable" v-on="$listeners" @click.native="initScroll" :loading="isLoading"
    :placeholder="isLoading?loadingText:placeholder" :loading-text="loadingText" @clear="handleClear">
    <div class="filter-item" v-if="filter">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini"></el-input>
    </div>
    <el-option value="tree-option-value">
      <el-tree ref="ref" class="tree-option" :data="treeData" :props="props" :show-checkbox="multiple" :highlight-current="!multiple"
        :node-key="nodeKey" :expand-on-click-node="false" :filter-node-method="handleFilterNode" v-bind="$attrs" v-on="$listeners"
        @current-change="handleCurrentChange" @check-change="handleCheckChange">
      </el-tree>
    </el-option>
  </el-select>
</template>
 
<script>
import optionsMinxin from "../utils/optionsMinxin";
import { getProp } from "../utils/utils";
import { isEmpty } from "element-ui/src/utils/util";

export default {
  name: "agel-tree-select",
  mixins: [optionsMinxin],
  inheritAttrs: false,
  props: {
    value: [String, Number, Array],
    props: Object, // 覆盖 optionsMinxin 的默认 props
    loading: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    multiple: Boolean,
    collapseTags: Boolean,
    placeholder: String,
    filter: Boolean,
    popperClass: String,
    leafOnly: Boolean,
    includeHalfChecked: Boolean,
    loadingText: {
      type: String,
      default: "加载中...",
    },
  },
  data() {
    return {
      text: "",
      filterText: "",
    };
  },
  computed: {
    isLoading() {
      return this.loading || this.optionsLoading;
    },
    labelKey() {
      let props = this.props || {};
      return props.label || "label";
    },
    nodeKey() {
      return getProp(this.$attrs, "lazy")
        ? this.labelKey
        : getProp(this.$attrs, "nodeKey") || this.labelKey;
    },
    treeData() {
      return !isEmpty(this.optionsData) ? this.optionsData : this.$attrs.data;
    },
    treePopperClass() {
      return `agel-tree-select-popper ${this.popperClass || ""}`;
    },
  },
  watch: {
    value() {
      this.selectedTree();
    },
    treeData() {
      this.$nextTick(this.selectedTree);
    },
    filterText(val) {
      this.$refs.ref.filter(val);
    },
  },
  mounted() {
    this.selectedTree();
  },
  methods: {
    // 根据 value 回填 text
    selectedTree() {
      let data = this.treeData;
      let value = this.value;
      if (isEmpty(value)) return;
      if (getProp(this.$attrs, "lazy")) {
        this.text = value;
      } else if (data && data.length > 0) {
        if (this.multiple) {
          this.$refs.ref.setCheckedKeys(value);
          const list = this.$refs.ref.getCheckedNodes(
            this.leafOnly,
            this.includeHalfChecked
          );
          this.text = list.map((v) => v[this.labelKey]);
        } else {
          this.$refs.ref.setCurrentKey(value);
          let node = this.$refs.ref.getCurrentNode();
          this.text = node ? node[this.labelKey] : value;
        }
      }
    },
    handleCurrentChange(data, node) {
      if (node.disabled || this.multiple) return;
      this.text = data[this.labelKey];
      this.$emit("input", data[this.nodeKey]);
      this.$refs.select.blur();
      if (this.on.currentChange) {
        this.on.currentChange(data, node);
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      const list = this.$refs.ref.getCheckedNodes(
        this.leafOnly,
        this.includeHalfChecked
      );
      this.text = list.map((v) => v[this.labelKey]);
      const value = list.map((v) => v[this.nodeKey]);
      this.$emit("input", value);
      if (this.on.checkChange) {
        this.on.checkChange(data, checked, indeterminate);
      }
    },
    handleFilterNode(filterText, data) {
      let value = filterText.trim();
      if (value === "") return true;
      let filterNodeMethod = getProp(this.$attrs, "filterNode");
      if (filterNodeMethod) {
        return filterNodeMethod(value, data);
      } else {
        return String(data[this.labelKey]).indexOf(value) !== -1;
      }
    },
    handleClear() {
      this.text = "";
      this.$emit("input", this.multiple ? [] : "");
      this.$refs.ref.setCurrentKey(null);
      this.$refs.ref.setCheckedKeys([]);
    },
    getOptionsData(options) {
      return options;
    },
    initScroll() {
      setTimeout(() => {
        this.$nextTick(() => {
          let scrollBar = document.querySelectorAll(
            ".el-scrollbar .el-select-dropdown__wrap"
          );
          scrollBar.forEach((ele) => {
            ele.scrollTop = 0;
          });
        });
      }, 0);
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
 
<style>
.agel-tree-select .el-tag__close {
  display: none;
}

.agel-tree-select-popper .filter-item {
  padding: 0px 10px;
  margin-bottom: 10px;
}

.agel-tree-select-popper
  .el-scrollbar
  .el-scrollbar__view
  .el-select-dropdown__item {
  height: auto;
  padding: 0;
}

.agel-tree-select-popper .selected {
  font-weight: inherit;
}
</style>