<template>
  <div class="demo border">
    <el-button @click="toAdd">新增</el-button>
    <el-button @click="toEdit">编辑</el-button>
    <agel-form-dialog :visible.sync="form.show" :loading="form.loading" custom-class="ag-dialog" title="收货地址" top="center" @validated="submit">
      <p>1111111111</p>
      <agel-form v-model="form"> </agel-form>
      <p>22222222222222</p>
      <agel-form v-model="form2"> </agel-form>
    </agel-form-dialog>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      show: false,
      form: {
        show: false,
        loading: false,
        span: 20,
        data: {},
        items: [
          {
            label: "活动名称",
            prop: "name",
            required: true,
          },
           { label: "建议反馈", prop: "desc", type: "textarea" },
        ],
      },
      form2: {
        span: 20,
        data: {},
        items: [
          { label: "活动名称", prop: "name", required: true },
          { label: "建议反馈", prop: "desc", type: "textarea" },
        ],
      },
    };
  },
  methods: {
    toAdd() {
      this.form.data = {};
      this.form.data2 = {};
      this.form.show = true;
    },
    toEdit() {
      this.form.data = {
        name: "使用 agel-form",
        desc: "个人开发bababab",
      };
      this.form2.data = {
        name: "使用 agel-form",
        desc: "个人开发bababab",
      };
      this.form.show = true;
    },
    submit() {
      this.form.loading = true;
      setTimeout(() => {
        this.$message.info("操作成功");
        this.form.loading = false;
      }, 3000);
    },
    close() {
      console.log("xx");
    },
  },
};
</script>