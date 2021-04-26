<template>
  <div class="demo border">
    <agel-form v-model="form"> </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        labelWidth: "80px",
        span: 15,
        data: {
          name: "使用 agel-form",
          delivery: true,
          slider: 20,
        },
        items: {
          name: {
            label: "活动名称",
            required: true,
          },
          number: {
            component: "el-input-number",
            label: "活动人数",
          },
          region: {
            label: "活动区域",
            component: "el-select",
            options: [
              { label: "区域1", value: "区域1" },
              { label: "区域2", value: "区域2" },
            ],
          },
          date: {
            component: "el-date-picker",
            label: "活动时间",
            type: "date",
          },
          delivery: {
            component: "el-switch",
            label: "即时配送",
          },
          slider: {
            component: "el-slider",
            label: "活动进度",
          },
          type: {
            component: "el-checkbox",
            label: "活动性质",
            options: [
              { label: "美食/餐厅线上活动", value: "1" },
              { label: "地推活动", value: "2" },
              { label: "线下主题活动", value: "3" },
              { label: "单纯品牌曝光", value: "4" },
            ],
            rules: [
              {
                type: "array",
                required: true,
                message: "请至少选择一个活动性质",
                trigger: "change",
              },
            ],
          },
          resource: {
            component: "el-radio",
            label: "特殊资源",
            options: [
              { label: "线上品牌商赞助", value: "1" },
              { label: "线下场地免费", value: "2" },
            ],
            rules: [
              { required: true, message: "请选择活动资源", trigger: "change" },
            ],
          },
          rate: {
            component: "el-rate",
            label: "活动评分",
          },
          desc: {
            label: "活动形式",
            type: "textarea",
            required: true,
          },

          upload: {
            component: "el-upload",
            label: "活动照片",
            listType: "picture-card",
          },
          button: {
            component: "el-button",
            type: "primary",
            slots: "验证",
            on: {
              click: () => {
                this.form.validate(
                  () => this.$message.success("提交成功"),
                  () => this.$message.error("验证失败")
                );
              },
            },
          },
        },
      },
    };
  },
};
</script>