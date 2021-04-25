<template>
  <el-select class="agel-select" ref="ref" v-bind="$attrs" v-on="$listeners" :value="isLoading?undefined:value" :loading="isLoading"
    :placeholder="isLoading?loadingText:placeholder" :loading-text="loadingText" :popperClass="popperClass">
    <template v-slot:prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-slot:empty>
      <slot name="empty"></slot>
    </template>
    <template v-slot:default v-if="$slots.defaul">
      <slot name="default"></slot>
    </template>
    <template v-else>
      <div class="filter-item" v-if="filter">
        <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini" clearable></el-input>
      </div>
      <el-option class="empty-option" v-if="filter && filterOptions.length==0" :label="filterEmptyText" :value="filterEmptyText" disabled>
      </el-option>
      <template v-if="isGroup">
        <el-option-group v-for="group in filterOptions" :key="group.label" :label="group.label">
          <el-option v-for="(option,index) of group.options || [] " v-bind='option' :key="option.label" :label="option.label"
            :value="valueKey?option:option.value">
            <slot name="option" :option="option" :index="index" :group="group"></slot>
          </el-option>
        </el-option-group>
      </template>
      <template v-else>
        <el-option v-for="(option,index) of filterOptions" v-bind='option' :key="option.label" :label="option.label"
          :value="valueKey?option:option.value">
          <slot name="option" :option="option" :index="index"></slot>
        </el-option>
      </template>
    </template>
  </el-select>
</template>

<script>
import optionsMinxin from "../utils/optionsMinxin";
import { getProp } from "../utils/utils";

export default {
  name: "agel-select",
  mixins: [optionsMinxin],
  inheritAttrs: false,
  props: {
    value: [String, Number, Array],
    filter: Boolean,
    loading: Boolean,
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
      return this.optionsData.some((v) => {
        return Array.isArray(v.options) && v.options.length > 0;
      });
    },
    filterOptions() {
      let jsonArr = JSON.parse(JSON.stringify(this.optionsData));
      return this.handleFilterNode(jsonArr);
    },
    filterEmptyText() {
      if (this.optionsData.length == 0) {
        return this.noDataText;
      } else if (this.filterOptions.length == 0) {
        return this.noMatchText;
      }
    },
  },
  methods: {
    getOptionByProps(optione) {
      let props = this.props;
      return {
        ...optione,
        label: optione[props.label],
        value: optione[props.value],
        options: this.getOptionsData(optione.options || []),
      };
    },
    handleFilterNode(options = []) {
      let value = this.filterText.trim();
      return options.filter((data) => {
        if (value === "") return true;
        let options = data.options;
        if (this.isGroup && options) {
          data.options = this.handleFilterNode(options);
          return data.options.length > 0;
        } else {
          return String(data.label).indexOf(value) !== -1;
        }
      });
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
