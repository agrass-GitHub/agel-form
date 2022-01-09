<template>
  <div class="agel-dynamic-tags">
    <el-tag v-for="(tag,index) in value" :key="tag+'-'+index" :disable-transitions="true" v-bind="getTagProps(tag,index)"
      @close="handleClose(tag,index)" @click="handleClick(tag,index)">
      <span>{{tag}}</span>
    </el-tag>
    <template v-if="createable">
      <el-input v-if="inputVisible" class="new-tag-input" v-model="inputValue" disable-transitions :disabled="isDisabled" ref="saveTagInput"
        @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="new-tag-button" :disabled="isDisabled" @click="showInput">+ New Tag</el-button>
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
      default: () => new Array(),
    },
    createable: {
      type: Boolean,
      default: true,
    },
    repeatable: {
      type: Boolean,
      default: false,
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
    //  el-form 全局 disabled
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
      if (props.closable == undefined) props.closable = true;
      if (this.isDisabled) props.closable = false;
      return props;
    },
    handleClose(tag, index) {
      let value = [].concat(this.value);
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
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue && this.value.indexOf(inputValue) == -1) {
        this.$emit("input", this.value.concat(this.inputValue));
        this.$emit("create", inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style>
.agel-dynamic-tags .el-tag {
  height: 28px;
  line-height: 26px;
  padding: 0 10px;
  margin-right: 10px;
}

.agel-dynamic-tags .new-tag-input {
  height: 28px;
  width: 90px;
  vertical-align: bottom;
}

.agel-dynamic-tags .new-tag-input .el-input__inner {
  height: 28px;
  line-height: 28px;
}

.agel-dynamic-tags .new-tag-button {
  width: 90px;
  height: 28px;
  line-height: 28px;
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>