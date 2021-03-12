export default {
  props: {
    value: {
      required: true,
    },
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
