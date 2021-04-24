export default {
  name: "solt-render",
  functional: true,
  props: {
    render: [Function, Object, String, Number, Array],
    scopeProps: Object,
  },
  render(h, context) {
    let { render, scopeProps } = context.props;
    if (typeof render == "function") return render(scopeProps);
    if (typeof render == "string" || typeof render == "number") return h('span', null, render)
    // 判断是 vnode
    return render;
  },
}