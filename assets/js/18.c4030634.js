(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{390:function(e,n,t){"use strict";t.r(n);var o=t(35),a=(t(79),{data:function(){var e,n=this,t=this.$createElement;return{form:{span:12,data:{demo0:"北京,重庆"},items:{demo0:{label:"字符串",component:"el-select",options:"北京,上海,重庆",multiple:!0},demo1:{label:"字符串数组",component:"el-select",options:["北京","上海"],multiple:!0},demo2:{label:"对象数组",component:"el-select",options:[{label:"北京",value:"Beijing",disabled:!0},{label:"上海",value:"Shanghai"}]},demo3:{label:"Promise对象",component:"el-select",options:this.$http.get("/api/getRandomData")},demo4:{label:"Function函数",component:"el-select",clearable:!0,options:(e=Object(o.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.$http.get("/api/getRandomData");case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),function(){return e.apply(this,arguments)})},button:{component:"el-button",type:"primary",slots:"刷新 options",span:24,on:{click:function(){var e=n.form.getRef("demo4");e.getOptions(),e.focus()}}},demo5:{label:"分组过滤",component:"el-select",filter:!0,clearable:!0,props:{label:"name",value:"id"},options:[{name:"热门城市",options:[{id:"Shanghai",name:"上海"},{id:"Beijing",name:"北京",disabled:!0}]},{name:"城市名",options:[{id:"Chengdu",name:"成都"},{id:"Shenzhen",name:"深圳"},{id:"Guangzhou",name:"广州"},{id:"Dalian",name:"大连"}]}]},demo6:{label:"插槽样式",component:"el-select",options:[{value:"Shanghai",label:"上海"},{value:"Beijing",label:"北京"}],slots:{option:function(e){var n=e.option;e.index;return t("div",[t("span",{style:"float: left"},[n.label]),t("span",{style:"float: right; color: #8492a6; font-size: 13px"},[n.value])])},prefix:function(){return t("i",{class:"el-icon-platform-eleme",style:"color:#409EFF;line-height:28px;font-size:20px"})}}}}}}}}),l=t(6),i=Object(l.a)(a,(function(){var e=this,n=e.$createElement;return(e._self._c||n)("agel-form",{staticClass:"demo border",model:{value:e.form,callback:function(n){e.form=n},expression:"form"}})}),[],!1,null,null,null);n.default=i.exports}}]);