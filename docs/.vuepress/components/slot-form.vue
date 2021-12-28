<template>
  <agel-form class="demo" v-model="form">
    <template v-slot:prepend>
      <el-form-item>
        <span>查询条件：</span>
      </el-form-item>
    </template>
    <template v-slot:append>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <!-- 
        // grid 布局的情况下用 eL-col 包裹
        <el-col :span="8"> </el-col>
        // tableditor 布局的情况下用 eL-table-column 包裹
        <eL-table-column > </eL-table-column>
       -->
    </template>
  </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        layout: "inline",
        data: {},
        items: [
          { prop: "user", label: "审批人" },
          { prop: "region", label: "活动区域" },
        ],
      },
    };
  },
};
</script>