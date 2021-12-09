<template>
  <div class="demo border">
    <agel-form-dialog :visible.sync="form.show" :loading="form.loading" :title="form.title" width="500px" height="400px" custom-class="ag-dialog" top="center" confirmBtn="提 交" @validated="submit">
      <p>el-form 表单</p>
      <el-form :model="formData" label-width="auto">
        <el-form-item prop="name" label="姓名" :rules="[{required:true,message:'姓名必填',trigger:'blur'}]">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
      </el-form>
      <p>agel-form 表单</p>
      <agel-form v-model="form"></agel-form>
      <el-button slot="button">按钮</el-button>
      <el-button slot="button">按钮</el-button>
    </agel-form-dialog>
    <el-button type="primary" @click="toAdd">新增</el-button>
    <el-button type="primary" @click="toEdit">编辑</el-button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      style: true,
      form: {
        title: "",
        show: false,
        loading: false,
        span: 20,
        data: {},
        items: [
          { label: "活动名称", prop: "name", required: true },
          {
            label: "建议反馈",
            prop: "desc",
            type: "textarea",
          },
        ],
      },
      formData: { name: "" },
    };
  },
  methods: {
    toAdd() {
      this.form.title = "新增";
      this.formData.name = "";
      this.form.show = true;
    },
    toEdit() {
      this.form.title = "编辑";
      this.form.show = true;
      this.form.data = {
        name: "使用组件",
        desc: "有什么建议吗",
      };
      this.formData.name = "agrass";
    },
    // 弹窗表单校验成功之后触发
    submit() {
      this.form.loading = true;
      // 此处进行 http 表单提交操作
      setTimeout(() => {
        this.$message.success("操作成功");
        this.form.loading = false;
        this.form.show = false;
      }, 4000);
    },
    close() {
      console.log("xx");
    },
  },
};
</script>