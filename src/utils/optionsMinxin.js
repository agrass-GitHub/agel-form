export default {
  props: {
    options: [Array, Function, Promise],
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
    this.getOptions();
  },
  methods: {
    async getOptions() {
      let options = this.options || [];
      this.optionsData = [];
      if (Array.isArray(options)) {
        this.optionsData = this.getOptionsData(options);
      } else if (typeof options == "function") {
        let value = this.value;
        this.$emit('input', Array.isArray(this.value) ? [] : "")
        this.optionsLoading = true;
        this.optionsData = this.getOptionsData(await options());
        this.optionsLoading = false;
        // 清空 value，拿到数据重新赋值，刷新组件的选中状态
        this.$nextTick(() => {
          this.$emit('input', value)
        })
      } else if (options instanceof Promise) {
        this.optionsLoading = true;
        this.optionsData = this.getOptionsData(await options);
        this.optionsLoading = false;
      }
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
