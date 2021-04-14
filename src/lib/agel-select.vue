<template>
  <el-select ref="ref" class="agel-select" v-bind="$attrs" :value="value" :popperClass="popperClass" v-on='on' @input="input">
    <slot-render v-for="(componentSlot,name) in slots" :key="name" :slot="name" :render="componentSlot">
    </slot-render>
    <div class="filter-item" v-if="!slots.default&&filter">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini" clearable></el-input>
    </div>
    <el-option v-if="!slots.default&&filter && filterOptions.length==0" label="暂无数据" value="暂无数据" disabled> </el-option>
    <template v-if="!slots.default&&isGroup">
      <el-option-group v-for="group in filterOptions" :key="group[props.label]" :label="group[props.label]">
        <el-option v-for="(option) of group[props.options] || [] " v-bind='option' :key="option[props.label]" :label="option[props.label]"
          :value="valueKey?option:option[props.value]">
        </el-option>
      </el-option-group>
    </template>
    <template v-if="!slots.default&&!isGroup">
      <el-option v-for="(option) of filterOptions" v-bind='option' :key="option[props.label]" :label="option[props.label]"
        :value="valueKey?option:option[props.value]">
      </el-option>
    </template>
  </el-select>
</template>

<script>
import formMixin from "./formMixin";
export default {
  name: "agel-select",
  mixins: [formMixin],
  inheritAttrs: false,
  props: {
    filter: Boolean,
    options: {
      type: Array,
      default: () => new Array(),
    },
    props: {
      type: Object,
      default: () => {
        return { label: "label", value: "value", options: "options" };
      },
    },
  },
  data() {
    return {
      filterText: "",
    };
  },
  computed: {
    valueKey() {
      return this.$attrs.valueKey || this.$attrs["value-key"];
    },
    isGroup() {
      return this.options.some((v) => {
        let options = v[this.props.options];
        return options && Array.isArray(options);
      });
    },
    popperClass() {
      let className =
        this.$attrs.popperClass || this.$attrs["popper-class"] || "";
      return `agel-select-popper ${className}`;
    },
    filterOptions() {
      return this.handleFilterNode(JSON.parse(JSON.stringify(this.options)));
    },
  },
  methods: {
    handleFilterNode(options = []) {
      return options.filter((data) => {
        let value = this.filterText.trim();
        if (value === "") return true;
        let key = this.props.options;
        let options = data[key];
        if (this.isGroup && options) {
          data[key] = this.handleFilterNode(options);
          return data[key].length > 0;
        } else {
          return String(data[this.props.label]).indexOf(value) !== -1;
        }
      });
    },
  },
};
</script>

<style>
.agel-select-popper .filter-item {
  padding: 0px 10px;
  margin-bottom: 10px;
}
</style>
