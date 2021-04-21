<template>
  <div class="demo">
    <agel-form v-model="form"> </agel-form>
    <el-button type="primary" @click="submit">立即创建</el-button>
    <el-button type="primary" @click="rest">初始化表单</el-button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        labelWidth: "80px",
        span: 18,
        data: {
          name: "agel-form",
          delivery: true,
          file: [{ name: "活动清单.xlsx", url: "xxx.jpg" }],
        },
        items: {
          name: {
            label: "活动名称",
            required: true, // 设置 required 会自动生成必填 rules
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
          desc: {
            label: "活动形式",
            type: "textarea",
            required: true,
          },
        },
      },
    };
  },
  methods: {
    submit() {
      this.form.validate(() => {
        this.$message.success("成功");
      });
    },
    rest() {
      this.form.resetFields();
    },
  },
};
</script>