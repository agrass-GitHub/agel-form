const vmodel = {
  get: (v, is) => is ? String(v).split(',').filter(v => v.trim() != "") : v,
  set: (v, is) => is ? Array.isArray(v) ? v.join() : "" : v
}

export default {
  props: {
    options: [String, Array, Function, Promise],
    props: {
      type: Object,
      default: () => {
        return { label: "label", value: "value" }
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
    ['input', 'change'].forEach(k => {
      if (this.$listeners[k]) {
        this.$listeners[k] = (v) => this.$emit(k, vmodel.set(v, this.isProxyStrValue))
      }
    })
  },
  watch: {
    options: {
      immediate: true,
      handler: "getOptions"
    },
  },
  computed: {
    isProxyStrValue() {
      return this.multiple && !Array.isArray(this.value)
    },
    proxyValue() {
      return vmodel.get(this.value, this.isProxyStrValue)
    },
  },
  methods: {
    async getOptions() {
      let options = this.options || []
      this.proxyOptions = []
      if (Array.isArray(options)) {
        this.proxyOptions = this.transformOptions(options)
      } else if (typeof options == "string") {
        this.proxyOptions = this.transformOptions(options.split(',').filter(v => v))
      } else if (typeof options == "function") {
        this.optionsLoading = true
        this.proxyOptions = this.transformOptions(await options())
        this.optionsLoading = false
      } else if (options instanceof Promise) {
        this.optionsLoading = true
        this.proxyOptions = this.transformOptions(await options)
        this.optionsLoading = false
      }
    },
    // 转化成标准的 [{label,value}] 结构
    transformOptions(options) {
      return options.map((option) => {
        if (option.constructor == Object) {
          const props = this.props
          const value = option[props.value]
          return {
            ...option,
            label: String(option[props.label]),
            value: this.isProxyStrValue && typeof value === 'number' ? String(value) : value,
            options: this.transformOptions(option.options || [])
          }
        } else if (option.constructor == String || option.constructor == Number) {
          return {
            label: String(option),
            value: this.isProxyStrValue && typeof option === 'number' ? String(option) : option
          }
        }
        return false
      }).filter(v => v !== false)
    },
    getValueOption(v) {
      const options = this.isGroup
        ? this.proxyOptions.reduce((a, b) =>
          (Array.isArray(a) ? a : a.options).concat(b.options)
        )
        : this.proxyOptions;
      const value = v ? vmodel.get(v, this.isProxyStrValue) : this.proxyValue;
      return this.multiple
        ? options.filter((v) => value.includes(v.value))
        : options.find((v) => value == v.value);
    },
  }
}
