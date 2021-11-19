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
      proxyInputing: false,
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
    proxyValue() {
      if (this.proxyInputing) return;
      this.setSelected && this.setSelected();  // 由组件外部修改 value 时触发
    },
    proxyOptions() {
      setTimeout(() => this.setSelected && this.setSelected(), 10)
    }
  },
  computed: {
    isMultipleStrValue() {
      return this.multiple && typeof this.value === "string";
    },
    proxyValue() {
      return this.isMultipleStrValue ? this.value.split(',').filter(v => v) : this.value;
    },
  },
  methods: {
    proxyInput(value) {
      if (value === this.value) return;
      this.proxyInputing = true;
      this.$emit("input", this.isMultipleStrValue ?
        (Array.isArray(value) ? value.filter(v => v).join(',') : "")
        : value
      )
      setTimeout(() => this.proxyInputing = false)
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
          const value = String(option[props.value]);
          return {
            ...option,
            label: String(option[props.label]),
            value: this.isMultipleStrValue && typeof value === 'number' ? String(value) : value,
            options: this.transformOptions(option.options || [])
          };
        } else if (option.constructor == String || option.constructor == Number) {
          return {
            label: String(option),
            value: this.isMultipleStrValue && typeof option === 'number' ? String(option) : option
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
