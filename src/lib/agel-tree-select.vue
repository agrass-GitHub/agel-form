<template>
  <el-select class="agel-tree-select" :popper-class="treePopperClass" ref="select" :value="selectValue" :multiple="multiple" :disabled="disabled" :collapseTags="collapseTags" :clearable="clearable" :loading="isLoading" :placeholder="isLoading?loadingText:placeholder" :loading-text="loadingText" v-on="$listeners" @click.native="initScroll" @clear="handleClear">
    <template v-slot:prefix>
      <i v-if="isLoading" class="el-icon-loading"></i>
      <slot v-else name="prefix"></slot>
    </template>
    <div class="filter-item" v-if="filter">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini"></el-input>
    </div>
    <el-option value="" disabled>
      <el-tree ref="ref" class="tree-option" :data="treeData" :props="props" :show-checkbox="multiple" :highlight-current="!multiple" :node-key="nodeKey" :expand-on-click-node="false" :filter-node-method="handleFilterNode" v-bind="$attrs" v-on="$listeners" @current-change="handleCurrentChange" @check="handleCheck">
        <slot name="option" slot-scope="scope" v-bind="scope">
          <span class="el-tree-node__label">{{scope.node.label}}</span>
        </slot>
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
    props: Object, // 使用 el-tree 的 props 解析， 覆盖 optionsMinxin 默认函数
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
      inputting: false,
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
      return !isEmpty(this.proxyOptions)
        ? this.proxyOptions
        : this.$attrs.data || [];
    },
  },
  watch: {
    filterText(val) {
      this.$refs.ref.filter(val);
    },
    proxyValue() {
      if (this.inputting) return;
      this.setSelected();
    },
  },
  mounted() {
    this.setSelected();
  },
  methods: {
    handleCurrentChange(nodeData, treeNode = {}) {
      if (treeNode.disabled || this.multiple) return;
      let node = this.getValueOption();
      let is = isEmpty(node);
      const treeValue = is ? this.value : node[this.nodeKey];
      const selectValue = is ? this.value : node[this.labelKey];
      this.selectValue = selectValue;
      this.input(treeValue);
      this.blur();
    },
    handleCheck() {
      let nodes = this.getValueOption();
      // if (isEmpty(nodes)) return;
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
    handleClear() {
      let tree = this.$refs.ref;
      if (this.multiple) {
        let nodes = this.getValueOption();
        nodes.forEach((node) => tree.setChecked(node, false));
        this.selectValue = "";
        this.input([]);
      } else {
        tree.setCurrentKey(null);
        this.selectValue = "";
        this.input("");
      }
    },
    // 代理掉 el-select 的 input 事件
    input(v) {
      if (v == this.value) return;
      this.proxyInput(v);
      this.$emit("change", v); // 需手动触发 change 事件
      this.inputting = true;
      this.$nextTick(() => {
        this.inputting = false;
      });
    },
    initScroll() {
      let classname =
        ".agel-tree-select-popper .el-scrollbar .el-select-dropdown__wrap";
      setTimeout(() => {
        this.$nextTick(() => {
          document
            .querySelectorAll(classname)
            .forEach((el) => (el.scrollTop = 0));
        });
      }, 0);
    },
    // 使用 el-tree 的 props 解析， 覆盖 optionsMinxin 默认函数
    transformOptions(options) {
      return options;
    },
    // 暴露出去的功能函数
    // 根据 value 选中 高亮 树节点
    setSelected() {
      let tree = this.$refs.ref;
      if (!tree || this.treeData.length == 0) return;
      if (isEmpty(this.proxyValue)) {
        this.handleClear();
      } else if (this.multiple) {
        tree.setCheckedKeys(this.proxyValue);
        this.handleCheck();
      } else {
        tree.setCurrentKey(this.proxyValue);
        this.handleCurrentChange();
      }
    },
    getValueOption() {
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