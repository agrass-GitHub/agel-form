<template>
  <el-form :model="data" :class="['agel-search-panel',{'position-right':panelPosition=='right' }]" v-bind="formProps" ref="elForm">
    <agel-form-inline :value="data" :items="items" :item-extend-keys="['collapseAlive']" ref="layout">

      <slot name="prepend" slot="prepend"></slot>

      <template v-slot:append>
        <slot name="append"> </slot>
        <render-component v-if="collapseButton" :render="collapseButtonRender" :h="h" :clickEvent="emitCollapse" :collapse="isCollapse" />
        <render-component v-if="searchButton" :render="searchButtonRender" :clickEvent="emitSearch" :h="h" />
        <render-component v-if="resetButton" :render="resetButtonRender" :clickEvent="emitReset" :h="h" />
        <slot></slot>
      </template>
    </agel-form-inline>
  </el-form>
</template>
  
<script>
import { getArrItems } from "../utils/utils";
import renderComponent from "./render-component";
import { getIncludeAttrs } from "../utils/utils";
import { formPropKeys } from "../utils/const";

const searchButtonRender = function ({ h, clickEvent }) {
  return h(
    "el-button",
    {
      props: { icon: "el-icon-search", type: "primary" },
      on: { click: clickEvent },
    },
    "查询"
  );
};
const resetButtonRender = function ({ h, clickEvent }) {
  return h(
    "el-button",
    {
      props: {
        icon: "el-icon-refresh-right",
        type: "primary",
      },
      on: { click: clickEvent },
    },
    "重置"
  );
};
const collapseButtonRender = function ({ h, clickEvent, collapse }) {
  return h(
    "el-button",
    {
      class: "agel-collapse-button",
      props: { circle: true },
      on: { click: clickEvent },
    },
    [
      h("i", {
        class: "el-icon-arrow-down",
        style: `transform: rotate(${collapse ? 0 : 180}deg)`,
      }),
    ]
  );
};

export default {
  name: "agel-search-panel",
  components: { renderComponent },
  props: {
    items: {
      type: [Array, Object],
      default: () => new Array(),
    },
    data: {
      type: Object,
      default: () => new Object(),
    },
    panelPosition: {
      type: String,
      default: "left",
    },
    searchButton: {
      type: Boolean,
      default: true,
    },
    resetButton: {
      type: Boolean,
      default: true,
    },
    collapseButton: {
      type: Boolean,
      default: false,
    },
    collapseAlive: {
      type: Array,
      default: () => new Array(),
    },
    // 默认是否折叠搜索条件
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      wrapForm: this,
    };
  },
  data() {
    const config = (this.$agelFormConfig || {})["agel-search-panel"] || {};
    return {
      h: this.$createElement,
      searchButtonRender: config.searchButtonRender || searchButtonRender,
      resetButtonRender: config.resetButtonRender || resetButtonRender,
      collapseButtonRender: config.collapseButtonRender || collapseButtonRender,
      isCollapse: false,
    };
  },
  created() {
    if (this.collapseButton) {
      this.isCollapse = this.collapse;
      getArrItems(this.items).forEach((item) => {
        this.$set(item, "show", this.itemCollapseShow);
      });
    }
  },
  computed: {
    formProps() {
      return getIncludeAttrs(formPropKeys, this.$attrs);
    },
    collapseAliveKeys() {
      if (this.collapseButton === false) return [];
      let keys = [].concat(this.collapseAlive || []);
      let defaultKeys = [];
      getArrItems(this.items).forEach((item, index) => {
        if (!item.prop) return;
        index < 3 && defaultKeys.push(item.prop);
        item.collapseAlive && keys.push(item.prop);
      });
      if (keys.length == 0) keys = defaultKeys;
      return keys;
    },
  },
  methods: {
    itemCollapseShow(data, item) {
      if (this.collapseButton === false) return true;
      if (this.collapseAliveKeys.includes(item.prop)) return true;
      return !this.isCollapse;
    },
    emitCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("update:collapse", this.isCollapse);
      this.$nextTick(() => {
        this.$emit("collapse", this.isCollapse);
      });
    },
    emitSearch() {
      this.$refs.elForm.validate((is) => is && this.$emit("search"));
    },
    emitReset() {
      this.$refs.elForm.resetFields();
      this.$emit("reset");
      this.$emit("search");
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
 
<style>
.agel-search-panel {
  display: flex;
  align-items: flex-start;
  padding-left: 10px;
}

.agel-search-panel .agel-form-inline {
  margin-top: 10px;
}

.agel-search-panel .agel-form-inline > button {
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 0px;
}

.agel-search-panel .el-form-item {
  margin-bottom: 10px;
}

.agel-search-panel.position-right {
  justify-content: flex-end;
}

.agel-collapse-button i {
  transition: all 0.3s;
}
</style>