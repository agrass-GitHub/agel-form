<template>
  <div class="demo">
    <agel-form v-model="form"> </agel-form>
    <el-button style="margin-left:50px" type="primary" @click="submit">提交</el-button>
    <el-button type="primary" @click="rest">重置</el-button>
    <el-button type="primary" @click="clear">清除验证</el-button>
    <el-button type="primary" @click="getRef">获取组件实例</el-button>
    <el-button type="primary" @click="getItem">获取Item</el-button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        data: {
          user: "agel-form",
        },
        items: [
          {
            prop: "user",
            required: true,
            label: "名称",
          },
          {
            prop: "address",
            label: "地址",
            rules: {
              required: true,
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur",
            },
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      // 与 eleForm validate 有点不同，第一个参数为成功回调，第二个参数为失败回调
      this.form.validate(
        () => this.$message.success("提交成功"),
        () => this.$message.error("验证失败")
      );
    },
    rest() {
      this.form.resetFields();
    },
    clear() {
      this.form.clearValidate();
    },
    // 获取组件实例
    getRef() {
      this.$message.success("获取成功，查看控制台");
      console.log("form:", this.form.getRef());
      console.log("user input:", this.form.getRef("user"));
    },
    // 在 items 为数组的情况下，可使用该方法快速获取 item 对象进行修改
    getItem() {
      this.$message.success("获取成功，查看控制台");
      console.log("user input:", this.form.getItem("user"));
    },
  },
};
</script>