export default {
  name: "solt-render",
  functional: true,
  props: ["render"],
  render(h, context) {
    let render = context.props.render;
    if (typeof render == "function") return render(h);
    if (typeof render == "string") return h('span', null, render)
    return render;
  },
}