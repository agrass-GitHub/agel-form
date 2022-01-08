<template>
  <el-table class="agel-form-tableditor" ref="elTable" :value="undefined" :data="tableData" v-bind="$attrs" :border="border" v-on="$listeners">
    <slot name="prepend"></slot>
    <el-table-column v-for="(item,index) in agItems" v-bind="item.$tableColumn" label="" :key="item.prop||index">

      <render-component v-if="item.label" :render="item.label" :class="getRequiredAsteriskClass(item)" slot="header" />

      <template v-slot:default="scope">
        <agel-form-item v-if="scope.row._edit_!==false" v-show="item.show" v-bind="getFormItemHandle(item,scope)"
          :component="getComponentHandle(item,scope)" label="" label-width="0px" :key="scope.row._key_" />
        <render-component v-else :render="getColumnSlot(item,scope)" />
      </template>

    </el-table-column>
    <slot name="append"></slot>
  </el-table>
</template>
 
<script>
import itemsMinxin from "../utils/itemsMixin"
import renderComponent from "./render-component"
import { getIncludeAttrs, guid } from "../utils/utils"
import { tableColumnPropsKeys } from "../utils/const"

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
    }
  },
  data() {
    return {
      agItemExtendKeys: tableColumnPropsKeys,
    }
  },
  computed: {
    tableData() {
      return this.elForm && this.elForm.model && this.modelProp
        ? this.elForm.model[this.modelProp]
        : []
    },
  },
  watch: {
    tableData() {
      this.tableData.forEach((row) => {
        if (row._edit_ == undefined) this.$set(row, "_edit_", true)
        if (row._key_ == undefined) row._key_ = guid()
      })
    },
  },
  methods: {
    agItemExtendHandle(agItem, item) {
      agItem.$tableColumn = getIncludeAttrs(tableColumnPropsKeys, item)
      return agItem
    },
    getComponentHandle(agItem, slotProps) {
      let component = Object.assign({}, agItem.$component)
      if (agItem.slot && typeof component.name == "function") {
        component.attrs = slotProps
      }
      return component
    },
    getFormItemHandle(agItem, slotProps) {
      let formItem = Object.assign({}, agItem.$formItem)
      formItem.prop = this.getFormItemProp(agItem, slotProps.$index)
      return formItem
    },
    getFormItemProp(agItem, index) {
      return this.modelProp
        ? `${this.modelProp}.${index}.${agItem.prop}`
        : agItem.prop
    },
    getColumnSlot(agItem, slotProps) {
      const cellValue = slotProps.row[agItem.prop]
      return agItem.$tableColumn.formatter
        ? agItem.$tableColumn.formatter(
            slotProps.row,
            slotProps.column,
            cellValue,
            slotProps.$index
          )
        : cellValue || ""
    },
    validateRow(index, callback) {
      let props = this.agItems.map((v) => this.getFormItemProp(v, index))
      let ok = true
      this.elForm.validateField(props, (errMsg) => {
        if (errMsg) ok = false
      })
      ok && callback && callback()
    },
  },
  install(vue) {
    vue.component(this.name, this)
  },
}
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
 
