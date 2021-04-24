<template>
  <el-select class="agel-select" ref="ref" v-bind="$attrs" :value="value" :popperClass="popperClass" :loading="loading" :placeholder="placeholder"
    v-on='on' @input="input">
    <slot-render v-for="(render,slot) in scopedSlots" :key="slot" :slot="slot" :render="render"></slot-render>
    <div class="filter-item" v-if="!scopedSlots.default&&filter">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini" clearable></el-input>
    </div>
    <el-option class="empty-option" v-if="!scopedSlots.default&&filter && filterOptions.length==0" label="无匹配数据" value="无匹配数据" disabled> </el-option>
    <template v-if="!scopedSlots.default&&isGroup">
      <el-option-group v-for="group in filterOptions" :key="group.label" :label="group.label">
        <el-option v-for="(option) of group.options || [] " v-bind='option' :key="option.label" :label="option.label"
          :value="valueKey?option:option.value">
        </el-option>
      </el-option-group>
    </template>
    <template v-if="!scopedSlots.default&&!isGroup">
      <el-option v-for="(option) of filterOptions" v-bind='option' :key="option.label" :label="option.label" :value="valueKey?option:option.value">
      </el-option>
    </template>
  </el-select>
</template>

<script>
import formMixin from "../utils/formMixin";
import optionsMinxin from "../utils/optionsMinxin";
import { getProp } from "../utils/utils";

export default {
  name: "agel-select",
  mixins: [formMixin, optionsMinxin],
  inheritAttrs: false,
  props: {
    value: [String, Number],
    filter: Boolean,
    loadingText: {
      type: String,
      default: "加载中...",
    },
  },
  data() {
    return {
      filterText: "",
    };
  },
  computed: {
    loading() {
      return this.$attrs.loading || this.optionsLoading;
    },
    placeholder() {
      return this.loading ? this.loadingText : this.$attrs.placeholder;
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
