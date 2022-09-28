<template>
 <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div class="agel-form-descriptions">
    <el-descriptions ref="ElDescriptions" v-bind="$attrs" :value="undefined" :border="border" v-for="(row,rowIndex) in dynamicData" :key="row._key_">
      <slot name="title" slot="title" v-bind="{row,rowIndex}"></slot>
      <slot name="extra" slot="extra" v-bind="{row,rowIndex}"></slot>
      <slot name="prepend" v-bind="{row,rowIndex}"></slot>
      <el-descriptions-item v-for="(item,colIndex) in agItems" v-if="getVif({item,colIndex,row,rowIndex})" v-bind="getLayoutItemAttrs(item)" label="" :key="item.prop">
        <render-component v-if="item.label" :render="item.label" :class="getRequiredAsteriskClass(item,rowIndex)" slot="label" />
        <agel-form-item v-show="getVshow({item,colIndex,row,rowIndex})" label="" label-width="0px" v-bind="getFormItemAttrs({item,colIndex,row,rowIndex})" :component="getComponentAttrs({item,colIndex,row,rowIndex})" />
      </el-descriptions-item>
      <slot name="append" v-bind="{row,rowIndex}"></slot>
    </el-descriptions>
  </div>
</template>

<script>
import itemsMinxin from "../utils/itemsMixin";
import renderComponent from "./render-component";
import { descriptionsItemPropkeys } from "../utils/const";

export default {
  name: "agel-form-descriptions",
  mixins: [itemsMinxin],
  inheritAttrs: false,
  components: {
    renderComponent,
  },
  props: {
    border: {
      typoe: Boolean,
      default: true,
    },
  },
  data() {
    return {
      layoutItemKeys: descriptionsItemPropkeys,
    };
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
 
<style>
.agel-form-descriptions .el-date-editor.el-input,
.agel-form-descriptions .el-date-editor.el-input__inner,
.agel-form-descriptions .el-select,
.agel-form-descriptions .el-cascader,
.agel-form-descriptions .el-input-number,
.agel-form-descriptions .el-autocomplete {
  width: 100%;
}

.agel-form-descriptions .el-form-item__content {
  line-height: inherit;
  font-size: inherit;
}
.agel-form-descriptions .el-form-item {
  margin-bottom: 0px;
}
.agel-form-descriptions .el-form-item__error {
  position: inherit;
}
.agel-form-descriptions .agel-required-label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>