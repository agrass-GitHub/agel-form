// import agelRadio from "./agel-radio.vue";
// import agelCheckbox from "./agel-checkbox.vue";
// import agelSelect from "./agel-select.vue";
// import agelUpload from "./agel-upload.vue";
// import agelTreeSelect from "./agel-tree-select.vue";
// import agelText from "./agel-text.js";
// import slotRender from "./slot-render.js";


// // 基础封装组件
// export default {
//   [agelRadio.name]: agelRadio,
//   [agelCheckbox.name]: agelCheckbox,
//   [agelSelect.name]: agelSelect,
//   [agelUpload.name]: agelUpload,
//   [agelTreeSelect.name]: agelTreeSelect,
//   [agelText.name]: agelText,
//   [slotRender.name]: slotRender,
// }


export default {
  "agel-radio": () => import('./agel-radio'),
  "agel-checkbox": () => import('./agel-checkbox'),
  "agel-select": () => import('./agel-select'),
  "agel-upload": () => import('./agel-upload'),
  "agel-tree-select": () => import('./agel-tree-select'),
  "agel-text": () => import('./agel-text'),
  "slot-render": () => import('./slot-render'),
};
