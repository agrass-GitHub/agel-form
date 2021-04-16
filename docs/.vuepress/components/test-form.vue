<template>
  <agel-form v-model="form" class="demo"></agel-form>
</template>
 
<script>
export default {
  name: "upload-form",
  data() {
    const generateData = (_) => {
      const data = [];
      const cities = ["上海", "北京", "广州", "深圳", "南京", "西安", "成都"];
      const pinyin = [
        "shanghai",
        "beijing",
        "guangzhou",
        "shenzhen",
        "nanjing",
        "xian",
        "chengdu",
      ];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index],
        });
      });
      return data;
    };
    return {
      form: {
        labelWidth: "100px",
        span: 18,
        data: {
          x1: "111111111",
        },
        items: {
          button1: {
            component: "el-button",
            ignore: true,
            slots: "initData",
            span: 6,
            on: {
              click: () => {
                this.form.initData();
              },
            },
          },
          button2: {
            component: "el-button",
            ignore: true,
            slots: "resetFields",
            span: 6,
            on: {
              click: () => {
                this.form.resetFields();
              },
            },
          },
          x1: {
            label: "input",
          },
          x2: {
            label: "el-date-picker",
            component: "el-date-picker",
            format: "yyyy-MM-dd",
          },
          x3: {
            label: "el-date-picker",
            component: "el-date-picker",
            type: "monthrange",
            clearable: true,
          },
          x4: {
            label: "el-select",
            component: "el-select",
            options: [{ label: "1", value: 1 }],
            clearable: true,
          },
          x5: {
            label: "el-select",
            component: "el-select",
            multiple: true,
            options: [{ label: "1", value: 1 }],
          },
          x6: {
            label: "el-switch",
            component: "el-switch",
          },
          x7: {
            label: "el-checkbox",
            component: "el-checkbox",
          },
          x9: {
            label: "el-input-number",
            component: "el-input-number",
          },
          x10: {
            label: "el-time-select",
            component: "el-time-select",
          },
          x11: {
            label: "el-cascader",
            component: "el-cascader",
            "show-all-levels": true,
            options: [
              {
                label: "1",
                value: 1,
                children: [
                  {
                    value: "table",
                    label: "Table 表格",
                  },
                  {
                    value: "tag",
                    label: "Tag 标签",
                  },
                ],
              },
              {
                label: "2",
                value: 2,
                children: [
                  {
                    value: "table",
                    label: "Table 表格",
                  },
                  {
                    value: "tag",
                    label: "Tag 标签",
                  },
                ],
              },
            ],
            clearable: true,
          },
          x12: {
            label: "el-cascader",
            component: "el-cascader",
            "show-all-levels": true,
            props: { multiple: true },
            options: [
              {
                label: "1",
                value: 1,
                children: [
                  {
                    value: "table",
                    label: "Table 表格",
                  },
                  {
                    value: "tag",
                    label: "Tag 标签",
                  },
                ],
              },
              {
                label: "2",
                value: 2,
                children: [
                  {
                    value: "table",
                    label: "Table 表格",
                  },
                  {
                    value: "tag",
                    label: "Tag 标签",
                  },
                ],
              },
            ],
            clearable: true,
          },
          x13: {
            label: "el-slider",
            component: "el-slider",
          },
          x14: {
            label: "el-rate",
            component: "el-rate",
          },
          x15: {
            label: "el-transfer",
            component: "el-transfer",
            data: generateData(),
          },
          files1: {
            label: "默认样式",
            component: "el-input-number",
            action: "/xxx/upload",
            onSuccess: (res) => {
              // 需要 return 一个包含 name，url 的对象 {name:"xx.jpg",url:'http://xxx.jpg}
              return { name: res.fileName, url: res.fileUrl };
            },
          },
        },
      },
    };
  },
};
</script>

