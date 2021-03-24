import agelRadioGroup from "./agel-radio-group.vue";
import agelCheckboxGroup from "./agel-checkbox-group.vue";
import agelSelect from "./agel-select.vue";
import agelUpload from "./agel-upload.vue";
import agelInputTree from "./agel-input-tree.vue";

export default {
  "agel-radio-group": agelRadioGroup,
  "agel-checkbox-group": agelCheckboxGroup,
  "agel-select": agelSelect,
  "agel-upload": agelUpload,
  "agel-input-tree": agelInputTree,
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
