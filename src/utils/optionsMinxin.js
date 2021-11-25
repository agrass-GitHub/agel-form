
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
      proxyOptions: [],
      optionsLoading: false,
    }
  },
  created() {
    this.$listeners.input = this.proxyInput;
    this.$listeners.change = this.proxyChange;
  },
  watch: {
    options: {
      immediate: true,
      handler: "getOptions"
    },
    proxyOptions() {
      this.$nextTick(() => this.setSelected && this.setSelected())
    }
  },
  computed: {
    isProxy() {
      return this.multiple && !Array.isArray(this.value);
    },
    proxyValue() {
      return this.isProxy ?
        String(this.value).split(',').filter(v => v.trim() != "") :
        this.value;
    },
  },
  methods: {
    proxyInput(value) {
      if (value === this.value) return;
      if (this.isProxy) value = Array.isArray(value) ? value.join() : "";
      this.$emit("input", value);
    },
    proxyChange() {
      this.$nextTick(() => this.$emit("change", this.value))
    },
    async getOptions() {
      let options = this.options || [];
      this.proxyOptions = [];
      if (Array.isArray(options)) {
        this.proxyOptions = this.transformOptions(options);
      } else if (typeof options == "string") {
        this.proxyOptions = this.transformOptions(options.split(',').filter(v => v));
      } else if (typeof options == "function") {
        this.optionsLoading = true;
        this.proxyOptions = this.transformOptions(await options());
        this.optionsLoading = false;
      } else if (options instanceof Promise) {
        this.optionsLoading = true;
        this.proxyOptions = this.transformOptions(await options);
        this.optionsLoading = false;
      }
    },
    // 转化成标准的 [{label,value}] 结构
    transformOptions(options) {
      return options.map((option) => {
        if (option.constructor == Object) {
          const props = this.props;
          const value = option[props.value];
          return {
            ...option,
            label: String(option[props.label]),
            value: this.isProxy && typeof value === 'number' ? String(value) : value,
            options: this.transformOptions(option.options || [])
          };
        } else if (option.constructor == String || option.constructor == Number) {
          return {
            label: String(option),
            value: this.isProxy && typeof option === 'number' ? String(option) : option
          };
        }
        return false;
      }).filter(v => v !== false);
    },
    // 根据 value 获取对应的 option 数据
    getValueOption() {
      return this.multiple
        ? this.proxyOptions.filter((v) => this.value.includes(v.value))
        : this.proxyOptions.find((v) => this.value == v.value) || this.value;
    },
  }
};
