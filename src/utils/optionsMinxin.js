export default {
  props: {
    options: [String, Array, Function, Promise],
    props: {
      type: Object,
      default: () => {
        return { label: "label", value: "value" };
      },
    },
  },
  data() {
    return {
      optionsData: [],
      optionsLoading: false,
    }
  },
  created() {
    this.$listeners.input = this.optionsInput;
    this.getOptions();
  },
  computed: {
    optionsValue() {
      if (typeof this.value == "string" && this.multiple) {
        return this.value.split(',').filter(v => v)
      } else {
        return this.value
      }
    },
  },
  methods: {
    optionsInput(value) {
      if (value == this.value) return;
      if (typeof this.value == "string" && this.multiple) {
        this.$emit("input", Array.isArray(value) ? value.filter(v => v).join(',') : "")
      } else {
        this.$emit("input", value)
      }
    },
    async getOptions() {
      let options = this.options || [];
      this.optionsData = [];
      if (Array.isArray(options)) {
        this.optionsData = this.getOptionsData(options);
      } else if (typeof options == "string") {
        this.optionsData = this.getOptionsData(options.split(',').filter(v => v));
      } else if (typeof options == "function") {
        this.optionsLoading = true;
        this.optionsData = this.getOptionsData(await options());
        this.optionsLoading = false;
        // 刷新组件选中状态
        this.$nextTick(() => {
          this.setSelected && this.setSelected();
        })
      } else if (options instanceof Promise) {
        this.optionsLoading = true;
        this.optionsData = this.getOptionsData(await options);
        this.optionsLoading = false;
      }
    },
    getValueOption() {
      return this.multiple
        ? this.optionsData.filter((v) => this.value.includes(v.value))
        : this.optionsData.find((v) => this.value == v.value) || this.value;
    },
    getOptionsData(options) {
      let props = this.props;
      return options.map((item) => {
        let type = typeof item;
        if (type == "string" || type == "number") {
          return { label: item, value: item };
        } else if (type == "object") {
          return this.getOptionByProps ?
            this.getOptionByProps(item) :
            Object.assign({ label: item[props.label], value: item[props.value], item })
        }
      });
    }
  }
};
