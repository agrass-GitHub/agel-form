import agelForm from "agel-form";

const formConfig = {
  // 设置所有上传组件的公用参数
  "el-upload": {
    action: "/api/xxx/upload",
    data: { token: "xxxx", id: prop, },
    onSuccess: (res) => res.data,
  },
  // 设置日期组件的格式化  ----- 可以通过函数 return 一个配置对象
  "el-date-picker": function (item) {
    if (!item.valueFormat) {
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
    }
  },

}

Vue.use(agelForm, formConfig);

// use 注册组件 OR component 注册组件

Vue.prototype.$agelFormConfig = formConfig;
Vue.component('agel-form', agelForm);