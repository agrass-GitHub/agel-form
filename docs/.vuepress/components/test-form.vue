<template>
  <div class="demo border">
    <el-input type="text" v-model.number="value1" />
    <el-input type="text" v-model.trim="value2" />
    <el-input type="text" v-model.lazy="value3" />
    <agel-form v-model="form"> </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      value1: "1次测试",
      value2: "1次测试",
      value3: "1次测试",
      form: {
        labelWidth: "80px",
        span: 15,
        data: {
          name: "1次测试",
        },
        items: [{ label: "活动名称", prop: "name", vmodel: ".number" }],
      },
    };
  },
  mounted() {
  },
};
</script>