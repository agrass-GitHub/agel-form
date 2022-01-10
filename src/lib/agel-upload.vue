<template>
  <el-upload ref="ref" :class="['agel-upload',{'limit-hide-trigger':isLimitHideTrigger}]" :listType="listType" :autoUpload="autoUpload" :file-list="value" :before-upload="beforeUpload" :on-success="onSuccess" :on-remove="onRemove" :on-exceed="onExceed" :on-preview="onPreview" :on-error="onError" :on-change="onChange" v-bind="$attrs" v-on="$listeners">
    <slot slot="trigger" name="trigger"> </slot>
    <template v-slot:default>
      <slot name="default">
        <template v-if="$attrs.drag==''||$attrs.drag==true">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </template>
        <i v-else-if="listType=='picture-card'" class="el-icon-plus"></i>
        <el-button v-else size="small" type="primary">点击{{autoUpload?'上传':'选取'}}</el-button>
      </slot>
    </template>
    <slot slot="tip" name="tip">
      <div v-if="tip" class="el-upload__tip">{{ tip }}</div>
    </slot>
  </el-upload>
</template>

<script>
import { getProp } from "../utils/utils";
import { valueEquals } from "element-ui/src/utils/util";

export default {
  name: "agel-upload",
  inheritAttrs: false,
  inject: {
    elForm: {
      default: "",
    },
    elFormItem: {
      default: "",
    },
  },
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
    listType: String,
    autoUpload: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isLimitHideTrigger() {
      return (this.limitHide && this.value.length >= this.$attrs.limit) || 0;
    },
  },
  created() {
    if (this.value == undefined) this.$emit("input", []);
  },
  watch: {
    value(newv, oldv) {
      if (this.elFormItem && !valueEquals(newv, oldv)) {
        this.elFormItem.$emit("el.form.change");
      }
    },
  },
  methods: {
    onMessage(type, message) {
      if (this.$message && this.message) {
        this.$message[type](message);
      }
    },
    beforeUpload(file) {
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
      let beforeUpload = getProp(this.$attrs, "beforeUpload");
      if (beforeUpload) return beforeUpload(file);
      return true;
    },
    onRemove(file, fileList) {
      this.$emit("input", fileList);
      let onRemove = getProp(this.$attrs, "onRemove");
      onRemove && onRemove(file, list);
    },
    onSuccess(response, file, fileList) {
      // 需经过函数返回一个 {name:"xx",url:"xxx"} 结构的对象
      let onSuccess = getProp(this.$attrs, "onSuccess");
      if (onSuccess) {
        let resFile = onSuccess(response, file, fileList);
        if (resFile && resFile.url && resFile.name) {
          this.$emit("input", this.value.concat([resFile]));
        }
      }
    },
    onChange(file, fileList) {
      let onChange = getProp(this.$attrs, "onChange");
      if (!this.autoUpload) {
        this.$emit("input", fileList);
      }
      onChange && onChange(file, fileList);
    },
    onError(err, file, fileList) {
      this.onMessage("error", `文件上传失败`);
      let onError = getProp(this.$attrs, "onError");
      onError && onError(err, file, fileList);
    },
    onExceed(files, fileList) {
      this.onMessage("warning", "最大允许上传个数：" + this.$attrs.limit);
      let onExceed = getProp(this.$attrs, "onExceed");
      onExceed && onExceed(files, fileList);
    },
    onPreview(file) {
      let isPreview = this.preview;
      if (typeof this.preview == "function") {
        isPreview = this.preview(file);
      }
      if (file.url && isPreview && this.$msgbox) {
        const h = this.$createElement;
        const image = ["png", "jpg", "jpeg", "bmp", "gif"];
        const xdoc = ["doc", "docx", "xls", "xlsx", "csv"];
        const video = ["mp4", "ogg", "webm"];
        const audio = ["mp3", "wav", "ogg"];
        const includesSuffix = (arr) => {
          const suffix = file.url.split(".").pop().toLowerCase();
          return (
            arr.includes(suffix) ||
            arr.map((v) => v.toUpperCase()).includes(suffix)
          );
        };
        let message = null;

        if (includesSuffix(image)) {
          message = h("img", {
            class: "agel-upload-preview-img",
            attrs: { src: file.url },
          });
        } else if (includesSuffix(xdoc)) {
          let url = encodeURIComponent(file.url);
          message = h("iframe", {
            class: "agel-upload-preview-doc",
            attrs: {
              src: `https://view.officeapps.live.com/op/view.aspx?src=${url}`,
              border: 0,
            },
          });
        } else if (includesSuffix(video)) {
          message = h("video", {
            class: "agel-upload-preview-video",
            attrs: { src: file.url, controls: true },
          });
        } else if (includesSuffix(audio)) {
          message = h("audio", {
            class: "agel-upload-preview-audio",
            attrs: { src: file.url, controls: true },
          });
        } else {
          message = h("p", null, "该文件不支持预览");
        }
        this.$msgbox({
          title: "附件预览",
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
      let onPreview = getProp(this.$attrs, "onPreview");
      onPreview && onPreview(file);
    },
    submit() {
      this.$refs.ref.submit();
    },
    abort(file) {
      this.$refs.ref.abort(file);
    },
    clearFiles() {
      this.$refs.ref.clearFiles();
      this.$emit("input", []);
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