<template>
  <agel-form class="demo border" v-model="form"></agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        span: 12,
        data: {
          demo0: "北京,重庆",
        },
        items: {
          demo0: {
            label: "字符串",
            component: "el-select",
            options: "北京,上海,重庆",
            multiple: true,
          },
          demo1: {
            label: "字符串数组",
            component: "el-select",
            options: ["北京", "上海"],
            multiple: true,
          },
          demo2: {
            label: "对象数组",
            component: "el-select",
            options: [
              { label: "北京", value: "Beijing", disabled: true },
              { label: "上海", value: "Shanghai" },
            ],
          },
          demo3: {
            label: "Promise对象",
            component: "el-select",
            options: this.$http.get("/api/getRandomData"),
          },
          demo4: {
            label: "Function函数",
            component: "el-select",
            clearable: true,
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
                const vm = this.form.getRef("demo4");
                vm.getOptions();
                vm.focus();
              },
            },
          },
          demo5: {
            label: "分组过滤",
            component: "el-select",
            filter: true,
            clearable: true,
            props: { label: "name", value: "id" },
            options: [
              {
                name: "热门城市",
                options: [
                  { id: "Shanghai", name: "上海" },
                  { id: "Beijing", name: "北京", disabled: true },
                ],
              },
              {
                name: "城市名",
                options: [
                  { id: "Chengdu", name: "成都" },
                  { id: "Shenzhen", name: "深圳" },
                  { id: "Guangzhou", name: "广州" },
                  { id: "Dalian", name: "大连" },
                ],
              },
            ],
          },
          demo6: {
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
        },
      },
    };
  },
};
</script>