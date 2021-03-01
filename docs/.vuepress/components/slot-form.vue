<template>
  <agel-form class="demo" v-model="form">
    <template slot="region">
      <span>这是一段 template 模板自定义文字</span>
    </template>
  </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        "label-position": "right",
        "label-width": "80px",
        span: 18,
        data: {},
        items: {
          name: {
            label: "活动名称",
            slot: (h) => {
              return h("span", {}, "这是一段 render 函数自定义文字");
            },
          },
          region: { label: "活动区域", slot: true },
          slider: {
            label: "触发事件",
            component: "el-slider",
            defaultValue: 10,
            on: {
              change: (v) => alert(v),
            },
          },
        },
      },
    };
  },
};
</script>