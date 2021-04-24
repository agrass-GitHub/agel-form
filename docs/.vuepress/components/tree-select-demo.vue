<template>
  <div class="demo">
    <span>组件：</span>
    <agel-select v-model="value" :options="options" filter></agel-select>
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