<template>
  <el-select class="agel-select" ref="ref" v-bind="$attrs" v-on="$listeners" :value="proxyValue" :multiple="multiple" :loading="isLoading" :placeholder="isLoading?loadingText:placeholder" :loading-text="loadingText" :popperClass="popperClass">
    <template v-slot:prefix>
      <i v-if="isLoading" class="el-icon-loading"></i>
      <slot v-else name="prefix"></slot>
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
          <el-option-group v-for="group in filterOptions" :key="group.label" :label="group.label">
            <el-option v-for="(option,index) of group.options || [] " :key="index+option.label" :disabled="option.disabled" :label="option.label" :value="valueKey?option:option.value">
              <slot name="option" :option="option" :index="index" :group="group"></slot>
            </el-option>
          </el-option-group>
        </template>
        <template v-else>
          <el-option v-for="(option,index) of filterOptions" :key="index+option.label" :disabled="option.disabled" :label="option.label" :value="valueKey?option:option.value">
            <slot name="option" :option="option" :index="index"></slot>
          </el-option>
        </template>
      </slot>
    </template>
  </el-select>
</template>

<script>
import optionsMinxin from "../utils/optionsMinxin";
import { getProp } from "../utils/utils";

export default {
  name: "agel-select",
  inheritAttrs: false,
  mixins: [optionsMinxin],
  props: {
    value: [String, Number, Array],
    filter: Boolean,
    loading: Boolean,
    multiple: Boolean,
    placeholder: String,
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
    valueKey() {
      return getProp(this.$attrs, "valueKey");
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
    setSelected() {
      this.$refs.ref.setSelected();
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
.agel-select-popper .filter-item {
  padding: 0px 10px;
  margin-bottom: 10px;
}
.agel-select-popper .empty-option {
  text-align: center;
}
</style>
