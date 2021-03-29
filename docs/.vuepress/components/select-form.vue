<template>
  <agel-form class="demo" v-model="form"> </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        labelWidth: "80px",
        span: 12,
        data: {},
        items: {
          region: {
            label: "分组过滤",
            component: "el-select",
            filter: true,
            clearable: true,
            props: { label: "name", value: "id", options: "children" },
            options: [
              {
                name: "热门城市",
                children: [
                  {
                    id: "Shanghai",
                    name: "上海",
                  },
                  {
                    id: "Beijing",
                    name: "北京",
                    disabled: true,
                  },
                ],
              },
              {
                name: "城市名",
                children: [
                  {
                    id: "Chengdu",
                    name: "成都",
                  },
                  {
                    id: "Shenzhen",
                    name: "深圳",
                  },
                  {
                    id: "Guangzhou",
                    name: "广州",
                  },
                  {
                    id: "Dalian",
                    name: "大连",
                  },
                ],
              },
            ],
          },
          empty: {
            label: "插槽",
            component: "el-select",
            options: [],
            slots: {
              // default: () => {
              //   return <el-option value="1" label="插槽"></el-option>;
              // },
              prefix: () => {
                return <i class="el-icon-search"></i>;
              },
              empty: () => {
                return <div style="padding:10px">没有更多数据了</div>;
              },
            },
          },
        },
      },
    };
  },
};
</script>