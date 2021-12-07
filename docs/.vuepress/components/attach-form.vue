<template>
  <div class="demo">
    <p>
      <span>行内表单：</span>
      <el-switch v-model="inline"></el-switch>
      <span style="margin-left:10px">form.data.name：</span>
      <el-input v-if="form.data" v-model="form.data.name" style="width:200px"></el-input>
    </p>
    <agel-form v-model="form" :attach="{data,items,inline}"> </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {},
      data: { name: "属性同步合并到 form.data" },
      inline: false,
    };
  },
  computed: {
    items() {
      return [
        { label: "姓名", prop: "name" },
        { label: "手机", prop: "phone" },
        { label: "地址", display: this.inline },
      ];
    },
  },
};
</script>