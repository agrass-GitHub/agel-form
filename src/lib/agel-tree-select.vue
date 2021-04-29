<template>
  <el-select class="agel-tree-select" :popper-class="treePopperClass" ref="select" :value="isLoading?undefined:selectValue" :multiple="multiple"
    :disabled="disabled" :collapseTags="collapseTags" :clearable="clearable" :loading="isLoading" :placeholder="isLoading?loadingText:placeholder"
    :loading-text="loadingText" v-on="$listeners" @click.native="initScroll" @clear="handleClear">
    <div class="filter-item" v-if="filter">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini"></el-input>
    </div>
    <el-option value="" disabled>
      <el-tree ref="ref" class="tree-option" :data="treeData" :props="props" :show-checkbox="multiple" :highlight-current="!multiple"
        :node-key="nodeKey" :expand-on-click-node="false" :filter-node-method="handleFilterNode" v-bind="$attrs" v-on="$listeners"
        @current-change="handleCurrentChange" @check="handleCheck">
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
  inheritAttrs: false,
  mixins: [optionsMinxin],
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
      selectValue: this.multiple ? [] : "",
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
    treePopperClass() {
      return `agel-tree-select-popper ${this.popperClass || ""}`;
    },
    treeData() {
      return !isEmpty(this.optionsData) ? this.optionsData : this.$attrs.data;
    },
  },
  watch: {
    // 因为 leafOnly includeHalfChecked ,会动态变化去勾选下级 ，不能监听 value 属性变化
    // value(){},
    treeData() {
      setTimeout(this.selected, 0);
    },
    filterText(val) {
      this.$refs.ref.filter(val);
    },
  },
  methods: {
    handleCurrentChange(nodeData, treeNode = {}) {
      if (treeNode.disabled || this.multiple) return;
      let node = this.getValueNode();
      const treeValue = node[this.nodeKey];
      const selectValue = node[this.labelKey];
      this.selectValue = selectValue;
      this.input(treeValue);
      this.blur();
    },
    handleCheck() {
      let nodes = this.getValueNode();
      const treeValue = nodes.map((v) => v[this.nodeKey]);
      const selectValue = nodes.map((v) => v[this.labelKey]);
      this.selectValue = selectValue;
      this.input(treeValue);
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
    // 只有单选才会有清空按钮
    handleClear() {
      this.$refs.ref.setCurrentKey(null);
      this.selectValue = "";
      this.input("");
    },
    input(v) {
      this.optionsInput(v);
      this.$emit("change", v); // 需手动触发 change 事件
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
    // 暴露出去的功能函数
    // 根据 value 选中 高亮 树节点
    selected() {
      let tree = this.$refs.ref;
      if (!tree) return;
      if (isEmpty(this.optionsValue)) return;
      if (this.multiple) {
        tree.setCheckedKeys(this.optionsValue);
        this.handleCheck();
      } else {
        tree.setCurrentKey(this.optionsValue);
        this.handleCurrentChange();
      }
    },
    getValueNode() {
      let tree = this.$refs.ref;
      if (!tree) return null;
      return this.multiple
        ? tree.getCheckedNodes(this.leafOnly, this.includeHalfChecked)
        : tree.getCurrentNode();
    },
    focus() {
      this.$refs.select.focus();
    },
    blur() {
      this.$refs.select.blur();
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