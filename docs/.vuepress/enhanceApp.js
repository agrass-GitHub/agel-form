
import "./styles/style.css";
import "element-ui/lib/theme-chalk/index.css";
import Element from "element-ui/lib/index";
import { agelForm, agelSearchPanel, agelRadio, agelCheckbox, agelSelect, agelUpload, agelTreeSelect } from "../../src/index";

const mockData = {
  random() {
    return "随机数" + Math.ceil(Math.random() * 100) + '' + Math.ceil(Math.random() * 100)
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
      if (item.valueFormat == undefined) {
        if (item.type == undefined || item.type == "daterange") item.valueFormat = "yyyy-MM-dd";
        if (item.type == "datetime" || item.type == "datetimerange") item.valueFormat = "yyyy-MM-dd HH:mm:ss";
        if (item.type == "month") item.valueFormat = "yyyy-MM";
        if (item.type == "year") item.valueFormat = "yyyy";
      }

      if (item.type == "daterange" || item.type == "datetimerange") {
        item.unlinkPanels = true;
      }
    }
  });
  Vue.use(agelRadio);
  Vue.use(agelCheckbox);
  Vue.use(agelSelect);
  Vue.use(agelUpload);
  Vue.use(agelTreeSelect);
  Vue.use(agelSearchPanel);

  //模拟一个 http 请求
  Vue.prototype.$http = {
    get(url) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let data = mockData[url]();
          console.log('模拟请求数据', data);
          resolve(data);
        }, 1500);
      });
    },
  }
};
