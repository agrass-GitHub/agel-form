(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{533:function(e,t,o){"use strict";o.r(t);var a=o(158),n={data:function(){var e=this,t=this.$createElement;return{form:{layout:"tableditor",maxHeight:"300px",data:[{name:"表单1",region:"区域1",date:"2021-1-10",delivery:!0,_view_:!0},{name:"表单2",region:"区域1",date:"2021-1-10",delivery:!0,_view_:!0},{name:"表单3",delivery:!1,_view_:!1},{name:"表单4",delivery:!0,_view_:!1},{name:"表单5",delivery:!0,_view_:!1}],items:[{label:"名称",prop:"name",required:!0,width:"100px","show-overflow-tooltip":!0,viewModel:!0,viewFormat:function(e){var o=e.value;return t("el-tag",{attrs:{"disable-transitions":!0}},[" ",o," "])}},{label:"即时配送",prop:"delivery",component:"el-switch",viewFormat:function(e){var o=e.value;return t("el-tag",{attrs:{"disable-transitions":!0}},[o?"即时配送":"延时配送"])}},Object(a.a)(Object(a.a)(Object(a.a)({component:"el-select",label:"活动区域",prop:"region",required:!0},"component","el-select"),"options",["区域1","区域2"]),"width","150px"),{label:"活动时间",prop:"date",component:"el-date-picker",width:"150px"}],on:{"selection-change":function(t){e.$message.info("已选取".concat(t.length,"条数据"))}}}}},methods:{addRow:function(e){e({name:"表单"+(this.form.data.length+1),_view_:!1})},saveRow:function(e,t){var o=this,a=t.row;setTimeout((function(){var t="区域1"==a.region;t?o.$message.success("保存成功"):o.$message.error("保存失败,活动区域需要设置区域1"),e(t)}),1500)},delRow:function(e,t){var o=this;setTimeout((function(){o.$message.success("删除成功"),e()}),1500)},validateRow:function(){var e=this;this.form.getRef("agLayout").validateRow(2,(function(){e.$message.success("验证成功")}))},getRef:function(){this.$message.success("获取组件实例成功，查看控制台"),console.log("---------- el-table 实例 ----------"),console.log(this.form.getRef("elTable"))}}},i=o(3),r=Object(i.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"demo border"},[t("agel-form",{scopedSlots:e._u([{key:"prepend",fn:function(){return[t("el-table-column",{attrs:{type:"selection",align:"center",width:50}}),e._v(" "),t("el-table-column",{attrs:{label:"序号",type:"index",align:"center",width:50}})]},proxy:!0},{key:"append",fn:function(){return[t("tableditor-menu-column",{attrs:{data:e.form.data,add:e.addRow,edit:e.saveRow,del:e.delRow,delConfirm:""}})]},proxy:!0}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}}),e._v(" "),t("div",{staticStyle:{"margin-top":"10px"}},[t("el-button",{attrs:{type:"primary"},on:{click:e.validateRow}},[e._v("验证某一行表单")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.getRef}},[e._v("获取Table组件实例")])],1)],1)}),[],!1,null,null,null);t.default=r.exports}}]);