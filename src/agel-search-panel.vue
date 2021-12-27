<template>
  <div :class="['agel-search-panel',{'position-right':attrs.panelPosition=='right' }]">
    <agel-form v-model="form" :item-extend-keys="['collapseAlive']">
      <slot name="prepend" slot="prepend"></slot>

      <template v-for="prop in slotKeys" v-slot:[prop]>
        <slot :name="prop" />
      </template>

      <template v-slot:append>
        <slot name="append"> </slot>
        <render-component v-if="attrs.collapseButton" :render="collapseButtonRender" :h="h" :clickEvent="emitCollapse" :collapse="isCollapse" />
        <render-component v-if="attrs.searchButton" :render="searchButtonRender" :clickEvent="emitSearch" :h="h" />
        <render-component v-if="attrs.resetButton" :render="resetButtonRender" :clickEvent="emitReset" :h="h" />
        <slot></slot>
      </template>
    </agel-form>
  </div>
</template>
 
<script>
import { getIncludeAttrs, each } from "./utils/utils";
import renderComponent from "./layout/render-component";

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
    form: {
      type: Object,
      required: true,
      default: () => {
        return {
          data: {},
          items: [],
        };
      },
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
      default: false,
    },
  },
  data() {
    const config = this.$agelFormConfig["agel-search-panel"] || {};
    return {
      h: this.$createElement,
      searchButtonRender: config.searchButtonRender || searchButtonRender,
      resetButtonRender: config.resetButtonRender || resetButtonRender,
      collapseButtonRender: config.collapseButtonRender || collapseButtonRender,
      useFormPorps: null,
      isCollapse: false,
    };
  },
  created() {
    // patch  从 form 对象读取 props 对象，为了兼容 v.0.3.3 之前版本
    const compatiblePropsKeys = [
      "panelPosition",
      "searchButton",
      "resetButton",
      "collapse",
      "collapseButton",
      "collapseAlive",
    ];
    const useFormPorps = getIncludeAttrs(compatiblePropsKeys, this.form);
    if (Object.keys(useFormPorps).length > 0) {
      this.useFormPorps = { ...this.$props, ...useFormPorps };
    }
    this.isCollapse = useFormPorps.collapse || this.collapse;
    // patch end
    this.$set(this.form, "layout", "inline");
    if (this.attrs.collapseButton) {
      each(this.form.items, "forEach", (v) =>
        this.$set(v, "show", this.itemCollapseShow)
      );
    }
  },
  computed: {
    attrs() {
      return this.useFormPorps ? this.useFormPorps : this.$props;
    },
    collapseAliveKeys() {
      if (this.attrs.collapseButton === false) return [];
      let keys = [].concat(this.attrs.collapseAlive || []);
      each(this.form.items, "forEach", (v, i, k) => {
        v.collapseAlive && keys.push(v.prop || k);
      });
      if (keys.length == 0) {
        each(this.form.items, "forEach", (v, i, k) => {
          i < 3 && keys.push(v.prop || k);
        });
      }
      return keys;
    },
    slotKeys() {
      let keys = [];
      each(this.form.items, "forEach", (v, i, k) => {
        v.slot && keys.push(v.prop || k);
      });
      return keys;
    },
  },
  methods: {
    itemCollapseShow(data, item) {
      if (this.attrs.collapseButton === false) return true;
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
      this.form.validate(() => {
        this.$emit("search");
      });
    },
    emitReset() {
      this.form.resetFields();
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