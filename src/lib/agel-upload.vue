<template>
  <el-upload ref="ref" class="agel-upload" v-bind="$attrs" :file-list="value" :before-upload="handleBeforeUpload" :on-success="handleSuccess"
    :on-remove="handleRemove" :on-exceed="handleExceed" :on-preview="handlePreview" :on-error="handleError" v-on="on">
    <template v-if="$attrs.drag">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </template>
    <i v-else-if="$attrs.listType=='picture-card'" class="el-icon-plus"></i>
    <slot-render v-else-if="buttonRender" :render="buttonRender"></slot-render>
    <template v-else>
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button v-if="$attrs.autoUpload===false||$attrs['auto-upload']===false" style="margin-left: 10px;" size="small" type="success"
        @click="handleUpload">上传到服务器</el-button>
    </template>
    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
    <div v-if="tip" slot="tip" class="el-upload__tip">{{ tip }}</div>
  </el-upload>
</template>

<script>
import formMixin from "./formMixin";
import slotRender from "./slot-render.js";
export default {
  name: "agel-upload",
  components: {
    slotRender,
  },
  mixins: [formMixin],
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    preview: {
      type: Boolean,
      default: true,
    },
    message: {
      type: Boolean,
      default: true,
    },
    limitSize: Number,
    tip: String,
    buttonRender: Function,
  },
  data() {
    return {};
  },
  methods: {
    onMessage(type, message) {
      if (this.$message && this.message) {
        this.$message[type](message);
      }
    },
    handleBeforeUpload(file) {
      if (this.limitSize) {
        let kb = file.size / 1024;
        if (kb > this.limitSize) {
          this.onMessage(
            "warning",
            `最大只能上传${this.limitSize}kb大小的文件`
          );
          return false;
        }
      }
      let emit = this.$attrs.beforeUploa || this.$attrs["before-upload"];
      if (emit) return emit(file);
      return true;
    },
    handleUpload() {
      this.$refs.ref.submit();
    },
    handleRemove(file, list) {
      this.$emit("input", list);
      let emit = this.$attrs.onRemove || this.$attrs["on-remove"];
      emit && emit(file, list);
    },
    handleSuccess(file) {
      // 需经过函数返回一个 {name:"xx",url:"xxx"} 结构的对象
      let emit = this.$attrs.onSuccess || this.$attrs["on-success"];
      if (emit) {
        let item = emit(file);
        if (item && item.url) {
          item.name = item.name || Math.floor(Math.random() * 100000);
          this.value.push(item);
        }
      }
    },
    handleError(err, file, fileList) {
      this.onMessage("error", `文件上传失败`);
      let emit = this.$attrs.onError || this.$attrs["on-error"];
      emit && emit(err, file, fileList);
    },
    handleExceed(files, fileList) {
      this.onMessage("warning", "最大允许上传个数：" + this.$attrs.limit);
      let emit = this.$attrs.onExceed || this.$attrs["on-exceed"];
      emit && emit(files, fileList);
    },
    handlePreview(file) {
      if (this.preview && this.$msgbox) {
        const h = this.$createElement;
        let suffix = file.url.split(".").pop().toLowerCase();
        let image = ["png", "jpg", "jpeg", "bmp", "gif"];
        let xdoc = ["doc", "docx", "xls", "xlsx", "csv", "pdf", "pptx"];
        let video = ["mp4", "ogg", "webm"];
        let audio = ["mp3", "wav", "ogg"];
        let message = null;
        if (image.includes(suffix)) {
          message = h("img", {
            class: "agel-upload-preview-img",
            attrs: { src: file.url },
          });
        } else if (xdoc.includes(suffix)) {
          let url = encodeURIComponent(file.url);
          message = h("iframe", {
            class: "agel-upload-preview-doc",
            attrs: {
              src: `http://view.xdocin.com/xdoc?_xdoc=${url}`,
              border: 0,
            },
          });
        } else if (video.includes(suffix)) {
          message = h("video", {
            class: "agel-upload-preview-video",
            attrs: { src: file.url, controls: true },
          });
        } else if (audio.includes(suffix)) {
          message = h("audio", {
            class: "agel-upload-preview-audio",
            attrs: { src: file.url, controls: true },
          });
        } else {
          message = h("p", null, "该文件不支持预览");
        }
        this.$msgbox({
          title: " 附件预览",
          customClass: "agel-upload-preview-msgbox",
          center: true,
          message,
          confirmButtonText: "下载",
        }).then(() => {
          let a = document.createElement("a");
          a.href = file.url;
          a.download = file.name;
          a.target = "_blank";
          a.click();
          a = null;
        });
      }

      let emit = this.$attrs.onPreview || this.$attrs["on-preview"];
      emit && emit(files, fileList);
    },
  },
};
</script>

<style lang="scss" >
.agel-upload-preview-msgbox {
  width: auto;
  padding-bottom: 20px;
  min-width: 300px;

  .el-message-box__header {
    padding-top: 20px;
  }
  .agel-upload-preview-img {
    max-width: 1000px;
    max-height: 600px;
  }
  .agel-upload-preview-video {
    max-width: 1000px;
    max-height: 600px;
  }
  .agel-upload-preview-doc {
    width: 1000px;
    height: 600px;
  }
}
.agel-upload {
  .el-upload-dragger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 130px;
    width: 100%;
    padding: 0px 40px;
  }
  .el-upload-dragger .el-icon-upload {
    font-size: 50px;
    margin: 0px;
  }
  .el-upload-dragger .el-upload__text {
    font-size: 12px;
  }
  .el-icon-close-tip {
    display: none !important;
  }
}
</style>