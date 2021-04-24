<template>
  <div class="demo">
    <span>组件：</span>
    <agel-select v-model="value" :options="options" filter>
      <template v-slot:prefix>
        <i class="el-icon-platform-eleme" style="color:#409EFF;line-height:28px;font-size:20px" />
      </template>
    </agel-select>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      value: "",
      options: ["男", "女"],
    };
  },
};
</script>