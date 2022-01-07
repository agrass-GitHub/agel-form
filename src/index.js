// 表单以及布局组件
import agelForm from "./form/agel-form.js";
import agelFormItem from "./form/agel-form-item.vue";
import agelFormGrid from "./form/agel-form-grid.vue";
import agelFormInline from "./form/agel-form-inline.vue";
import agelFormDescriptions from "./form/agel-form-descriptions.vue";
import agelFormTableditor from "./form/agel-form-tableditor.vue";
import tableditorMenuColumn from "./form/tableditor-menu-column.vue"

// 其他组件
import agelSearchPanel from "./form/agel-search-panel.vue";
import agelFormDialog from "./form/agel-form-dialog.vue";


// 表单子组件
import agelRadio from "./lib/agel-radio.vue";
import agelCheckbox from "./lib/agel-checkbox.vue";
import agelSelect from "./lib/agel-select.vue";
import agelUpload from "./lib/agel-upload.vue";
import agelTreeSelect from "./lib/agel-tree-select.vue";
import agelText from "./lib/agel-text.js";
import agelMapInput from "./lib/agel-map-input.vue";
import agelDynamicTags from "./lib/agel-dynamic-tags.vue";


// 核心组件
const coreComponents = [
  agelForm,
  agelFormItem,
  agelFormInline,
  agelFormGrid,
  agelFormTableditor,
  agelFormDescriptions,
  agelRadio,
  agelCheckbox,
  agelSelect,
  agelTreeSelect,
  agelUpload,
  agelText,
]

agelForm.install = function (vue, opts = {}) {
  vue.prototype.$agelFormConfig = opts;
  coreComponents.forEach(component => {
    vue.component(component.name, component);
  })
}

export default agelForm;;

export {
  // 核心组件
  agelForm,
  agelFormItem,
  agelFormGrid,
  agelFormInline,
  agelFormTableditor,
  agelFormDescriptions,
  agelRadio,
  agelCheckbox,
  agelSelect,
  agelTreeSelect,
  agelUpload,
  agelText,
  // 其他组件按需引入
  agelDynamicTags,
  agelMapInput,
  agelSearchPanel,
  agelFormDialog,
  tableditorMenuColumn,
}
