
import "./styles/style.css";
import "element-ui/lib/theme-chalk/index.css";
import Element from "element-ui/lib/index";

import agelForm from "../../src/index"

export default ({ Vue }) => {
  Vue.use(Element);
  Vue.use(agelForm);
  Vue.prototype.$ELEMENT = { size: 'mini' };
};
