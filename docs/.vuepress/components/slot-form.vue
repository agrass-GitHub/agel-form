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
        <el-button type="primary">初始化</el-button>
      </el-form-item>
      <!-- 
        // 栅格布局的情况下可用 eL-col 包裹
        <el-col :span="8"> </el-col>
       -->
    </template>
  </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        inline: true,
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