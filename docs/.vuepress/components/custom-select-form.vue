<template>
  <div class="demo border">
    <agel-form v-model="form"></agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        data: {},
        items: [
          {
            prop: "region",
            component: "custom-select",
            label: "活动区域",
            options: [
              { label: "区域1", value: "区域1" },
              { label: "区域2", value: "区域2" },
              { label: "区域3", value: "区域3" },
            ],
          },
        ],
      },
    };
  },
};
</script>