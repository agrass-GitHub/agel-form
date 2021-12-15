<template>
  <div class="demo border">
    <agel-upload v-model="value" :action="action" list-type="picture-card"></agel-upload>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      value: [
        {
          name: "这是一个图片文件.png",
          url: "https://cn.vuejs.org/images/components.png",
        },
      ],
      action: "/xxx/upload",
    };
  },
};
</script>