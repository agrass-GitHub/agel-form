import agelForm from "agel-form";

const config = {
  form: {
    labelWidth: "100px",
    span: 8,
    xs: 24,
  },
  "el-upload": function (prop, item, form) {
    // 为 upload 设置全局上传参数
    item.headers = { "blade-auth": "Bearer " + store.state.user.userInfo.accessToken };
    if (item.action == undefined) item.action = "/api/xxx/upload";
    if (item.onSuccess == undefined) item.onSuccess = (res) => res;
  },
  "el-date-picker": function (prop, item, form) {
    // 为 date-picker 设置全局 valueFormat 格式化属性
    if (item.valueFormat == undefined) {
      if (item.type == undefined || item.type == "daterange") item.valueFormat = "yyyy-MM-dd";
      if (item.type == "datetime" || item.type == "datetimerange") item.valueFormat = "yyyy-MM-dd HH:mm:ss";
      if (item.type == "month") item.valueFormat = "yyyy-MM";
      if (item.type == "year") item.valueFormat = "yyyy";
    }
  }
}

Vue.use(agelForm, config);

// or

Vue.prototype.$agelFormConfig = config;
Vue.component('agel-form', agelForm);