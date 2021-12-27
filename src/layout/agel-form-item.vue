<template>
  <el-form-item v-bind="$attrs" label="" :required="false" :rules="rules" :class="className">
    <slot slot="label" name="label">
      <render-component v-if="label" :render="label" />
    </slot>
    <slot>
      <render-component v-if="component.name" :value="value" :render="component.name" v-on="component.on" v-bind="component.attrs" @input="input"
        ref="component" :is-tag="component.isTag">
        <template v-for="(slot,staticName) in slots.staticSlots" v-slot:[staticName]>
          <render-component :key="staticName" :render="slot" />
        </template>
        <template v-for="(slot,scopedName) in slots.scopedSlots" v-slot:[scopedName]="slotPorps">
          <render-component :key="scopedName" :render="slot" v-bind="slotPorps" />
        </template>
      </render-component>
    </slot>
  </el-form-item>
</template>
 
<script>
import renderComponent from "./render-component";

export default {
  name: "agel-form-item",
  inheritAttrs: false,
  components: {
    renderComponent,
  },
  props: {
    // Object[Vnode]
    label: [String, Number, Object, Array, Function],
    // 生成必填 rules
    required: Boolean,
    // 组件 value
    value: {},
    // 组件对象结构
    component: {
      type: Object,
      default: () => {
        return {
          name: "",
          vmodel: true,
          attrs: {},
          slots: {},
          on: {},
        };
      },
    },
  },
  computed: {
    className() {
      const name = this.component.name;
      const nameClass =
        name && typeof name === "string" ? "form-item-" + name : "";
      return ["agel-form-item", nameClass];
    },
    rules() {
      const inputArr = ["el-input", "el-input-number", "el-autocomplete"];
      const arr = this.$attrs.rules || [];
      const rules = Array.isArray(arr) ? [...arr] : [arr];
      if (this.required) {
        rules.push({
          required: true,
          trigger: inputArr.includes(this.component.name) ? "blur" : "change",
          message:
            typeof this.label === "string" ? this.label + "必填" : "该字段必填",
        });
      }
      return rules;
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
    isRenderLabel() {
      return typeof this.label !== "string";
    },
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
      this.$emit("input", value);
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

/* 对 checkbox radio 在 label-top 情况下的展示优化*/
.el-form--label-top .form-item-agel-checkbox .el-form-item__content,
.el-form--label-top .form-item-agel-radio .el-form-item__content {
  display: inline-block;
}

/*  对某些组件排版进行优化 */
.agel-form-item.el-form-item--mini .el-slider__runway {
  margin: 12px 0px;
}
</style>
 
