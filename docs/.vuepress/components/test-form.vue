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
        items: [
          {
            prop: "demo0",
            label: "字符串",
            component: "el-select",
            options: "北京,上海,重庆",
            multiple: true,
          },
          {
            prop: "demo1",
            label: "字符串数组",
            component: "el-select",
            options: ["北京", "上海"],
            multiple: true,
          },
          {
            prop: "demo2",
            label: "对象数组",
            component: "el-select",
            options: [
              { label: "北京", value: "Beijing", disabled: true },
              { label: "上海", value: "Shanghai" },
            ],
          },
          {
            prop: "demo3",
            label: "Promise对象",
            component: "el-select",
            options: this.$http.get("/api/getRandomData"),
          },
          {
            prop: "demo4",
            label: "Function函数",
            component: "el-select",
            clearable: true,
            options: async () => {
              let data = await this.$http.get("/api/getRandomData");
              return data;
            },
          },
          {
            prop: "button",
            component: "el-button",
            type: "primary",
            slots: "点击属性 options",
            labelWidth:"0px",
            span: 12,
            on: {
              click: () => {
                const vm = this.form.getRef("demo4");
                vm.getOptions();
                vm.focus();
              },
            },
          },
          {
            prop: "demo5",
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
          {
            prop: "demo7",
            label: "远程搜索",
            component: "el-select",
            remote: true,
            filterable: true,
            multiple: true,
            reserveKeyword: true,
            loading: false,
            placeholder: "请输入1进行远程搜索",
            options: [],
            remoteMethod: (query) => {
              let vm = this.form.getItem("demo7");
              if (query !== "") {
                vm.loading = true;
                setTimeout(() => {
                  vm.options = query == "1" ? ["1k", "1w"] : [];
                  vm.loading = false;
                }, 200);
              } else {
                vm.options = [];
              }
            },
          },
          {
            prop: "demo8",
            label: "创建条目",
            component: "el-select",
            multiple: true,
            filterable: true,
            allowCreate: true,
            defaultFirstOption: true,
            options: ["HTML", "CSS", "JavaScript"],
          },
        ],
      },
    };
  },
};
</script>