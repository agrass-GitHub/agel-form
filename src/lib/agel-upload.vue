<template>
  <el-upload ref="ref" class="agel-upload" v-bind="$attrs" :file-list="value" :on-remove="handleRemove" v-on="on">
    <div class="el-upload-dragger" v-if="drag">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </div>
    <el-button v-else size="small" type="primary">选择上传</el-button>
    <div v-if="tip" slot="tip" class="el-upload__tip">{{ tip }}</div>
  </el-upload>
</template>

<script>
import formMixin from "./formMixin";
export default {
  name: "agel-upload",
  mixins: [formMixin],
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    drag: Boolean,
    tip: String,
  },
  data() {
    return {};
  },
  methods: {
    handleRemove(file, list) {
      this.$emit("input", list);
      if (this.on["on-remove"]) {
        this.on["on-remove"](file, list);
      }
    },
  },
};
</script>

<style lang="scss" >
.agel-upload {
  .el-upload-dragger {
    width: 100%;
    max-width: 360px;
    padding: 0px 20px;
  }
  .el-upload-dragger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 130px;
  }
  .el-upload-dragger .el-icon-upload {
    font-size: 50px;
    margin: 0px;
  }
  .el-upload-dragger .el-upload__text {
    font-size: 12px;
  }
}
</style>