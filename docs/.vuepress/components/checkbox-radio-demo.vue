<template>
  <div class="demo border">
    <agel-checkbox v-model="value">选择框</agel-checkbox>
    <agel-checkbox v-model="checkbox" :options="options">
      <template v-slot:option="{option}">
        <el-tag>{{option.label}}</el-tag>
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
      checkbox: "1,2",
      radio: "2",
      options: [
        { label: "多选框", value: "1" },
        { label: "单选框", value: "2" },
      ],
    };
  },
};
</script>