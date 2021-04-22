export default {
  name: "solt-render",
  functional: true,
  props: {
    // Funciton/Vnode/String/Number/Array[Vnode]
    render: [Function, Object, String, Number, Array],
    scope: Object,
  },
  render(h, context) {
    let render = context.props.render;
    let scope = context.props.scope;
    if (typeof render == "function") return render(h, scope);
    if (typeof render == "string" || typeof render == "number") return h('span', null, render)
    // 判断是 vnode
    return render;
  },
}