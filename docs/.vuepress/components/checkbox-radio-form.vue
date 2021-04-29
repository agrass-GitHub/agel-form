<template>
  <agel-form class="demo border" v-model="form"></agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        span: 24,
        data: {
          slotStyle: "感觉,非常,灵活",
        },
        items: {
          borderStyle: {
            label: "border 样式",
            component: "el-checkbox",
            border: true,
            slots: "边框",
          },
          buttonStyle: {
            label: "button 样式",
            component: "el-radio",
            button: true,
            props: { label: "name", value: "id" },
            options: [
              { name: "男", id: "男" },
              { name: "女", id: "女" },
              { name: "中性", id: "中性" },
            ],
          },
          slotStyle: {
            label: "插槽 样式",
            component: "el-checkbox",
            options: ["感觉", "非常", "灵活"],
            slots: {
              option: ({ option, index }) => {
                return (
                  <el-tag>
                    {index}：{option.label}
                  </el-tag>
                );
              },
            },
          },
          radio: {
            label: "评价",
            component: "el-radio",
            options: ["好用", "一般", "糟糕"],
          },
          checkbox: {
            label: "随机数",
            component: "el-checkbox",
            max: 2,
            options: async () => {
              let data = await this.$http.get("/api/getRandomData");
              return data;
            },
          },
          button: {
            component: "el-button",
            type: "primary",
            slots: "刷新 options",
            span: 24,
            on: {
              click: () => {
                this.form.getRef("checkbox").getOptions();
              },
            },
          },
        },
      },
    };
  },
};
</script>