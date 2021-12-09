<template>
  <div :class="['agel-search-panel',{'position-right':attrs.panelPosition=='right' }]">
    <agel-form v-model="form" :item-ignore-keys="['collapseAlive']">
      <template v-for="(slot,name) in $slots" v-slot:[name]>
        <slot-render v-if="name!=='button'" :render="slot" :key="name" />
      </template>
      <template v-slot:prepend>
        <slot name="prepend"></slot>
      </template>
      <template v-slot:append>
        <slot name="append"></slot>
        <el-form-item v-if="attrs.collapseButton">
          <el-button class="agel-collapse-button" circle @click="open">
            <i class="el-icon-arrow-down" :style="`transform: rotate(${attrs.collapse?0:180}deg)`"></i>
          </el-button>
        </el-form-item>
        <el-form-item v-if="attrs.searchButton!==false">
          <el-button class="agel-search-button" v-bind="attrs.searchButton" @click="emitSearch">{{attrs.searchButton.text}}</el-button>
        </el-form-item>
        <el-form-item v-if="attrs.resetButton!==false">
          <el-button class="agel-reset-button" v-bind="attrs.resetButton" @click="emitReset">{{attrs.resetButton.text}}</el-button>
        </el-form-item>
        <template v-for="(vnode,i) in $slots.button||$slots.default">
          <el-form-item :key="i" v-if="vnode.tag">
            <slot-render :render="vnode" />
          </el-form-item>
        </template>
      </template>
    </agel-form>
  </div>
</template>
 
<script>
import { getIncludeAttrs } from "./utils/utils";
import slotRender from "./lib/slot-render";

// 组件参数 props
const panelProps = function () {
  return {
    // Boolean 内联
    inline: true,
    // String 面板布局 可选 left right
    panelPosition: "left",
    // Boolean/Object 搜索按钮属性
    searchButton: {
      text: "查询",
      icon: "el-icon-search",
      type: "primary",
    },
    // Boolean/Object 初始化按钮属性
    resetButton: {
      text: "重置",
      icon: "el-icon-refresh-right",
      type: "primary",
    },
    // Boolean 是否显示展开按钮
    collapseButton: false,
    // Boolean 是否折叠搜索条件
    collapse: false,
    // Array 折叠情况下保留的搜索条件 prop
    collapseAlive: [],
  };
};

const panelPropKeys = Object.keys(panelProps());

export default {
  name: "agel-search-panel",
  components: {
    slotRender,
  },
  props: {
    form: Object,
  },
  data() {
    return {};
  },
  created() {
    this.injectProp("inline");
  },
  watch: {
    "form.collapse": {
      immediate: true,
      handler: "collapseItems",
    },
  },
  computed: {
    attrs() {
      let a = panelProps();
      let b = this.$agelFormConfig["agel-search-panel"] || {};
      let c = getIncludeAttrs(panelPropKeys, this.form);
      let searchButton = this.getButton("searchButton", a, b, c);
      let resetButton = this.getButton("resetButton", a, b, c);
      return Object.assign(a, b, c, { searchButton, resetButton });
    },
    items() {
      return Array.isArray(this.form.items)
        ? this.form.items
        : Object.keys(this.form.items).map((k) => {
            this.form.items[k].prop = k;
            return this.form.items[k];
          });
    },
    collapseAliveKeys() {
      if (this.attrs.collapseButton === false) return [];
      let keys = (this.form.collapseAlive || []).concat(
        this.items.filter((v) => v.collapseAlive).map((v) => v.prop)
      );
      if (keys.length == 0) {
        keys = this.items.filter((v, i) => i < 3).map((v) => v.prop);
      }
      return keys;
    },
  },
  methods: {
    open() {
      this.injectProp("collapse");
      this.form.collapse = !this.form.collapse;
      this.$nextTick(() => {
        this.$emit("collapse", this.form.collapse);
      });
    },
    collapseItems() {
      if (this.form.collapse === undefined) return;
      if (this.attrs.collapseButton === false) return;
      this.items.forEach((v) => {
        if (!this.collapseAliveKeys.includes(v.prop)) {
          v.hasOwnProperty("show")
            ? (v.show = !this.form.collapse)
            : this.$set(v, "show", !this.form.collapse);
        }
      });
    },
    getButton(name, ...arr) {
      let buttons = arr.map((v) => v[name]);
      let buttonAttr = Object.assign(...buttons);
      let vif = buttons.reverse().every((v) => v !== false);
      return vif ? buttonAttr : false;
    },
    emitSearch() {
      this.$emit("search");
    },
    emitReset() {
      this.form.resetFields();
      this.$emit("reset");
      this.emitSearch();
    },
    injectProp(key) {
      if (!this.form.hasOwnProperty(key)) {
        this.$set(this.form, key, this.attrs[key]);
      }
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

.agel-search-panel .agel-form {
  margin-top: 10px;
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