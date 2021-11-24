<template>
  <div class="demo">
    <p>
      <span>行内表单：</span>
      <el-switch v-model="inline"></el-switch>
      <span style="margin-left:20px" v-show="!inline">栅格span：</span>
      <el-input-number v-show="!inline" v-model="span" :min="6" :max="24"></el-input-number>
    </p>
    <agel-form v-model="form" :attach="{data,items,inline,span}"> </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        labelWidth: "auto",
      },
      data: {},
      inline: false,
      span: 13,
    };
  },
  computed: {
    items() {
      return [
        { label: "活动名称" },
        { label: "活动区域" },
        {
          label: "按钮",
          component: "el-button",
          type: "primary",
          icon: "el-icon-search",
          slots: "查询",
          display: this.inline,
        },
      ];
    },
  },
};
</script>