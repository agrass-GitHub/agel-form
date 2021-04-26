<template>
  <el-select class="agel-tree-select" :popper-class="treePopperClass" ref="select" :value="isLoading?undefined:text" :multiple="multiple"
    :disabled="disabled" :collapseTags="collapseTags" :clearable="clearable" :loading="isLoading" :placeholder="isLoading?loadingText:placeholder"
    :loading-text="loadingText" v-on="$listeners" @click.native="initScroll" @clear="handleClear">
    <div class="filter-item" v-if="filter">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini"></el-input>
    </div>
    <el-option value="" disabled>
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
    filter: Boolean,
    leafOnly: Boolean,
    includeHalfChecked: Boolean,
    props: Object, // 覆盖 optionsMinxin 的默认 props
    multiple: Boolean,
    placeholder: String,
    disabled: Boolean,
    loading: Boolean,
    clearable: Boolean,
    collapseTags: Boolean,
    popperClass: String,
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
    isLazy() {
      return this.$attrs.lazy == true || this.$attrs.lazy == "";
    },
    isLoading() {
      return this.loading || this.optionsLoading;
    },
    labelKey() {
      let props = this.props || {};
      return props.label || "label";
    },
    nodeKey() {
      return this.isLazy
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
      if (data && data.length > 0) {
        if (this.multiple) {
          this.$refs.ref.setCheckedKeys(value);
          this.text = this.getValueNode().map((v) => v[this.labelKey]);
        } else {
          this.$refs.ref.setCurrentKey(value);
          this.text = this.getValueNode()[this.labelKey];
        }
      } else if (this.isLazy) {
        this.text = value;
      }
    },
    handleCurrentChange(data, node) {
      if (node.disabled || this.multiple) return;
      this.text = this.getValueNode()[this.labelKey];
      this.input(data[this.nodeKey]);
      this.blur();
    },
    handleCheckChange() {
      const list = this.getValueNode();
      this.text = list.map((v) => v[this.labelKey]);
      const value = list.map((v) => v[this.nodeKey]);
      this.input(value);
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
      this.input(this.multiple ? [] : "");
      this.$refs.ref.setCurrentKey(null);
      this.$refs.ref.setCheckedKeys([]);
    },
    focus() {
      this.$refs.select.focus();
    },
    blur() {
      this.$refs.select.blur();
    },
    input(v) {
      this.$emit("input", v);
      this.$emit("change", v); // 需手动触发 change 事件
    },
    getValueNode() {
      if (this.multiple) {
        return this.$refs.ref.getCheckedNodes(
          this.leafOnly,
          this.includeHalfChecked
        );
      } else {
        return this.$refs.ref.getCurrentNode();
      }
    },
    initScroll() {
      setTimeout(() => {
        this.$nextTick(() => {
          document
            .querySelectorAll(
              ".agel-tree-select-popper .el-scrollbar .el-select-dropdown__wrap"
            )
            .forEach((el) => (el.scrollTop = 0));
        });
      }, 0);
    },
    // 覆盖 options mixin 默认函数
    getOptionsData(options) {
      return options;
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