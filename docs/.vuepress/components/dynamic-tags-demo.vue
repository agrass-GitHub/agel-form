<template>
  <div class="demo border">
    <el-row type="flex">
      <span>动态标签：</span>
      <agel-dynamic-tags v-model="value" :tagPropHandle="tagPropHandle" button-text="+ 标签"
        @click="tagClick"></agel-dynamic-tags>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "agel-dynamic-tags-demo",
  data() {
    return {
      value: ["不可关闭", "自定义样式", "标签1", "标签2"],
    };
  },
  methods: {
    tagClick(tag, index) {
      this.$message.info(`点击了${index}.${tag}`);
    },
    tagPropHandle(tag, index) {
      if (index == 0) {
        return { closable: false };
      }
      if (index == 1) {
        return { type: "success", effect: "plain", };
      }
    },
  },
};
</script>
