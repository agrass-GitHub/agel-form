
import "./styles/style.css";
import "element-ui/lib/theme-chalk/index.css";
import Element from "element-ui/lib/index";
import agelForm from "../../src/index"

export default ({ Vue }) => {
  Vue.use(Element);
  Vue.use(agelForm, {
    "el-date-picker": function (prop, item, form) {
      if ((item.type == "daterange" || item.type == "datetimerange") && item.proprange) {
        let [startTimeProp, endTimeProp] = item.proprange;
        form.data[startTimeProp] = "";
        form.data[endTimeProp] = "";
        item.on = item.on || {}
        item.on.change = (value) => {
          form.data[startTimeProp] = value ? value[0] : "";
          form.data[endTimeProp] = value ? value[1] : "";
        }
      }
    }
  });
  Vue.prototype.$ELEMENT = { size: 'mini' };
};
