<template>
  <div :class="['agel-search-panel',{'position-right':attrs.panelPosition=='right' }]">
    <agel-form v-model="form" :item-ignore-keys="['collapseAlive']">
      <slot name="prepend" slot="prepend"></slot>

      <!-- 具名插槽 -->
      <template v-for="prop in slotKeys" v-slot:[prop]>
        <render-component :render="$scopedSlots[prop]" :key="prop" />
      </template>

      <template v-slot:append>
        <el-form-item v-if="attrs.collapseButton" :label-width="gutterLabelWidth" @click.native="emitCollapse">
          <slot name="collapseButton" :collapse="isCollapse">
            <el-button class="agel-collapse-button" circle>
              <i class="el-icon-arrow-down" :style="`transform: rotate(${isCollapse?0:180}deg)`"></i>
            </el-button>
          </slot>
        </el-form-item>
        <el-form-item v-if="attrs.searchButton" :label-width="attrs.collapseButton?'10px':gutterLabelWidth" @click.native="emitSearch">
          <slot name="searchButton">
            <el-button class="agel-search-button" icon="el-icon-search" type="primary">查询</el-button>
          </slot>
        </el-form-item>
        <el-form-item v-if="attrs.resetButton" :label-width="attrs.collapseButton||attrs.searchButton?'10px':gutterLabelWidth"
          @click.native="emitReset">
          <slot name="resetButton">
            <el-button class="agel-reset-button" icon="el-icon-refresh-right" type="primary">重置</el-button>
          </slot>
        </el-form-item>
        <!-- 按钮插槽 -->
        <template v-for="(vnode,i) in $slots.default">
          <el-form-item :key="i" v-if="vnode.tag">
            <render-component :render="vnode" />
          </el-form-item>
        </template>
      </template>

    </agel-form>
  </div>
</template>
 
<script>
import { getIncludeAttrs, each } from "./utils/utils";
import renderComponent from "./layout/render-component";
import { formPropKeys } from "./utils/props";

export default {
  name: "agel-search-panel",
  components: { renderComponent },
  props: {
    form: {
      type: Object,
      require: true,
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
    return {
      formSearchPanelPorps: {},
      isUsePropsByForm: false,
      isCollapse: false,
    };
  },
  created() {
    // patch formPorps 从 form 读取 props 对象，兼容 v.0.3.3 之前版本
    const compatiblePropsKeys = [
      "panelPosition",
      "searchButton",
      "resetButton",
      "collapse",
      "collapseButton",
      "collapseAlive",
    ];
    const formSearchPanelPorps = getIncludeAttrs(
      compatiblePropsKeys,
      this.form
    );
    this.isUsePropsByForm = Object.keys(formSearchPanelPorps).length > 0;
    if (this.isUsePropsByForm) {
      this.formSearchPanelPorps = { ...this.$props, ...formSearchPanelPorps };
    }
    this.isCollapse = this.formSearchPanelPorps.collapse || this.collapse;
    // end
    if (!this.form.layout) {
      this.$set(this.form, "layout", "inline");
    }
    if (this.attrs.collapseButton) {
      each(this.form.items, "forEach", (v) => {
        this.$set(v, "show", this.itemCollapseShow);
      });
    }
  },
  computed: {
    attrs() {
      return this.isUsePropsByForm ? this.formSearchPanelPorps : this.$props;
    },
    gutterLabelWidth() {
      return (this.form.gutter || 15) / 2 + "px";
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