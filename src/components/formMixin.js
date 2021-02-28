export default {
  props: {
    value: [Number, String, Array, Boolean],
    on: {
      type: Object,
      default: () => new Object()
    }
  },
  data() {
    return {}
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
