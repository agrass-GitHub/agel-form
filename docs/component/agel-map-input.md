# MapInput 地图选择器

`agel-map-input` 组件是基于 `el-input`  `el-dialog`  `el-autocomplete` `AMap` `AMap.PlaceSearch` `AMap.Autocomplete` `AMap.Geocoder` 的封装组件，[高德地图 JSAPI 的加载](https://developer.amap.com/api/jsapi-v2/guide/abc/load)。


## 使用

`value` 支持 `array` `string` 两种类型，区别在于是否包含经纬度信息。

<ClientOnly><agel-map-input-demo/></ClientOnly>

::: details 点击查看代码
<<< @/docs/.vuepress/components/agel-map-input-demo.vue
:::

不管是使用 JSAPI Loader 还是 CDN 方式，首先要确认 `AMap` 及对应的插件正确的被引用，组件默认是取 `Window.AMap`，若你想按需加载高德地图，可使用 `AMap` 属性。

```vue
<template>
  <agel-map-input :AMap="mapLoader"></agel-map-input>
</template>
 
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  methods: {
    mapLoader(reslove, plugins) {
      AMapLoader.load({
        key: "xxxxxxxx",    // map key
        plugins: plugins,   // 所需要插件列表
      }).then((AMap) => reslove(AMap));
    },
  },
};
</script>
```

## MapInput Attributes

| 属性         | 类型            |  默认值  | 说明                                 | 
| ------------ | ------------    | ------ | ------------------------------------ | 
| value        | Array/String    | []     | 绑定值                |  
| AMap         | Function        | (cb)=> cb(Window.AMap)      | AMap Loader       |
| keywordSearch| Boolean         | true   | 是否可关键字检索            |  
| clearable    | Boolean         | true   | 是否可清空                |  
| editable     | Boolean         | false  | 是否可编辑                |  
| destroyDialogOnClose| Boolean  | false  | dialog 关闭时是否销毁     |

支持 [el-input 属性，事件，插槽](https://element.eleme.cn/#/zh-CN/component/input#input-attributes)

