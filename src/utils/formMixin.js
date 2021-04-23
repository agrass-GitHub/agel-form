import slotRender from "../lib/slot-render.js";

export default {
  components: {
    slotRender,
  },
  props: {
    // 表单绑定的值
    value: {},
    // 组件的插槽对象
    slots: {
      type: Object,
      default: () => new Object()
    },
    // 组件的 event 事件对象
    on: {
      type: Object,
      default: () => new Object()
    }
  },
  methods: {
    input(v) {
      this.$emit("input", v);
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
