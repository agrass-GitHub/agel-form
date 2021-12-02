<template>
  <el-descriptions v-bind="$attrs" v-on="$listeners">
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
    <template v-slot:extra>
      <slot name="extra"></slot>
    </template>
    <el-descriptions-item v-for="(item,key) in cells" :key="item.prop||key" v-bind="getItemPorps(item)">
      <slot-render slot="label" :render="item.label"></slot-render>
      <slot-render v-if="item.slot" :render="item.slot!==true?item.slot:$scopedSlots[item.prop||key]"></slot-render>
      <span v-else>{{data[item.prop||key]}}</span>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import slotRender from "agel-form/src/lib/slot-render";
import { each, getIncludeAttrs } from "agel-form/src/utils/utils";

const descriptionsItemPropkeys = [
  "label",
  "span",
  "labelClassName",
  "contentClassName",
  "labelStyle",
  "labelStyle",
];

export default {
  name: "agel-descriptions",
  inheritAttrs: false,
  components: {
    slotRender,
  },
  props: {
    option: Object,
    items: {
      type: [Array, Object],
      default: () => new Array(),
    },
    data: {
      type: Object,
      default: () => new Object(),
    },
  },
  computed: {
    cells() {
      return each(
        this.items,
        (item, i, key) => {
          return {
            ...item,
            prop: item.prop || key,
            display:
              typeof item.display == "function"
                ? item.display(item, key)
                : item.display !== false,
          };
        },
        "map"
      ).filter((v) => v.display);
    },
  },
  methods: {
    getItemPorps(item) {
      const prosp = getIncludeAttrs(descriptionsItemPropkeys, item);
      if (typeof prosp.label !== "string") prosp.label = "";
      return prosp;
    },
  },
};
</script>

<style>
</style>