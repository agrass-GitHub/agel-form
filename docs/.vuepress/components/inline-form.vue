<template>
  <div class="demo">
    <agel-form v-model="form"> </agel-form>
    <el-button>查询</el-button>
    <el-button>查询</el-button>
    <el-button>查询</el-button>
    <el-button>查询</el-button>
    <el-button>查询</el-button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        inline: true,
        data: {},
        items: {
          name: { label: "活动名称" },
          region: { label: "活动区域" },
        },
      },
    };
  },
};
</script>