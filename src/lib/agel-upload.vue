<template>
  <el-upload ref="ref" :class="['agel-upload',{'limit-hide-trigger':isLimitHideTrigger}]" :file-list="value||[]" :before-upload="handleBeforeUpload"
    :on-success="handleSuccess" :on-remove="handleRemove" :on-exceed="handleExceed" :on-preview="handlePreview" :on-error="handleError"
    v-bind="$attrs" v-on="$listeners">
    <template v-slot:trigger>
      <slot name="trigger">
        <el-button v-if="$attrs.autoUpload==false" size="small" type="primary">选取文件</el-button>
      </slot>
    </template>
    <template v-slot:default>
      <slot name="default">
        <template v-if="$attrs.drag==''||$attrs.drag==true">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </template>
        <i v-else-if="$attrs.listType=='picture-card'" class="el-icon-plus"></i>
        <el-button v-else-if="$attrs.autoUpload==false" style="margin-left: 10px;" size="small" type="success" @click="submit">上传到服务器
        </el-button>
        <el-button v-else size="small" type="primary">点击上传</el-button>
      </slot>
    </template>
    <template v-slot:tip>
      <slot name="tip">
        <div v-if="tip" class="el-upload__tip">{{ tip }}</div>
      </slot>
    </template>
  </el-upload>
</template>

<script>
import { getProp } from "../utils/utils";

export default {
  name: "agel-upload",
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: () => new Array(),
    },
    preview: {
      type: [Function, Boolean],
      default: true,
    },
    message: {
      type: Boolean,
      default: true,
    },
    limitSize: Number,
    limitHide: Boolean,
    tip: String,
  },
  computed: {
    isLimitHideTrigger() {
      return (this.limitHide && this.value.length >= this.$attrs.limit) || 0;
    },
  },
  created() {
    if (this.value == undefined) this.$emit("input", []);
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
      let emit = getProp(this.$attrs, "beforeUploa");
      if (emit) return emit(file);
      return true;
    },
    handleRemove(file, list) {
      this.$emit("input", list);
      let emit = getProp(this.$attrs, "onRemove");
      emit && emit(file, list);
    },
    handleSuccess(file) {
      // 需经过函数返回一个 {name:"xx",url:"xxx"} 结构的对象
      let emit = getProp(this.$attrs, "onSuccess");
      if (emit) {
        let item = emit(file);
        if (item && item.url && item.name) {
          this.value.push(item);
        }
      }
    },
    handleError(err, file, fileList) {
      this.onMessage("error", `文件上传失败`);
      let emit = getProp(this.$attrs, "onError");
      emit && emit(err, file, fileList);
    },
    handleExceed(files, fileList) {
      this.onMessage("warning", "最大允许上传个数：" + this.$attrs.limit);
      let emit = getProp(this.$attrs, "onExceed");
      emit && emit(files, fileList);
    },
    handlePreview(file) {
      let isPreview = this.preview;
      if (typeof this.preview == "function") {
        isPreview = this.preview(file);
      }
      if (isPreview && this.$msgbox) {
        const h = this.$createElement;
        let suffix = file.url.split(".").pop().toLowerCase();
        let image = ["png", "jpg", "jpeg", "bmp", "gif"];
        let xdoc = ["doc", "docx", "xls", "xlsx", "csv"];
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
              src: `https://view.officeapps.live.com/op/view.aspx?src=${url}`,
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
      let emit = getProp(this.$attrs, "onPreview");
      emit && emit(file);
    },
    submit() {
      this.$refs.ref.submit();
    },
    abort(file) {
      this.$refs.ref.clearFiles(file);
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>

<style>
.agel-upload.limit-hide-trigger .el-upload {
  display: none;
}

.agel-upload.limit-hide-trigger .el-upload-list__item:first-child {
  margin-top: 0px;
}

.agel-upload .el-upload-dragger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 130px;
  width: 100%;
  padding: 0px 40px;
}

.agel-upload .el-upload-dragger .el-icon-upload {
  font-size: 50px;
  margin: 0px;
}

.agel-upload .el-upload-dragger .el-upload__text {
  font-size: 12px;
}

.agel-upload .el-icon-close-tip {
  display: none !important;
}

.agel-upload .el-upload-list--picture-card .el-upload-list__item {
  transition: inherit;
}

.agel-upload-preview-msgbox {
  width: auto;
  padding-bottom: 20px;
  min-width: 300px;
}

.agel-upload-preview-msgbox .el-message-box__header {
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
</style>