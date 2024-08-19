<template>
  <agelMapInputDemo v-if="load"></agelMapInputDemo>
</template>

<script>
import agelMapInputDemo from "./agel-map-input-demo.vue";
export default {
  components: {
    agelMapInputDemo,
  },
  data() {
    return {
      load: false,
    };
  },
  mounted() {
    import("@amap/amap-jsapi-loader").then((module) => {
      const AMapLoader = module.default;
      window._AMapSecurityConfig = {
        securityJsCode: "cf97d613b904fbea6291d1809b8674d5",
      };
      AMapLoader.load({
        key: "2693b9843374215a41f585aa4114fc32",
        plugins: ["AMap.PlaceSearch", "AMap.Autocomplete", "AMap.Geocoder"],
      }).then((AMap) => {
        window.AMap = AMap;
        this.load = true;
      });
    });
  },
};
</script>

<style>
</style>