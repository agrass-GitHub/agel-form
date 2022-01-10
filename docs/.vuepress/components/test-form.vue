<template>
  <div class="demo">
    <div>
      <span>拖拽宽度进度条查看响应式效果：</span>
      <el-slider v-model="width" :step="100" show-stops :min="300" :max="1600"></el-slider>
    </div>
    <div style="overflow:auto;">
      <agel-form class="border" v-model="form" :style="{width:width+'px'} "> </agel-form>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    let items = [];
    for (let i = 0; i < 8; i++) {
      items.push({ prop: "test" + i, label: "栅格" + (i + 1) });
    }
    return {
      width: 600,
      form: {
        layout: "grid",
        responsive: true,
        // 也可以通过配置 `responsiveMethod` 属性来自定义响应式规则
        // responsiveMethod: (width) => {
        //   return width < 500 ? {span:12,...el-col props } : {....}
        // },
        data: {},
        items: [
          {
            prop: "name",
            label: "不受影响",
            placeholder: "该组件 span 不受响应式影响",
            span: 24,
          },
          ...items,
        ],
      },
    };
  },
};
</script>
