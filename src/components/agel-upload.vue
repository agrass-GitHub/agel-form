<template>
  <el-upload v-bind="$attrs" :file-list="value" ref="upload">
    <template v-if="$attrs.drag">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </template>
    <el-button v-else size="small" type="primary">选择上传</el-button>
    <div v-if="tip" slot="tip" class="el-upload__tip">{{ tip }}</div>
  </el-upload>
</template>

<script>
import formMixin from "@/mixins/formMixin";

export default {
  name: "agel-upload",
  mixins: [formMixin],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    tip: String
  },
  data() {
    return {};
  },
  methods: {
   
  }
};
</script>
