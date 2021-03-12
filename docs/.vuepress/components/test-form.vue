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
          region: {
            label: "活动区域",
            component: "el-select",
            filter: true,
            clearable: true,
            props: { label: "name", value: "id", options: "options" },
            options: [
              {
                name: "热门城市",
                options: [
                  {
                    id: "Shanghai",
                    name: "上海",
                  },
                  {
                    id: "Beijing",
                    name: "北京",
                  },
                ],
              },
              {
                name: "城市名",
                options: [
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
            on: {
              change: (v) => {
                console.log(v);
              },
            },
          },
        },
      },
    };
  },
};
</script>