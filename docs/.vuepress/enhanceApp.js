
import "./styles/style.css";
import "element-ui/lib/theme-chalk/index.css";
import Element from "element-ui/lib/index";
import agelForm from "../../src/index"
import { agelRadio, agelCheckbox, agelSelect, agelUpload, agelTreeSelect } from "../../src/index";

const mockData = {
  random() {
    return "随机数" + Math.ceil(Math.random() * 10) + '' + Math.ceil(Math.random() * 10)
  },
  "/api/getRandomData": function () {
    return [{ label: this.random(), value: '1' }, { label: this.random(), value: '2' }, { label: this.random(), value: '3' }];
  },
  "/api/getRandomTreeData": function () {
    return [
      {
        label: this.random(),
        value: "1",
        children: [
          {
            label: this.random(),
            value: "1-1",
            children: [
              {
                label: this.random(),
                value: "1-1-1",
              },
            ],
          },
        ],
      },
      {
        label: this.random(),
        value: "2",
      },
    ]
  }
}

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
    get(url) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockData[url]());
        }, 1500);
      });
    },
  }
};
