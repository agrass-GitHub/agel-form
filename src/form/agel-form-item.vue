<template>
  <el-form-item v-bind="$attrs" :prop="prop" label="" class="agel-form-item" ref="elFormItem">
    <slot slot="label" name="label">
      <render-component v-if="label" :render="label" />
    </slot>
    <slot>
      <render-component v-if="component.name" :value="field.v" :render="component.name" v-on="component.on" v-bind="component.attrs" @input="input"
        :ref="prop||'component'" :is-tag="component.isTag">
        <template v-for="(slot,staticName) in slots.staticSlots" v-slot:[staticName]>
          <render-component :key="staticName" :render="slot" />
        </template>
        <template v-for="(slot,scopedName) in slots.scopedSlots" v-slot:[scopedName]="slotProps">
          <render-component :key="scopedName" :render="slot" v-bind="slotProps" />
        </template>
      </render-component>
    </slot>
  </el-form-item>
</template>
 
<script>
import renderComponent from "./render-component";
import { getPropByPath } from "element-ui/src/utils/util";

export default {
  name: "agel-form-item",
  inheritAttrs: false,
  components: {
    renderComponent,
  },
  inject: ["elForm"],
  props: {
    prop: String,
    // Object[Vnode]
    label: [String, Number, Object, Array, Function],
    // 组件对象结构
    component: {
      type: Object,
      required: true,
    },
  },
  computed: {
    field() {
      return getPropByPath(this.elForm.model, this.prop || "", true) || {};
    },
    slots() {
      let slots = this.component.slots || {};
      let scopedSlots = {};
      let staticSlots = {};
      if (slots.constructor == Object) {
        for (const name in slots) {
          const slot = slots[name];
          if (slot.constructor == Function && slot.length > 0) {
            scopedSlots[name] = slot;
          } else {
            staticSlots[name] = slot;
          }
        }
      } else {
        staticSlots = { default: slots };
      }
      return { scopedSlots, staticSlots };
    },
  },
  created() {
    this.initDefaultValue();
  },
  methods: {
    input(value) {
      const vmodel = this.component.vmodel;
      if (vmodel === false) return;
      if (typeof vmodel == "string" && typeof value === "string") {
        if (vmodel == ".trim") {
          value = value.trim();
        } else if (vmodel == ".number" && !isNaN(parseFloat(value))) {
          value = parseFloat(value);
        }
      }
      this.field.o[this.field.k] = value;
    },
    initDefaultValue() {
      if (
        this.prop &&
        this.prop.indexOf("_aguid_") === -1 &&
        !this.field.o.hasOwnProperty(this.field.k)
      ) {
        this.$set(this.field.o, this.field.k, this.component.defaultValue);
      }
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>

<style>
.agel-form-item {
  margin-bottom: 18px;
}

.agel-form-item.el-form--label-top .el-form-item__label {
  padding: 0px;
}

.el-form--label-top .agel-form-item .el-form-item__label,
.el-form--label-top .agel-form-item .el-form-item__label {
  display: inline-block;
  padding: 0px 12px 0px 0px;
}

/*  对某些组件排版进行优化 */
.agel-form-item.el-form-item--mini .el-slider__runway {
  margin: 12px 0px;
}
</style>
 
