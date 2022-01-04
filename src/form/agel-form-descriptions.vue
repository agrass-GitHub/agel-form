<template>
  <el-descriptions class="agel-form-descriptions" ref="elDescriptions" v-bind="$attrs" :border="border">
    <slot name="title" slot="title"></slot>
    <slot name="extra" slot="extra"></slot>
    <slot name="prepend"></slot>
    <el-descriptions-item v-for="(item,index) in agItems" v-bind="item.$descriptionsItem" label="" :key="item.prop||index">
      <render-component v-if="item.label" :render="item.label" :class="getRequiredAsteriskClass(item)" slot="label"/>
      <agel-form-item v-show="item.show" v-bind="item.$formItem" :component="item.$component" label="" label-width="0px" />
    </el-descriptions-item>
    <slot name="append"></slot>
  </el-descriptions>
</template>
 
<script>
import itemsMinxin from "../utils/itemsMixin";
import renderComponent from "./render-component";
import { getIncludeAttrs } from "../utils/utils";
import { descriptionsItemPropkeys } from "../utils/const";

export default {
  name: "agel-form-descriptions",
  mixins: [itemsMinxin],
  inheritAttrs: false,
  components: {
    renderComponent,
  },
  props: {
    value: {
      type: Object,
      require: true,
    },
    border: {
      typoe: Boolean,
      default: true,
    },
  },
  data() {
    return {
      agItemExtendKeys: descriptionsItemPropkeys,
    };
  },
  methods: {
    agItemExtendHandle(agItem, item) {
      agItem.$descriptionsItem = getIncludeAttrs(
        descriptionsItemPropkeys,
        item
      );
      return agItem;
    },
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