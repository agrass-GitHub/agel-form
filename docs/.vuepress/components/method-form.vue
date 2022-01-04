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
        span: 16,
        data: {
          user: "",
          address: "https://github.com/agrass-GitHub/agel-form",
        },
        rules: {
          user: [
            {
              required: true,
              message: "请输入活动名称",
              trigger: "blur",
            },
          ],
        },
        items: [
          {
            prop: "user",
            label: "活动名称",
          },
          {
            prop: "region",
            label: "活动区域",
            component: "el-select",
            clearable: true,
            options: ["区域一", "区域二"],
            rules: {
              required: true,
              message: "你还没选区域呢",
              trigger: "change",
            },
          },
          {
            prop: "address",
            label: "项目地址",
            required: true,
          },
          {
            prop: "evaluate",
            label: "评价",
            component: "el-radio",
            options: ["很棒", "一般", "糟糕"],
            on: {
              change: (v) => {
                this.$message.info("给个好评吧");
              },
            },
          },
        ],
        on: {
          validate: (v) => {
            console.log("验证字段：" + v);
          },
        },
      },
    };
  },
  methods: {
    submit() {
      // 与 eleForm validate 有点不同，第一个参数为成功回调，第二个参数为失败回调
      this.form.validate(
        () => this.$notify.success("提交成功"),
        () => this.$notify.error("验证失败")
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
      console.log("form:", this.form.getRef("elForm"));
      console.log("layout:", this.form.getRef("agLayout"));
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