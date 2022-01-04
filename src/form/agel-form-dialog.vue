<template>
  <el-dialog :custom-class="customClassName" :top="topStyle" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape"
    :before-close="beforeClose" @close="close" v-bind="$attrs" v-on="$listeners">
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
    <div v-loading="loading">
      <div class="ag-dialog-body" ref="dialogBody" :style="{height:height}">
        <slot> </slot>
      </div>
    </div>
    <template v-slot:footer>
      <slot name="footer">
        <el-form :model="{}" :disabled="loading" class="dialog-footer" v-if="confirmBtn||$slots.button">
          <slot name="button"></slot>
          <el-button v-if="confirmBtn" type="primary" @click="confirm">{{confirmBtn}}</el-button>
        </el-form>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "agel-form-dialog",
  inheritAttrs: false,
  props: {
    customClass: String,
    height: String,
    top: String,
    loading: Boolean,
    closeOnPressEscape: {
      type: Boolean,
      default: false,
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    confirmBtn: {
      type: [String, Boolean],
      default: "确 定",
    },
  },
  data() {
    return {};
  },
  computed: {
    customClassName() {
      let classNmae = "agel-form-dialog ";
      if (this.top == "center") classNmae += "ag-center-dialog ";
      if (this.customClass) classNmae += this.customClass;
      return classNmae;
    },
    topStyle() {
      return this.top == "center" ? "0px" : this.top;
    },
  },
  methods: {
    confirm() {
      this.validate(
        () => this.$emit("validated"),
        () => this.$emit("validatedErr")
      );
      this.$emit("confirm");
    },
    validate(call, err) {
      const formRefs = this.findElForm();
      if (formRefs.length > 0) {
        let count = 0;
        formRefs.forEach((form) => form.validate((is) => is && count++));
        if (count == formRefs.length) {
          call && call();
        } else {
          err && err();
        }
      }
    },
    close() {
      const formRefs = this.findElForm();
      formRefs.forEach((form) => form.resetFields());
    },
    beforeClose(done) {
      if (this.$attrs.beforeClose) {
        this.$attrs.beforeClose(done);
      } else {
        if (!this.loading) done();
      }
    },
    findElForm(vm = this, refs = []) {
      vm.$children.forEach((item) => {
        if (
          item.$options._componentTag == "el-form" &&
          item.$el &&
          item.$el.offsetParent !== null
        ) {
          refs.push(item);
        }
        this.findElForm(item, refs);
      });
      return refs;
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>

<style>
.agel-form-dialog .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.4);
}

.ag-center-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ag-dialog .el-dialog__header {
  border-bottom: 1px solid #ebeef5;
  background: #307dff;
  padding: 10px 20px 10px;
}

.ag-dialog .el-dialog__title {
  color: white;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 2px;
}

.ag-dialog .el-dialog__headerbtn {
  top: 15px;
}

.ag-dialog .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

.ag-dialog .el-dialog__body {
  background: #f5f5f5;
  padding: 10px;
}

.ag-dialog .ag-dialog-body {
  padding: 20px 20px;
  background: #fff;
  overflow: auto;
}

.ag-dialog .el-dialog__footer {
  padding: 10px 20px 10px;
  background: #ffffff;
  border-top: 1px solid #eee;
}
</style>