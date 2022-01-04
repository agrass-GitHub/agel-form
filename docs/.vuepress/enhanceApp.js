
import "./styles/style.css";
import "element-ui/lib/theme-chalk/index.css";
import Element from "element-ui/lib/index";


import { agelForm, agelSearchPanel, agelFormDialog, tableditorMenuColumn, agelMapInput, agelDynamicTags } from "../../src/index";


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
    "el-input": {
      clearable: true,
      defaultValue: "123",
    },
    "xx-array-input": function () {
      return { defaultValue: [] }
    },
    "el-date-picker": function (item) {
      if (item.type == undefined || item.type == 'date' || item.type == "daterange") {
        return { valueFormat: "yyyy-MM-dd" }
      }
      if (item.type == "datetime" || item.type == "datetimerange") {
        return { valueFormat: "yyyy-MM-dd HH:mm:ss" }
      }
      if (item.type == "month" || item.type == "monthrange") {
        return { valueFormat: "yyyy-MM" }
      }
      if (item.type == "year") {
        return { valueFormat: "yyyy" }
      }
    },
  });


  Vue.component(agelSearchPanel.name, agelSearchPanel);
  Vue.component(agelFormDialog.name, agelFormDialog);
  Vue.component(agelMapInput.name, agelMapInput);
  Vue.component(tableditorMenuColumn.name, tableditorMenuColumn)
  Vue.component(agelDynamicTags.name, agelDynamicTags)

  Vue.prototype.$AMapKey = "56f6a360f541889552ce0aea6469a3e3";

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
