export default {
  name: "solt-render",
  functional: true,
  props: ["render"],
  render(h, context) {
    let props = context.props;
    return typeof props.render == "function" ? props.render(h) : props.render;
  },
}