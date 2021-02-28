<template>
  <el-form-item v-show="item.show" :prop="prop" :label="item.label" :label-width="item['label-width']" :required="item.required" :rules="item.rules">
    <slot-render v-if="item.slot" :render="$slots.default||item.slot"></slot-render>

    <!-- <component v-else-if="agComponentKeys.includes('ag'+item.component)" :is="'ag'+item.component" v-model="data[prop]" :attrs="item.attrs"
      :options="item.attrs.options" :button="item.attrs.button" :events="item.on">
    </component> -->

    <component v-else-if="agComponentKeys.includes('ag'+item.component)" :is="'ag'+item.component" v-model="data[prop]" v-bind="item.attrs">
    </component>

    <component v-else :is="item.component" v-model="data[prop]" v-bind="item.attrs" v-on="item.on">
    </component>
  </el-form-item>
</template>
 
<script>
import components from "./components/index";

export default {
  name: "agel-form-item",
  components,
  props: {
    prop: String,
    item: Object,
    data: Object,
  },
  data() {
    return {
      agComponentKeys: Object.keys(components),
    };
  },
  created() {
    if (!this.data.hasOwnProperty(this.prop)) {
      this.$set(this.data, this.prop, this.item.defaultValue);
    }
  },
  methods: {},
};
</script>
 
