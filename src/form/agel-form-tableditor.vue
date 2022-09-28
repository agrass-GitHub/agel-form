<template>
 <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <el-table class="agel-form-tableditor" ref="elTable" :value="undefined" :data="dynamicData" v-bind="$attrs" :border="border" v-on="$listeners">
    <slot name="prepend"></slot>
    <el-table-column v-for="(item,colIndex) in agItems" v-if="getVif({item,colIndex})" v-bind="getLayoutItemAttrs(item)" label="" :key="item.prop">
      <template v-slot:header="scope">
        <render-component v-if="item.label" :render="item.label" :class="getRequiredAsteriskClass(item,scope.$index)" slot="header" />
      </template>
      <template v-slot:default="scope">
        <agel-form-item  v-show="getVshow({item,colIndex,row:scope.row,rowIndex:scope.$index})" label="" label-width="0px" :key="scope.row._key_" v-bind="getFormItemAttrs({item,colIndex,row:scope.row,rowIndex:scope.$index})" :component="getComponentAttrs({item,colIndex,row:scope.row,rowIndex:scope.$index})" />
      </template>
    </el-table-column>
    <slot name="append"></slot>
  </el-table>
</template>
 
<script>
import itemsMinxin from "../utils/itemsMixin";
import renderComponent from "./render-component";
import { tableColumnPropKeys } from "../utils/const";

export default {
  name: "agel-form-tableditor",
  mixins: [itemsMinxin],
  inheritAttrs: false,
  components: {
    renderComponent,
  },
  props: {
    border: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      tableditor: this,
    };
  },
  data() {
    return {
      layoutItemKeys: tableColumnPropKeys,
    };
  },
  methods: {
    validateRow(index, callback) {
      let props = this.agItems.map((v) => this.getFormItemProp(v, index));
      let ok = true;
      this.elForm.validateField(props, (errMsg) => {
        if (errMsg) ok = false;
      });
      ok && callback && callback();
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>

<style>
.agel-form-tableditor .el-date-editor.el-input,
.agel-form-tableditor .el-date-editor.el-input__inner,
.agel-form-tableditor .el-select,
.agel-form-tableditor .el-cascader,
.agel-form-tableditor .el-input-number,
.agel-form-tableditor .el-autocomplete {
  width: 100%;
}

.agel-form-tableditor .el-form-item {
  margin-bottom: 0px;
}
.agel-form-tableditor .el-form-item__error {
  position: inherit;
}
.agel-form-tableditor .agel-required-label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
 
