<template>
  <div class="demo border">
    <agel-form v-model="form">
      <template v-slot:extra>
        <el-checkbox v-model="form.data._edit_" style="margin-right:20px">表单模式</el-checkbox>
        <el-checkbox v-model="form.border" style="margin-right:20px">border 样式</el-checkbox>
        <el-button type="primary" @click="test">提交单号</el-button>
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
          address: "江苏省苏州市吴中区吴中大道 1188 号",
          delivery: true,
          _edit_: true,
        },
        items: [
          {
            prop: "name",
            label: "用户名",
            _edit_: false,
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
            label: () => <el-tag>备注</el-tag>,
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
            formatter: (value) => {
              return (
                <el-tag disable-transitions>{value ? "即时" : "延时"}</el-tag>
              )
            },
          },
          { component: "el-rate", label: "评分", prop: "rate" },
          {
            component: "el-upload",
            label: "照片",
            prop: "upload",
            listType: "picture-card",
            action: "xx/xx/",
            _edit_: true,
          },
        ],
      },
      test: () => {
        console.log(this.form.getRef("name"))
      },
    }
  },
}
</script>