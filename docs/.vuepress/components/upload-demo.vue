<template>
  <div class="demo border">
    <agel-upload v-model="value" action="api/xxx/upload" list-type="picture-card" :on-success="onSuccess"></agel-upload>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      value: [
        {
          name: "这是一个图片文件.png",
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        },
      ],
    };
  },
  methods: {
    onSuccess(res) {
      return { name: res.data.name, url: res.data.url };
    },
  },
};
</script>