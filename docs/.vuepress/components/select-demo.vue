<template>
  <div class="demo border">
    <span>组件：</span>
    <agel-select v-model="value" :options="options" filter multiple>
      <template v-slot:option="{option}">
        <el-tag>{{option.label}}</el-tag>
      </template>
    </agel-select>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      value: "1,2",
      options: [
        { label: "男", value: "1" },
        { label: "女", value: "2" },
      ],
    };
  },
};
</script>