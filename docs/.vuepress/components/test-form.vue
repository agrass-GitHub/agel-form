<template>
  <div class="demo border">
    <agel-form v-model="form"></agel-form>
  </div>

</template>
 
<script>
export default {
  data() {
    return {
      checkedCities: [],
      cities: ["上海", "北京", "广州", "深圳"],
      value: "",
      form: {
        span: 24,
        data: {
          slotStyle: "感觉,非常,灵活",
        },
        items: {
          // checkbox2: {
          //   label: "随机数",
          //   component: "el-checkbox",
          //   max: 2,
          //   options: "感觉,非常,灵活",
          // },
          demo4: {
            label: "Function函数",
            component: "el-tree-select",
            clearable: true,
            multiple: true,
            options: async () => {
              let data = await this.$http.get("/api/getRandomData");
              return data;
            },
          },
          button: {
            component: "el-button",
            type: "primary",
            slots: "getValueOption",
            span: 24,
            on: {
              click: () => {
                console.log(this.form.getRef("demo4").getValueOption());
              },
            },
          },
          // checkbox: {
          //   label: "随机数",
          //   component: "el-checkbox",
          //   max: 2,
          //   options: async () => {
          //     let data = await this.$http.get("/api/getRandomData");
          //     return data;
          //   },
          //   on: {
          //     input(v) {
          //       console.log("input", v);
          //     },
          //   },
          // },
          button2: {
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