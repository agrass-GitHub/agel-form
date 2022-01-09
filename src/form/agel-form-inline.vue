<template>
  <div class="agel-form-inline">
    <template v-for="(row,rowIndex) in dynamicData">
      <slot name="prepend" v-bind="{row,rowIndex}"></slot>
      <agel-form-item v-for="(item,colIndex) in agItems" :key="row._key_+item.prop" v-show="item.show"
        v-bind="getFormItemAttrs({item,colIndex,row,rowIndex})" :component="getComponentAttrs({item,colIndex,row,rowIndex})" />
      <slot name="append" v-bind="{row,rowIndex}"></slot>
    </template>
  </div>
</template>
 
<script>
import itemsMinxin from "../utils/itemsMixin"

export default {
  name: "agel-form-inline",
  mixins: [itemsMinxin],
  inheritAttrs: false,
}
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
