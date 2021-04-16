<template>
  <el-select class="agel-tree-select" :popper-class="treePopperClass" ref="select" :value="text" :multiple="multiple" :placeholder="placeholder"
    :disabled="disabled" :collapseTags="collapseTags" :clearable="clearable" v-on='on' @click.native="initScroll" @clear="handleClear">
    <div class="filter-item" v-if="filter">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini"></el-input>
    </div>
    <el-option value="tree-option-value">
      <el-tree ref="ref" class="tree-option" :show-checkbox="multiple" :highlight-current="!multiple" :node-key="nodeKey"
        :expand-on-click-node="false" :filter-node-method="handleFilterNode" v-bind="$attrs" v-on='on' @current-change="handleCurrentChange"
        @check-change="handleCheckChange">
      </el-tree>
    </el-option>
  </el-select>
</template>
 
<script>
import formMixin from "./formMixin";
export default {
  name: "agel-tree-select",
  mixins: [formMixin],
  inheritAttrs: false,
  props: {
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    multiple: Boolean,
    collapseTags: Boolean,
    filter: Boolean,
    popperClass: String,
    leafOnly: Boolean,
    includeHalfChecked: Boolean,
  },
  data() {
    return {
      text: "",
      filterText: "",
    };
  },
  computed: {
    labelKey() {
      let props = this.$attrs.props || {};
      return props.label || "label";
    },
    nodeKey() {
      return this.$attrs.nodeKey || this.labelKey;
    },
    treePopperClass() {
      return `agel-tree-select-popper ${this.popperClass || ""}`;
    },
  },
  watch: {
    value() {
      this.selectedTree();
    },
    filterText(val) {
      this.$refs.ref.filter(val);
    },
  },
  mounted() {
    this.selectedTree();
  },
  methods: {
    selectedTree() {
      let data = this.$attrs.data;
      let value = this.value;
      if (value === undefined || value == "") return;
      if (data && data.length > 0) {
        if (this.multiple) {
          this.$refs.ref.setCheckedKeys(value);
        } else {
          this.$refs.ref.setCurrentKey(value);
          let node = this.$refs.ref.getCurrentNode();
          this.text = node ? node[this.labelKey] : value;
        }
      } else if (this.$attrs.lazy) {
        this.text = value;
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
      const value = list.map((v) => v[this.nodeKey]);
      this.text = list.map((v) => v[this.labelKey]);
      this.$emit("input", value);
      if (this.on.checkChange) {
        this.on.checkChange(data, checked, indeterminate);
      }
    },
    handleFilterNode(filterText, data) {
      let value = filterText.trim();
      if (value === "") return true;
      if (this.$attrs.filterNode) {
        return this.$attrs.filterNode(value, data);
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