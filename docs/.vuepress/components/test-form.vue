<template>
  <div>
    <agel-form class="demo" v-model="form">

    </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        "label-position": "right",
        "label-width": "80px",
        span: 13,
        data: {
          name: [
            {
              name: "food.jpeg",
              url:
                "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
            },
            {
              name: "food2.jpeg",
              url:
                "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
            },
          ],
        },
        items: {
          region: { label: "活动区域" },
          name: {
            label: "活动名称",
            component: "el-upload",
            drag: true,
            action: `/api/sp-upload/upload/upload`,
          },
        },
      },
    };
  },
};
</script>