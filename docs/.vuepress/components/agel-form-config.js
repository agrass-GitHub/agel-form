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

    // 提供一个小 tip 
    // 当使用日期范围模式时，经常需要在调用接口的时候手动将数组date转换为开始/结束日期两个字段
    // 使用如下配置，可以当变化时将自动关联上开始日期，结束日期两个字段
    // proprange:['startTime','endTime']
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
}

Vue.use(agelForm, config);

// or

Vue.prototype.$agelFormConfig = config;
Vue.component('agel-form', agelForm);