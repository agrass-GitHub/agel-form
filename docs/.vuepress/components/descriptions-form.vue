<template>
  <div class="demo border">
    <agel-form v-model="form">
      <template v-slot:extra>
        <el-checkbox v-model="form.border" style="margin-right:20px">border 样式</el-checkbox>
        <el-checkbox v-model="form.data._view_" style="margin-right:20px">视图模式</el-checkbox>
      </template>
    </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        title: "agel-form descriptions 描述排版",
        layout: "descriptions",
        border: true,
        column: 3,
        labelStyle: { "min-width": "80px" },
        data: {
          name: "kooriookami",
          phone: "18100000000",
          addr: "苏州",
          remark: "送货上门",
          number: 100,
          resource: "顺丰,圆通",
          address: "江苏省苏州市吴中区吴中大道 1188 号",
          delivery: true,
          _view_: false,
        },
        items: [
          {
            prop: "name",
            label: "用户名",
            viewModel: true,
          },
          {
            label: "手机号",
            prop: "phone",
          },
          {
            prop: "addr",
            label: "居住地",
          },
          {
            prop: "remark",
            label: "备注",
          },
          {
            label: "联系地址",
            prop: "address",
            span: 2,
          },
          {
            component: "el-checkbox",
            label: "快递方式",
            prop: "resource",
            options: ["顺丰", "圆通"],
            required: true,
          },
          {
            component: "el-switch",
            label: "即时配送",
            prop: "delivery",
            viewFormat: ({ value }) => {
              return (
                <el-tag disable-transitions>{value ? "即时" : "延时"}</el-tag>
              );
            },
          },
          {
            component: "el-rate",
            label: "评分",
            prop: "rate",
            viewFormat: ({ value }) => value + "星评分",
          },
          {
            component: "el-upload",
            label: "照片",
            prop: "upload",
            listType: "picture-card",
            action: "xx/xx/",
            viewModel: false,
          },
        ],
      },
    };
  },
};
</script>