import { getIncludeAttrs, extend, findRef } from "../utils/utils"

import {
  formPropKeys,
  gridPropKeys,
  tablePropsKeys,
  descriptionsPropkeys,
} from "../utils/const"

const layoutPropMap = {
  inline: [],
  grid: gridPropKeys,
  descriptions: descriptionsPropkeys,
  tableditor: tablePropsKeys,
}

export default {
  name: "agel-form",
  inheritAttrs: false,
  props: {
    value: {
      required: true,
      type: Object,
      default: () => new Object(),
    },
    attach: {
      type: Object,
      default: () => new Object(),
    },
    itemExtendKeys: {
      type: Array,
      default: () => new Array(),
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: function (newv, oldv) {
        if (newv === oldv) return
        extend(this.value, {
          layout: "grid",
          items: [],
          data: {},
          getRef: this.getRef,
          getItem: this.getItem,
          validate: this.validate,
          resetFields: this.resetFields,
          clearValidate: this.clearValidate,
        }, this.$set)
      },
    },
    attach: {
      deep: true,
      immediate: true,
      handler: function () {
        extend(this.value, this.attach, this.$set, true)
      },
    },
  },
  methods: {
    getRef(prop = "elForm") {
      return findRef(this, prop)
    },
    getItem(prop, deep) {
      return this.$refs.agLayout.getItem(prop, deep)
    },
    validate(callback, erroCallback) {
      this.$refs.elForm.validate((is) => {
        if (is) {
          callback && callback(this.value.data)
        } else {
          erroCallback && erroCallback()
        }
      })
    },
    resetFields() {
      this.$refs.elForm.resetFields()
    },
    clearValidate(props) {
      this.$refs.elForm.clearValidate(props)
    },
  },
  provide() {
    return {
      wrapForm: this,
    }
  },
  render(h) {
    const option = this.value
    const { on, layout, items, data } = option
    const config = (this.$agelFormConfig || {})['form'] || {}
    const FormWithLayoutOption = Object.assign({}, config, option)
    const layoutName = "agel-form-" + layout
    const layoutProps = {
      items: items,
      value: data,
      itemExtendKeys: this.itemExtendKeys,
      ...getIncludeAttrs(layoutPropMap[layout], FormWithLayoutOption),
    }
    const formProps = getIncludeAttrs(formPropKeys, FormWithLayoutOption)
    formProps.model = option.data;
    formProps["label-width"] = formProps["label-width"] || "auto"

    if (layout === 'tableditor') {
      formProps.model = { dynamicData: option.data }
      layoutProps.modelProp = "dynamicData"
    }

    return h("el-form", { class: "agel-form", attrs: formProps, on: on, ref: "elForm" }, [
      h(layoutName, {
        attrs: layoutProps,
        scopedSlots: this.$scopedSlots,
        on: on,
        ref: "agLayout",
      })
    ])
  },
}


