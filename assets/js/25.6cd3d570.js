(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{435:function(o,t,e){"use strict";e.r(t);var a={data:function(){return{show:!1,form:{show:!1,loading:!1,span:20,data:{},items:[{label:"活动名称",prop:"name",required:!0},{label:"建议反馈",prop:"desc",type:"textarea"}]},form2:{span:20,data:{},items:[{label:"活动名称",prop:"name",required:!0},{label:"建议反馈",prop:"desc",type:"textarea"}]}}},methods:{toAdd:function(){this.form.data={},this.form.data2={},this.form.show=!0},toEdit:function(){this.form.data={name:"使用 agel-form",desc:"个人开发bababab"},this.form2.data={name:"使用 agel-form",desc:"个人开发bababab"},this.form.show=!0},submit:function(){var o=this;this.form.loading=!0,setTimeout((function(){o.$message.info("操作成功"),o.form.loading=!1}),3e3)},close:function(){console.log("xx")}}},n=e(10),r=Object(n.a)(a,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"demo border"},[e("el-button",{on:{click:o.toAdd}},[o._v("新增")]),o._v(" "),e("el-button",{on:{click:o.toEdit}},[o._v("编辑")]),o._v(" "),e("agel-form-dialog",{attrs:{visible:o.form.show,loading:o.form.loading,"custom-class":"ag-dialog",title:"收货地址",top:"center"},on:{"update:visible":function(t){return o.$set(o.form,"show",t)},validated:o.submit}},[e("p",[o._v("1111111111")]),o._v(" "),e("agel-form",{model:{value:o.form,callback:function(t){o.form=t},expression:"form"}}),o._v(" "),e("p",[o._v("22222222222222")]),o._v(" "),e("agel-form",{model:{value:o.form2,callback:function(t){o.form2=t},expression:"form2"}})],1)],1)}),[],!1,null,null,null);t.default=r.exports}}]);