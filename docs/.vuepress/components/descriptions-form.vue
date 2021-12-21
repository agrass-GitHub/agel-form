<template>
  <div class="demo border">
    <agel-form v-model="form">
      <template v-slot:extra>
        <el-checkbox v-model="form.border" style="margin-right:20px">border 样式</el-checkbox>
        <el-button type="primary" @click="()=>form.validate()">提交单号</el-button>
      </template>
    </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        size: "medium",
        title: "agel-form descriptions 描述排版",
        layout: "descriptions",
        border: true,
        column: 3,
        labelWidth: "200px",
        labelStyle: { "min-width": "70px" },
        data: {
          name: "kooriookami",
          phone: "18100000000",
          addr: "苏州",
          remark: "送货上门",
          number: 100,
          address: "江苏省苏州市吴中区吴中大道 1188 号",
          delivery: true,
        },
        items: [
          {
            component: "el-text",
            prop: "name",
            label: "用户名",
          },
          { component: "el-text", label: "手机号", prop: "phone" },
          {
            component: "el-text",
            prop: "addr",
            label: "居住地",
            valueFormat: (v) => "中国" + v,
          },
          {
            component: "el-text",
            prop: "remark",
            label: () => <el-tag>备注</el-tag>,
            slot: () => <el-tag>{this.form.data.remark}</el-tag>,
          },
          { component: "el-text", label: "联系地址", prop: "address", span: 2 },
          {
            component: "el-checkbox",
            label: "快递方式",
            prop: "resource",
            options: ["顺丰", "圆通"],
            required: true,
          },
          { component: "el-switch", label: "即时配送", prop: "delivery" },
          { component: "el-rate", label: "评分", prop: "rate" },
          {
            component: "el-upload",
            label: "照片",
            prop: "upload",
            listType: "picture-card",
            action: "xx/xx/",
          },
        ],
      },
    };
  },
};
</script>