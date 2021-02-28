export default {
  "agel-radio-group": () => import("./agel-radio-group.vue"),
  "agel-checkbox-group": () => import("./agel-checkbox-group.vue"),
  "agel-select": () => import("./agel-select.vue"),
  "agel-upload": () => import("./agel-upload.vue"),
  "agel-input-tree": () => import("./agel-input-tree.vue"),
  "slot-render": {
    name: "solt-render",
    functional: true,
    props: ["render"],
    render(h, context) {
      let props = context.props;
      return typeof props.render == "function" ? props.render(h) : props.render;
    },
  },
};
