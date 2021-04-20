
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
      if (Array.isArray(options)) {
        this.optionsData = this.getOptionsData(options);
      } else if (typeof options == "function") {
        this.optionsLoading = true;
        this.optionsData = this.getOptionsData(await options());
        this.optionsLoading = false;
      } else if (options instanceof Promise) {
        this.optionsLoading = true;
        this.optionsData = this.getOptionsData(await options);
        this.optionsLoading = false;
      }
    },
    getOptionsData(options) {
      let props = this.props;
      return options.map((opt) => {
        let type = typeof opt;
        if (type == "string" || type == "number") {
          return { label: opt, value: opt };
        } else if (type == "object") {
          return this.getOptionByProps ? this.getOptionByProps(opt) : {
            ...opt,
            label: opt[props.label],
            value: opt[props.value],
          }
        }
      });
    }
  }
};
