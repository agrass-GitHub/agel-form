import agelForm from "agel-form";

const formConfig = {
  // 为每个表单设置 
  form: {
    labelWidth: "100px",
    span: 8,
  },
  // 设置所有上传组件的公用参数
  "el-upload": function (prop, item, form) {
    return {
      action: "/api/xxx/upload",
      headers: { token: "xxxx" },
      onSuccess: (res) => res.data
    }
  },
  // 设置日期组件的格式化 
  "el-date-picker": function (prop, item, form) {
    if (item.valueFormat == undefined) {
      if (item.type == undefined || item.type == "daterange") item.valueFormat = "yyyy-MM-dd";
      if (item.type == "datetime" || item.type == "datetimerange") item.valueFormat = "yyyy-MM-dd HH:mm:ss";
      if (item.type == "month") item.valueFormat = "yyyy-MM";
      if (item.type == "year") item.valueFormat = "yyyy";
    }
  },
}

Vue.use(agelForm, formConfig);

// use 注册组件 OR component 注册组件

Vue.prototype.$agelFormConfig = formConfig;
Vue.component('agel-form', agelForm);