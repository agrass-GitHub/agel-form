(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{410:function(e,v,_){"use strict";_.r(v);var l=_(6),o=Object(l.a)({},(function(){var e=this,v=e.$createElement,_=e._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[_("h2",{attrs:{id:"v-0-2-1"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#v-0-2-1"}},[e._v("#")]),e._v(" v.0.2.1")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("bug")]),e._v(" display 属性导致显示错误的问题")])]),e._v(" "),_("h2",{attrs:{id:"v-0-2-0"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#v-0-2-0"}},[e._v("#")]),e._v(" v.0.2.0")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("调整")]),e._v(" 移除 item.custom 属性，重构自定义组件逻辑，更加方便纯粹")]),e._v(" "),_("li",[_("code",[e._v("调整")]),e._v(" 移除 item.show 属性")]),e._v(" "),_("li",[_("code",[e._v("调整")]),e._v(" slot render 函数不再传递 h（$createElement） 参数")]),e._v(" "),_("li",[_("code",[e._v("调整")]),e._v(" agel-radio-group 更改名称为 agel-radio，对 radio 和 radio-group 进行了合并")]),e._v(" "),_("li",[_("code",[e._v("调整")]),e._v(" agel-checkbox-group 更改名称为 agel-checkbox，对 checkbox 和 checkbox-group 进行了合并")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" agel-select agel-checkbox agel-radio 组件的 options 属性支持字符串数组，异步函数，Promise")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" el-tree-select 新增 options 属性，支持异步函数，Promise，兼容 data 属性")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 根据表单字段初始化 form.data，关联响应式")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" form.responsive  form.responsiveMethod 根据父容器宽度自动响应式")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" item.display  属性支持函数配置，实现表单联动")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" item.disabled 属性支持函数配置，实现表单联动")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 单组件支持在项目中单独引入使用")]),e._v(" "),_("li",[_("code",[e._v("优化")]),e._v(" 全局配置支持对象，函数形式写法")]),e._v(" "),_("li",[_("code",[e._v("优化")]),e._v(" 使用文档重构")])]),e._v(" "),_("h2",{attrs:{id:"v-0-1-2"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#v-0-1-2"}},[e._v("#")]),e._v(" v.0.1.2")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("bug")]),e._v(" agel-select 在开启 filter 且有分组的情况下，过滤报错的问题")]),e._v(" "),_("li",[_("code",[e._v("bug")]),e._v(" agel-tree-select，value change 的时候没有自动回填")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" agel-upload 添加 limitHide 属性，超出限制隐藏上传按钮")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" agel-upload 添加 preview 属性可设置为函数")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 方便自定义组件，新增 item.custom 属性")]),e._v(" "),_("li",[_("code",[e._v("调整")]),e._v(" 取消打包为 lib.umd.js，包直接指向 src")]),e._v(" "),_("li",[_("code",[e._v("调整")]),e._v(" agel-input-tree 更改名称为 agel-tree-select")])]),e._v(" "),_("h2",{attrs:{id:"v-0-1-1"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#v-0-1-1"}},[e._v("#")]),e._v(" v.0.1.1")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("bug")]),e._v(" agel-upload 在外网预览 doc 文件失败，由 xdocin 转为 微软 officeapps 服务提供在线预览")])]),e._v(" "),_("h2",{attrs:{id:"v-0-1-0"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#v-0-1-0"}},[e._v("#")]),e._v(" v.0.1.0")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("新增")]),e._v(" items 支持数组配置，添加 getItem 内置方法")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 支持所有 el-row el-col 所有属性")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 支持组件 label slot 配置")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 支持组件 slots 配置")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 自动添加 placeholder 属性")]),e._v(" "),_("li",[_("code",[e._v("优化")]),e._v(" 全局配置逻辑修改")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 添加 item.ignore 属性")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" agel-upload 组件多种样式兼容,添加预览文件功能，添加钩子函数默认提醒")])]),e._v(" "),_("h2",{attrs:{id:"v-0-0-1-v-0-0-3"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#v-0-0-1-v-0-0-3"}},[e._v("#")]),e._v(" v.0.0.1 - v.0.0.3")]),e._v(" "),_("ul",[_("li",[_("code",[e._v("新增")]),e._v(" 纯数据配置表单")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 封装 agel-input-tree 组件")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 封装 agel-upload 组件")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 封装 agel-select 组件，支持过滤，组配置")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 封装 agel-checkbox-group 组件")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 封装 agel-radio-group 组件")]),e._v(" "),_("li",[_("code",[e._v("新增")]),e._v(" 根据 required 生成必填 rules")])])])}),[],!1,null,null,null);v.default=o.exports}}]);