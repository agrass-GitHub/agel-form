
/**
 * render-component 
 * @param {String, Number, Array[Vnode], Object[Vnode,Component], Function[async Component,render]}
 * @description 当渲染插槽时 需使用 v-slot:name (√) | slot=name (x)
 */
export default {
  name: "render-component",
  functional: true,
  props: {
    render: {
      type: [String, Number, Object, Array, Function],
      required: true,
    },
    isTag: Boolean
  },
  render(h, context) {
    const isComponentName = (v) => v && typeof v === 'string' && context.props.isTag
    const isComponentInstance = (v) => v && typeof v === 'object' && typeof v.render === 'function'
    const isComponentAsyncFun = (v) => v && v instanceof Promise
    const isComponent = (v) => isComponentName(v) || isComponentInstance(v) || isComponentAsyncFun(v)
    const isVNode = (v) => v && typeof v === 'object' && v.hasOwnProperty('componentOptions')
    const isText = (v) => (typeof v === "string" && !isComponentName(v)) || typeof v == "number"
    const isVNodes = (v) => Array.isArray(v) && v.length > 0 && v.every(k => isVNode(k))
    const wrapvnode = (vnode) => {
      if (vnode.data && vnode.data.slot) {
        const vnodeTag = vnode.componentOptions ? vnode.componentOptions.tag : vnode.tag
        console.warn(`Invalid render：<${vnodeTag}> need use v-slot:name (√) || slot=name (x)`)
        delete vnode.data.slot
      }
      return vnode
    }
    const fragments = (vnodes) => {
      if (vnodes.length === 1) return wrapvnode(vnodes[0])
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
    const render = context.props.render
    const value = typeof render === "function" ? render(context.data.attrs) : render
    if (isText(value)) return h('span', context.data, value)
    if (isComponent(value)) return h(render, context.data, context.children)
    if (isVNode(value)) return wrapvnode(value)
    if (isVNodes(value)) return fragments(value)
  },
}
