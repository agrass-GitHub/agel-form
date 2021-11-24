<template>
  <div class="demo border">
    <agel-checkbox v-model="value">测试</agel-checkbox>
    <agel-checkbox v-model="checkbox" :options="options">
      <template v-slot:option="{option,index}">
        <el-tag>{{index}}：{{option.label}}</el-tag>
      </template>
    </agel-checkbox>
    <agel-radio v-model="radio" :options="options"></agel-radio>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      value: true,
      checkbox: "女",
      radio: "",
      options: ["男", "女"],
    };
  },
};
</script>