<template>
  <div :class="['agel-search-panel',{'position-right':form.panelPosition=='right' }]">
    <agel-form v-model="form">
      <template v-for="(slot,name) in $slots" v-slot:[name]>
        <slot-render v-if="name!=='button'" :render="slot" :key="name"></slot-render>
      </template>
      <template v-slot:append>
        <slot name="append"></slot>
        <el-form-item>
          <el-button :icon="collapse?'el-icon-arrow-up':'el-icon-arrow-down'" circle @click="open">
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="form.searchButton" type="primary" icon="el-icon-search" @click="emitSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="form.resetButton" type="primary" icon="el-icon-refresh-right" @click="emitReset">重置</el-button>
        </el-form-item>
        <el-form-item v-for="(vnode,i) in $slots.button" :key="i">
          <slot-render :render="vnode"></slot-render>
        </el-form-item>
      </template>
    </agel-form>
  </div>
</template>
 
<script>
import { extend } from "../utils/utils";
import slotRender from "./slot-render";

// todo 1 按钮属性配置 2展开功能 3 全局配置

// 组件参数 props
const panelProps = function () {
  return {
    // Boolean 内联
    inline: true,
    // String 面板布局 可选 left right
    panelPosition: "left",
    // Boolean 是否显示搜索按钮
    searchButton: true,
    // Boolean 是否显示初始化按钮
    resetButton: true,
  };
};

export default {
  name: "agel-search-panel",
  components: {
    slotRender,
  },
  props: {
    form: Object,
  },
  data() {
    return {
      collapse: false,
    };
  },
  created() {
    extend(this.form, panelProps());
  },
  methods: {
    open() {
      this.collapse = !this.collapse;
      this.form.items.forEach((v, i) => {
        if (i + 1 > this.form.panelLimit) {
          this.$set(v, "show", this.collapse);
        }
      });
    },
    emitSearch() {
      this.$emit("search");
    },
    emitReset() {
      this.form.resetFields();
      this.$emit("reset");
      this.emitSearch();
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
</style>