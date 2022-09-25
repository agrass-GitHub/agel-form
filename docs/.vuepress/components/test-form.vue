<template>
  <div class="demo border">
    <!-- <render-component render="el-input" :options="options" isTag>
        <i slot="prefix" class="el-icon-platform-eleme"> </i>
      <el-button slot="option" slot-scope="{option}">{{option.label}}</el-button>
    </render-component> -->

    <!-- <render-component render="el-dropdown" isTag>
      <el-button>测试</el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </render-component> -->

    <agel-form v-model="form"></agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
    
      form: {
        span: 15,
        data: {
          guide: {
            name: "使用 agel-form",
            desc: "素人开发,若你决定尝试,有什么问题可以联系本人微信:agrass-weixin",
          },
          delivery: true,
          slider: 20,
          tags: ["游乐园"],
        },
        items: [
          {
            component: "el-button",
            slots: {
              default: () => {
                return "成功";
              },
            },
          },
          {
            prop: "demo6",
            label: "插槽样式",
            component: "el-select",
            options: [
              { value: "Shanghai", label: "上海" },
              { value: "Beijing", label: "北京" },
            ],
            slots: {
              option: ({ option, index }) => {
                return (
                  <div>
                    <span style="float: left">{option.label}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">
                      {option.value}
                    </span>
                  </div>
                );
              },
              prefix: () => {
                let style = "color:#409EFF;line-height:28px;font-size:20px";
                return <i class="el-icon-platform-eleme" style={style} />;
              },
            },
          },
        ],
      },
    };
  },
};
</script>