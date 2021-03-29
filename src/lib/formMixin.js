export default {
  props: {
    value: {
      required: true,
    },
    slots: {
      type: Object,
      default: () => new Object()
    },
    on: {
      type: Object,
      default: () => new Object()
    }
  },
  methods: {
    input(v) {
      this.$emit("input", v);
    },
    getRef() {
      return this.$refs.ref;
    }
  }
};
