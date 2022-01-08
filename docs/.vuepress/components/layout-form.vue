<template>
  <div class="demo border">
    <el-divider content-position="left">el-form 包裹</el-divider>
    <el-form :model="data" class="border" label-width="auto" ref="form">
      <!-- 内联布局 -->
      <el-divider content-position="left">agel-form-inline 内联布局</el-divider>
      <agel-form-inline :items="inlineItems"></agel-form-inline>

      <!-- 栅格布局 -->
      <el-divider content-position="left">agel-form-grid 栅格布局</el-divider>
      <agel-form-grid :items="gridItems" :span="12"></agel-form-grid>

      <!-- 描述布局 -->
      <el-divider content-position="left">agel-form-descriptions 描述布局</el-divider>
      <agel-form-descriptions :items="decItems" :column="2"></agel-form-descriptions>

      <!-- 表格编辑器布局, 需要使用 model-prop 属性关联表单数据-->
      <el-divider content-position="left">agel-form-tableditor 表格编辑器布局</el-divider>
      <agel-form-tableditor :items="tableItems" model-prop="list">
        <template v-slot:index="scope">
          <el-tag>{{scope.$index}}：{{scope.row.d1}}</el-tag>
        </template>
      </agel-form-tableditor>

      <!-- 自定义布局 -->
      <el-divider content-position="left">custom 自定义布局</el-divider>
      <el-row type="flex" justify="space-between">
        <el-form-item prop="e1" label="姓名" :rules="{required:true,message:'必填',trigger:'blur'}">
          <el-input v-model="data.e1"></el-input>
        </el-form-item>
        <el-form-item prop="e1" label="地址">
          <el-input v-model="data.e2"></el-input>
        </el-form-item>
      </el-row>

      <!-- 随意穿插其他内容  -->
      <el-button style="margin-top:20px" @click="validate" type="primary">验证</el-button>
    </el-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      data: {
        e1: "",
        e2: "",
        list: [
          { d1: "小王", d2: "xxx自治区" },
          { d1: "", d2: "" },
          { d1: "", d2: "" },
        ],
      },
      inlineItems: [
        { prop: "a1", label: "姓名", required: true },
        { prop: "a2", label: "地址" },
      ],
      gridItems: [
        { prop: "b1", label: "姓名", required: true },
        { prop: "b2", label: "地址" },
        { prop: "b3", label: "介绍", type: "textarea", span: 24 },
      ],
      decItems: [
        { prop: "c1", label: "姓名", required: true },
        { prop: "c2", label: "地址" },
        { prop: "c3", label: "介绍", type: "textarea", span: 2 },
      ],
      tableItems: [
        { prop: "index", label: "自定义", slot: true, width: 100 },
        { prop: "d1", label: "姓名", required: true, width: 100 },
        { prop: "d2", label: "地址", minWidth: 100 },
      ],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate((is) => {
        if (is) {
          this.$message.success("成功");
        } else {
          this.$message.error("验证失败");
        }
      });
    },
  },
};
</script>