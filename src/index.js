// 表单以及布局组件
import agelForm from "./agel-form.vue";
import agelFormGrid from "./layout/agel-form-grid.vue";
import agelFormInline from "./layout/agel-form-inline.vue";
import agelFormTableditor from "./layout/agel-form-tableditor.vue";
import agelFormDescriptions from "./layout/agel-form-descriptions.vue";
import agelFormItem from "./layout/agel-form-item.vue";
import tableditorMenuColumn from "./layout/tableditor-menu-column"

// 表单子组件
import agelRadio from "./lib/agel-radio.vue";
import agelCheckbox from "./lib/agel-checkbox.vue";
import agelSelect from "./lib/agel-select.vue";
import agelUpload from "./lib/agel-upload.vue";
import agelTreeSelect from "./lib/agel-tree-select.vue";
import agelText from "./lib/agel-text.js";
import agelMapInput from "./lib/agel-map-input.vue";

// 其他组件
import agelSearchPanel from "./agel-search-panel.vue";
import agelFormDialog from "./agel-form-dialog.vue";

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

agelForm.install = function (vue, opts) {
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
  agelMapInput,
  agelSearchPanel,
  agelFormDialog,
  tableditorMenuColumn,
}
