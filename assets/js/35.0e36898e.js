(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{496:function(e,t,l){"use strict";l.r(t);var n=l(35),o=l(61),a=[{label:"一级 1",value:"1",children:[{label:"二级 1-1",value:"1-1",children:[{label:"三级 1-1-1",value:"1-1-1"}]}]},{label:"一级 2",value:"2",children:[{label:"二级 2-1",value:"2-1",children:[{label:"三级 2-1-1",value:"2-1-1"}]},{label:"二级 2-2",value:"2-2",children:[{label:"三级 2-2-1",value:"2-2-1"}]}]}],r={data:function(){var e,t=this,l=this.$createElement;return{form:{labelWidth:"100px",span:12,data:{tree1:"2",tree2:"1-1-1,2-1-1",tree4:"leaf"},items:[{prop:"tree1",label:"普通树形",component:"el-tree-select",nodeKey:"value",options:a},{prop:"tree2",label:"多选树形",component:"el-tree-select",nodeKey:"value",multiple:!0,leafOnly:!0,options:a,on:{change:function(e){console.log(t.form.getRef("tree2").getValueOption(e))}}},{prop:"tree3",label:"过滤树形",component:"el-tree-select",nodeKey:"value",filter:!0,options:a},{prop:"tree4",label:"懒加载树",component:"el-tree-select",multiple:!0,nodeKey:"name",lazy:!0,props:{label:"name",children:"zones",isLeaf:"leaf"},load:function(e,t){return 0===e.level?t([{name:"region"}]):e.level>1?t([]):void setTimeout((function(){t([{name:"leaf",leaf:!0},{name:"zone"}])}),500)}},{prop:"tree5",label:"异步树形",component:"el-tree-select",nodeKey:"value",options:(e=Object(o.a)(Object(n.a)().mark((function e(){var l;return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/api/getRandomTreeData");case 2:return l=e.sent,e.abrupt("return",l);case 4:case"end":return e.stop()}}),e)}))),function(){return e.apply(this,arguments)})},{prop:"tree6",label:"自定义树形",component:"el-tree-select",nodeKey:"value",options:this.$http.get("/api/getRandomTreeData"),slots:{option:function(e){var t=e.node;e.data;return l("span",{class:"custom-tree-node"},[l("i",{class:"el-icon-eleme",style:"color:#409EFF;margin-right:5px"}),l("span",[t.label])])}}}]}}},methods:{getOptions:function(){this.form.getRef("tree5").getOptions()},getRef:function(){var e=this.form.getRef("tree1");console.log(" ------ agel-tree-select 实例------ ",e),console.log(" ------ el-tree 实例------",e.$refs.ref),console.log(" ------ el-select 实例------",e.$refs.select)},getItem:function(){console.log("items 可以是数组配置，getItem 快速获取对应对象进行修改"),console.log(this.form.getItem("tree1"))}}},s=l(3),c=Object(s.a)(r,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"demo border"},[t("agel-form",{model:{value:e.form,callback:function(t){e.form=t},expression:"form"}}),e._v(" "),t("el-button",{staticStyle:{"margin-left":"100px"},attrs:{type:"primary"},on:{click:e.getOptions}},[e._v("刷新 options")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.getRef}},[e._v("获取组件实例（查看控制台）")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.getItem}},[e._v("获取组件Item（查看控制台）")])],1)}),[],!1,null,null,null);t.default=c.exports}}]);