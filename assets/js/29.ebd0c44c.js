(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{444:function(e,o,t){"use strict";t.r(o);var n=t(52),l=(t(98),{data:function(){var e,o=this,t=this.$createElement;return{form:{span:12,data:{demo0:"北京,重庆"},items:[{prop:"demo0",label:"字符串",component:"el-select",options:"北京,上海,重庆",multiple:!0},{prop:"demo1",label:"字符串数组",component:"el-select",options:["北京","上海"],multiple:!0},{prop:"demo2",label:"对象数组",component:"el-select",options:[{label:"北京",value:"Beijing",disabled:!0},{label:"上海",value:"Shanghai"}]},{prop:"demo3",label:"Promise对象",component:"el-select",options:this.$http.get("/api/getRandomData")},{prop:"demo4",label:"Function函数",component:"el-select",clearable:!0,options:(e=Object(n.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.$http.get("/api/getRandomData");case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),function(){return e.apply(this,arguments)})},{prop:"button",component:"el-button",type:"primary",slots:"点击属性 options",labelWidth:"0px",span:12,on:{click:function(){var e=o.form.getRef("demo4");e.getOptions(),e.focus()}}},{prop:"demo5",label:"分组过滤",component:"el-select",filter:!0,clearable:!0,props:{label:"name",value:"id"},options:[{name:"热门城市",options:[{id:"Shanghai",name:"上海"},{id:"Beijing",name:"北京",disabled:!0}]},{name:"城市名",options:[{id:"Chengdu",name:"成都"},{id:"Shenzhen",name:"深圳"},{id:"Guangzhou",name:"广州"},{id:"Dalian",name:"大连"}]}]},{prop:"demo6",label:"插槽样式",component:"el-select",options:[{value:"Shanghai",label:"上海"},{value:"Beijing",label:"北京"}],slots:{option:function(e){var o=e.option;e.index;return t("div",[t("span",{style:"float: left"},[o.label]),t("span",{style:"float: right; color: #8492a6; font-size: 13px"},[o.value])])},prefix:function(){return t("i",{class:"el-icon-platform-eleme",style:"color:#409EFF;line-height:28px;font-size:20px"})}}},{prop:"demo7",label:"远程搜索",component:"el-select",remote:!0,filterable:!0,multiple:!0,reserveKeyword:!0,loading:!1,placeholder:"请输入1进行远程搜索",options:[],remoteMethod:function(e){var t=o.form.getItem("demo7");""!==e?(t.loading=!0,setTimeout((function(){t.options="1"==e?["1k","1w"]:[],t.loading=!1}),200)):t.options=[]}},{prop:"demo8",label:"创建条目",component:"el-select",multiple:!0,filterable:!0,allowCreate:!0,defaultFirstOption:!0,options:["HTML","CSS","JavaScript"]}]}}}}),a=t(3),i=Object(a.a)(l,(function(){var e=this,o=e.$createElement;return(e._self._c||o)("agel-form",{staticClass:"demo border",model:{value:e.form,callback:function(o){e.form=o},expression:"form"}})}),[],!1,null,null,null);o.default=i.exports}}]);