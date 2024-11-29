<template>
  <div class="agel-dynamic-tags">
    <el-tag v-for="(tag, index) in value" :key="tag + '-' + index" :disable-transitions="true"
      v-bind="getTagProps(tag, index)" @close="handleClose(tag, index)" @click="handleClick(tag, index)">
      <span>{{ tag }}</span>
    </el-tag>
    <template v-if="createable">
      <el-input v-if="inputVisible" class="new-tag-input" v-model="inputValue" disable-transitions
        :disabled="isDisabled" ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="new-tag-button" :disabled="isDisabled" @click="showInput">
        {{ buttonText }}
      </el-button>
    </template>
  </div>
</template>

<script>
import { getIncludeAttrs } from "../utils/utils";

export default {
  name: "agel-dynamic-tags",
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
      default: () => [],
    },
    createable: {
      type: Boolean,
      default: true,
    },
    repeatable: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      default: "+ New Tag",
    },
    disabled: Boolean,
    type: String,
    closable: String,
    hit: String,
    color: String,
    effect: String,
    tagPropHandle: Function,
  },
  data() {
    return {
      inputVisible: false,
      inputValue: "",
    };
  },
  computed: {
    isDisabled() {
      return this.elForm ? this.elForm.disabled : this.disabled;
    },
  },
  watch: {
    value() {
      if (this.elFormItem) this.elFormItem.$emit("el.form.change");
    },
  },
  methods: {
    getTagProps(tag, index) {
      const keys = ["closable", "type", "hit", "color", "effect"];
      const obj = this.tagPropHandle
        ? this.tagPropHandle(tag, index) || {}
        : {};
      const props = getIncludeAttrs(keys, Object.assign({}, this.$props, obj));
      if (props.closable === undefined) props.closable = true;
      if (this.isDisabled) props.closable = false;
      return props;
    },
    handleClose(tag, index) {
      const value = [...this.value];
      value.splice(index, 1);
      this.$emit("input", value);
      this.$emit("close", tag, index);
    },
    handleClick(tag, index) {
      this.$emit("click", tag, index);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        if (this.$refs.saveTagInput) {
          this.$refs.saveTagInput.$refs.input.focus();
        }
      });
    },
    handleInputConfirm() {
      const inputValue = this.inputValue.trim();
      if (inputValue && (!this.value.includes(inputValue) || this.repeatable)) {
        this.$emit("input", [...this.value, inputValue]);
        this.$emit("create", inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style scoped>
.agel-dynamic-tags .el-tag {
  height: 28px;
  line-height: 26px;
  padding: 0 10px;
  margin-right: 10px;
  margin-bottom: 8px;
}

.agel-dynamic-tags .new-tag-input {
  height: 28px;
  width: 90px;
  vertical-align: bottom;
  margin-bottom: 8px;
}

.agel-dynamic-tags .new-tag-input .el-input__inner {
  height: 28px;
  line-height: 28px;
}

.agel-dynamic-tags .new-tag-button {
  height: 28px;
  margin-bottom: 8px;
  line-height: 28px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
