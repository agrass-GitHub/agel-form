import slotRender from "../lib/slot-render.js";
import { isEmpty } from "element-ui/src/utils/util";
import { isVNode } from "element-ui/src/utils/vdom";

export default {
  components: {
    slotRender,
  },
  props: {
    // 表单绑定的值
    value: {
      require: true,
    },
    // 组件的具名插槽对象，当只存在 default 的时候可以省略对象写法  slots:{default:slot} ==>  slots:slot
    // slot类型 Vnode,String,Number,Array[Vnode],Render Funciton
    slots: {
      type: [Object, String, Number, Array, Function],
    },
    // 组件的 event 事件对象
    on: {
      type: Object,
      default: () => new Object()
    }
  },
  computed: {
    scopedSlots() {
      if (isEmpty(this.slots)) return this.$scopedSlots
      if (this.slots.constructor !== Object || isVNode(this.slots)) {
        return { default: agItem.slots };
      } else {
        return this.slots
      }
    },
  },
  methods: {
    input(v) {
      this.$emit("input", v);
      if (this.on.input) this.on.input(v);
    },
  },
};
