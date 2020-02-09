export default function() {
  // 全局配置
  const config = this.$agelFormConfig || {};
  const globalApi = config.from || {};
  const globalItemApi = config.item || {};

  // 局部配置
  const localApi = this.value || {};

  // 表单默认配置
  const defaultApi = {
    labelWidth: "100px",
    labelPosition: "right"
  };

  // 表单扩展配置
  const extendApi = {
    $ref: null,
    loading: false,
    data: {},
    items: {},
    gutter: 15,
    getFormData() {
      let data = JSON.parse(JSON.stringify(this.data));
      for (const key in this.items) {
        let item = this.items[key];
        if (item.valueFormatter) {
          data[key] = item.valueFormatter(data[key], data, item);
        }
      }
      return data;
    },
    submit() {},
    validate(...p) {
      this.$ref.validate(...p);
    },
    validateField(...p) {
      this.$ref.validateField(...p);
    },
    resetFields(...p) {
      this.$ref.resetFields(...p);
    },
    clearValidate(...p) {
      this.$ref.clearValidate(...p);
    }
  };

  // 表单项扩展配置
  const itemExtendApi = {
    // 自定义
    component: "el-input",
    display: true,
    show: true,
    defaultValue: undefined,
    on: {},
    valueFormatter: undefined,
    // 继承 el-form-item
    label: undefined,
    labelWidth: undefined,
    required: undefined,
    rules: [],
    // 继承 el-row
    span: 24,
    offset: 0
  };

  return {
    config,
    defaultApi,
    extendApi,
    globalApi,
    localApi,
    itemExtendApi,
    globalItemApi
  };
}
