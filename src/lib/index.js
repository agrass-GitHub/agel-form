import agelRadioGroup from "./agel-radio-group.vue";
import agelCheckboxGroup from "./agel-checkbox-group.vue";
import agelSelect from "./agel-select.vue";
import agelUpload from "./agel-upload.vue";
import agelTreeSelect from "./agel-tree-select.vue";
import slotRender from "./slot-render.js";

// 基础组件 二次封装
export default {
  "agel-radio-group": agelRadioGroup,
  "agel-checkbox-group": agelCheckboxGroup,
  "agel-select": agelSelect,
  "agel-upload": agelUpload,
  "agel-tree-select": agelTreeSelect,
  "slot-render": slotRender,
};
