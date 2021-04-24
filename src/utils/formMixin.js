import slotRender from "../lib/slot-render.js";

export default {
  components: {
    slotRender,
  },
  props: {
    // 表单绑定的值
    value: {
      require: true,
    },
    // 组件的插槽对象
    slots: Object,
    // 组件的 event 事件对象
    on: {
      type: Object,
      default: () => new Object()
    }
  },
  computed: {
    scopedSlots() {
      return this.slots || this.$scopedSlots
    }
  },
  methods: {
    input(v) {
      this.$emit("input", v);
    },
  },
};
