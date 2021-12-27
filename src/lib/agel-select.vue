<template>
  <el-select class="agel-select" v-loading="optionsLoading" ref="ref" v-bind="$attrs" v-on="$listeners" :value="proxyValue" :multiple="multiple"
    :loading="isLoading" :loading-text="loadingText" :popperClass="popperClass">
    <template v-slot:prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-slot:empty>
      <slot name="empty"></slot>
    </template>
    <template v-slot:default>
      <slot name="default">
        <div class="filter-item" v-if="filter">
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini" clearable></el-input>
        </div>
        <el-option class="empty-option" v-if="filter && filterOptions.length==0" :label="filterEmptyText" :value="filterEmptyText" disabled>
        </el-option>
        <template v-if="isGroup">
          <el-option-group v-for="group in filterOptions" :key="group.label" v-bind="getGroupPorps(group)">
            <el-option v-for="(option,index) of group.options || [] " :key="option.value" v-bind="getOptionProps(option)">
              <slot name="option" :option="option" :index="index" :group="group"></slot>
            </el-option>
          </el-option-group>
        </template>
        <template v-else>
          <el-option v-for="(option,index) of filterOptions" :key="option.value" v-bind="getOptionProps(option)">
            <slot name="option" :option="option" :index="index"></slot>
          </el-option>
        </template>
      </slot>
    </template>
  </el-select>
</template>

<script>
import optionsMinxin from "../utils/optionsMinxin";
import { getProp, getIncludeAttrs } from "../utils/utils";

const optionPropsKeys = ["value", "label", "disabled", "style", "class"];

const groupPropsKyes = ["label", "disabled", "style", "class"];

export default {
  name: "agel-select",
  inheritAttrs: false,
  mixins: [optionsMinxin],
  props: {
    value: {
      type: [String, Number, Array],
      default: "",
    },
    filter: Boolean,
    loading: Boolean,
    multiple: Boolean,
    loadingText: {
      type: String,
      default: "加载中...",
    },
    noDataText: {
      type: String,
      default: "无数据",
    },
    noMatchText: {
      type: String,
      default: "无匹配数据",
    },
  },
  data() {
    return {
      filterText: "",
    };
  },
  computed: {
    isLoading() {
      return this.loading || this.optionsLoading;
    },
    popperClass() {
      let className = getProp(this.$attrs, "popperClass") || "";
      return `agel-select-popper ${className}`;
    },
    isGroup() {
      return this.proxyOptions.some((v) => {
        return Array.isArray(v.options) && v.options.length > 0;
      });
    },
    filterOptions() {
      let value = this.filterText.trim();
      return value == ""
        ? this.proxyOptions
        : this.handleFilterNode(
            JSON.parse(JSON.stringify(this.proxyOptions)),
            value
          );
    },
    filterEmptyText() {
      if (this.proxyOptions.length == 0) {
        return this.noDataText;
      } else if (this.filterOptions.length == 0) {
        return this.noMatchText;
      }
    },
  },
  methods: {
    handleFilterNode(options = [], value) {
      return options.filter((data) => {
        if (value === "") return true;
        let isMatching = String(data.label).indexOf(value) !== -1;
        if (!isMatching && this.isGroup && data.options.length > 0) {
          data.options = this.handleFilterNode(data.options, value);
          return data.options.length > 0;
        }
        return isMatching;
      });
    },
    getOptionProps(traget) {
      return getIncludeAttrs(optionPropsKeys, traget);
    },
    getGroupPorps(traget) {
      return getIncludeAttrs(groupPropsKyes, traget);
    },
    setSelected() {
      this.$refs.ref.setSelected && this.$refs.ref.setSelected();
    },
    focus() {
      this.$refs.ref.focus();
    },
    blur() {
      this.$refs.ref.blur();
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>

<style>
.agel-select .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.5);
}
.agel-select .el-loading-mask .el-loading-spinner {
  top: 0px;
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.agel-select .el-loading-spinner .circular {
  width: 20px;
  height: 20px;
}

.agel-select-popper .filter-item {
  padding: 0px 10px;
  margin-bottom: 10px;
}
.agel-select-popper .empty-option {
  text-align: center;
}

.agel-select-loading .el-select__tags .el-tag:first-child {
  margin-left: 30px;
}
</style>
