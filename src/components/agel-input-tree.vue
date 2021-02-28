<template>
  <el-select class="agel-input-tree" :popper-class="treePopperClass" ref="select" :value="text" :multiple="multiple" :placeholder="placeholder"
    :disabled="disabled" :collapseTags="collapseTags" :clearable="clearable" v-on='on' @click.native="initScroll" @clear="handleClear">
    <div class="filter-item" v-if="filter">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini"></el-input>
    </div>
    <el-option value="tree-option-value">
      <el-tree ref="tree" class="tree-option" :highlight-current="!multiple" :expand-on-click-node="false" :filter-node-method="handleFilterNode"
        v-bind="$attrs" v-on='on' @current-change="handleCurrentChange" @check-change="handleCheckChange">
      </el-tree>
    </el-option>
  </el-select>
</template>
 
<script>
import formMixin from "./formMixin";
export default {
  name: "agel-input-tree",
  mixins: [formMixin],
  inheritAttrs: false,
  props: {
    placeholder: String,
    disabled: Boolean,
    collapseTags: Boolean,
    filter: Boolean,
    clearable: Boolean,
    popperClass: String,
  },
  data() {
    return {
      text: "",
      filterText: "",
    };
  },
  computed: {
    multiple() {
      return this.$attrs.showCheckbox;
    },
    nodeKey() {
      return this.$attrs.nodeKey;
    },
    labelKey() {
      return this.$refs.tree.props.label;
    },
    treePopperClass() {
      return `agel-input-tree-popper ${this.popperClass}`;
    },
  },
  watch: {
    value() {
      this.selectedTree();
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.selectedTree();
  },
  methods: {
    selectedTree() {
      let data = this.$attrs.data;
      if (this.value === undefined) return;
      if (data && data.length > 0) {
        if (this.multiple) {
          this.$refs.tree.setCheckedKeys(this.value);
        } else {
          this.$refs.tree.setCurrentKey(this.value);
          let node = this.$refs.tree.getCurrentNode();
          this.text = node ? node[this.labelKey] : this.value;
        }
      } else if (this.$attrs.lazy) {
        this.text = this.value;
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
      const list = this.$refs.tree.getCheckedNodes();
      const value = list.map((v) => v[this.nodeKey]);
      this.text = list.map((v) => v[this.labelKey]);
      this.$emit("input", value);
      if (this.on.checkChange) {
        this.on.checkChange(data, checked, indeterminate);
      }
    },
    handleFilterNode(value, data) {
      if (!value) return true;
      if (this.$attrs.filterNode) {
        return this.$attrs.filterNode(value, data);
      } else {
        return String(data[this.labelKey]).indexOf(value) !== -1;
      }
    },
    handleClear() {
      this.text = "";
      this.$emit("input", this.multiple ? [] : "");
      this.$refs.tree.setCurrentKey(null);
      this.$refs.tree.setCheckedKeys([]);
    },
    initScroll(event) {
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
 
<style lang="scss" >
.agel-input-tree {
  .el-tag__close {
    display: none;
  }
}

.agel-input-tree-popper {
  .filter-item {
    padding: 0px 10px;
    margin-bottom: 10px;
  }
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
    height: auto;
    padding: 0;
  }
  .selected {
    font-weight: inherit;
  }
}
</style>