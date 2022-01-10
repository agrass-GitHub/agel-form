<template>
  <div class="dynamic-form">
    <div class="demo border">
      <agel-form v-model="dynamicGridForm">
        <template v-slot:prepend="scope">
          <el-col :span="24" style="margin-bottom:10px">
            <b>栅格表单 {{scope.rowIndex+1}}</b>
          </el-col>
        </template>
        <template v-slot:append="scope">
          <el-col :span="4">
            <el-button @click="del(dynamicGridForm,scope)" type="primary">删除</el-button>
          </el-col>
        </template>
      </agel-form>
      <el-button @click="push(dynamicGridForm)" type="primary">新增</el-button>
    </div>

    <div class="demo border">
      <agel-form v-model="dynamicDescForm">
        <template v-slot:title="scope">
          <span>描述表单 {{scope.rowIndex+1}}：</span>
        </template>
        <template v-slot:extra="scope">
          <el-button @click="del(dynamicDescForm,scope)" type="primary">删除</el-button>
        </template>
      </agel-form>
      <el-button @click="push(dynamicDescForm)" style="margin-top:10px" type="primary">新增</el-button>
      <el-button @click="getRef()" type="primary">获取组件实例</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicGridForm: {
        layout: "grid",
        span: 10,
        data: [{ name: "栅格布局", age: "今年芳龄18岁" }],
        items: [
          { label: "姓名", prop: "name", required: true },
          {
            label: "年龄",
            prop: "age",
          },
        ],
      },
      dynamicDescForm: {
        layout: "descriptions",
        column: 1,
        data: [{ name: "描述布局", age: "今年芳龄18岁" }],
        items: [
          { label: "姓名", prop: "name", required: true },
          {
            label: "年龄",
            prop: "age",
            slot: ({ row }) => {
              return <el-tag>{row.age}</el-tag>;
            },
          },
        ],
      },
    };
  },
  methods: {
    push(form) {
      form.data.push({ name: "", age: "今年芳龄18岁" });
    },
    del(form, scope) {
      form.data.splice(scope.rowIndex, 1);
    },
    getRef() {
      this.$message.success("获取组件实例成功，查看控制台");
      console.log(this.dynamicGridForm.getRef("dynamicData.0.name"));
    },
  },
};
</script>

<style>
.dynamic-form .el-descriptions__header {
  margin-bottom: 10px;
}
.dynamic-form .el-descriptions {
  margin-bottom: 10px;
}
</style>