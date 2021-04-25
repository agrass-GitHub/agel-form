import { isVNode } from "element-ui/src/utils/vdom";

export default {
  name: "solt-render",
  functional: true,
  props: {
    render: [Function, Object, String, Number, Array],
  },
  render(h, context) {
    let render = context.props.render;
    let scopeProps = context.data.attrs;
    if (typeof render == "function") return render(scopeProps);
    if (typeof render == "string" || typeof render == "number") return h('span', null, render);
    if (isVNode(render) || (Array.isArray(render) && render.every(v => isVNode(v)))) {
      return render
    }
  },
}