import slotRender from "./slot-render.js";

export default {
  components: {
    slotRender,
  },
  props: {
    // 表单所绑定的值
    value: {
      required: true,
    },
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
    getRef() {
      return this.$refs.ref;
    }
  }
};
