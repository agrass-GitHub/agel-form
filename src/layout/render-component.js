/**
 * render-component 
 * @param {String, Number, Array[Vnode], Object[Vnode,Component], Function[async Component,render]}
 * @description 当渲染 Component 及插槽时 需使用 v-slot:name (√) | slot=name (x)
 */
export default {
  name: "render-component",
  functional: true,
  props: {
    render: {
      type: [String, Number, Object, Array, Function],
      require: true,
    },
    isComponent: Boolean
  },
  render(h, context) {
    const isComponentName = (v) => v && typeof v === 'string' && context.props.isComponent
    const isComponentInstance = (v) => v && typeof v === 'object' && typeof v.render === 'function'
    const isComponentAsyncFun = (v) => v && v.constructor.name === 'Promise'
    const isComponent = (v) => isComponentName(v) || isComponentInstance(v) || isComponentAsyncFun(v)
    const isVNode = (v) => v && typeof v === 'object' && v.constructor.name == 'VNode'
    const isText = (v) => (typeof v === "string" && !isComponentName(v)) || typeof v == "number"
    const isVNodes = (v) => Array.isArray(v) && v.length > 0 && v.every(k => isVNode(k))
    const fragments = (vnodes) => {
      if (vnodes.length == 1) return vnodes[0]
      const vnode = h('span', null, vnodes)
      setTimeout(() => {
        vnode.children.forEach((v, i) => {
          const vnodeElm = v.elm.parentNode
          vnodeElm.parentNode.insertBefore(v.elm, vnodeElm)
          if (i == vnode.children.length - 1) {
            vnodeElm.parentNode.removeChild(vnodeElm)
          }
        })
      }, 0)
      return vnode
    }
    const render = context.props.render;
    const value = typeof render === "function" ? render(context.data.attrs) : render
    if (isText(value)) return h('span', context.data, value)
    if (isComponent(value)) return h(value, context.data, context.children)
    if (isVNode(value)) return value
    if (isVNodes(value)) return fragments(value)
  },
}
