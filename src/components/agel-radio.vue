<template>
  <el-radio-group v-model="newVal" v-bind="$attrs"  v-on='events'>
    <component
      v-for="option of options"
      v-bind="option"
      :is="radioComponent"
      :key="option.value"
      :label="option.value"
    >
    </component>
  </el-radio-group>
</template>

<script>
import formMixin from "@/mixins/formMixin";

export default {
  name: "agel-radio",
  mixins:[formMixin],
  props: {
    value: [Boolean, Number, String],
    options: {
      type: Array,
      default: () => []
    },
    button: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    radioComponent() {
      return this.button ? "el-radio-button" : "el-radio";
    }
  },

};
</script>
