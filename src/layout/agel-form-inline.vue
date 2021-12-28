<template>
  <div class="agel-form-inline">
    <slot name="prepend"></slot>
    <agel-form-item v-for="item in agItems" :key="item.prop" v-show="item.show" v-model="data[item.prop]" v-bind="item.$formItem" :component="item.$component" :label="item.label" :ref="item.prop" />
    <slot name="append"></slot>
  </div>
</template>
 
<script>
import itemsMinxin from "../utils/itemsMixin";

export default {
  name: "agel-form-inline",
  mixins: [itemsMinxin],
  inheritAttrs: false,
};
</script>
 
 <style>
 
.agel-form-inline {
  display: inline-block;
}

.agel-form-inline .el-form-item {
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
}

.agel-form-inline .el-form-item__label-wrap {
  margin-left: 0px !important;
}

.agel-form-inline .el-form-item__content {
  display: inline-block;
  margin-left: 0px !important;
}
</style>
