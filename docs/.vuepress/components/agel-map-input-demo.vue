<template>
  <div class="demo border">
    <el-row type="flex" style="margin-bottom:10px;">
      <el-col :span="4">经纬度地址：</el-col>
      <agel-map-input v-model="lnglat" editable></agel-map-input>
    </el-row>
    <el-row type="flex">
      <el-col :span="4">纯文本地址：</el-col>
      <agel-map-input v-model="address"></agel-map-input>
    </el-row>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      lnglat: ["重庆市洪崖洞民俗风貌区", 106.579125, 29.562283],
      address: "重庆市洪崖洞民俗风貌区",
    };
  },
};
</script>