
import "./styles/style.css";
import "element-ui/lib/theme-chalk/index.css";
import Element from "element-ui/lib/index";
import agelForm from "../../src/index"
import { agelRadio, agelCheckbox, agelSelect, agelUpload, agelTreeSelect } from "../../src/index";

export default ({ Vue }) => {
  Vue.use(Element, { size: 'mini' });
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
  Vue.use(agelRadio);
  Vue.use(agelCheckbox);
  Vue.use(agelSelect);
  Vue.use(agelUpload);
  Vue.use(agelTreeSelect);

  //模拟一个 http 请求
  Vue.prototype.$http = {
    get() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([Math.random(), Math.random(), Math.random()]);
        }, 1000);
      });
    },
  }
};
