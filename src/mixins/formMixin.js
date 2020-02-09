export default {
  props: {
    events: {
      type: Object,
      default: () => new Object()
    }
  },
  data() {
    return {
      newVal: this.value
    };
  },
  watch: {
    value() {
      this.newVal = this.value;
    },
    newVal() {
      this.$emit("input", this.newVal);
    }
  }
};
