import agelForm from "agel-form";
import { agelSearchPanel } from "agel-form";

const formConfig = {
  "agel-search-panel": {
    panelPosition: "right",
    searchButton: {
      text: "搜索",
      type: "primary",
      icon: "el-icon-search"
    },
    resetButton: {
      text: "初始化",
      icon: "el-icon-refresh-right",
      type: "primary",
    }
  }
}

Vue.use(agelForm, formConfig);
Vue.use(agelSearchPanel);