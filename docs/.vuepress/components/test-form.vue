<template>
  <div class="demo">
    <el-button @click="search.show=true">打开抽屉弹窗</el-button>
    <agel-form-drawer :search="search"> </agel-form-drawer>

  </div>
</template>
 
<script>
export default {
  data() {
    return {
      search: {
        show: false,
        data: {
          date: [],
          chaosubi: [0, 150],
          shifouchuli: "未处理",
          shifoushenshu: "未申诉",
          isAccessArea: "全部",
          shenshuhuifu: "全部",
          status: "全部",
        },
        items: {
          date: {
            component: "el-date-picker",
            label: "推送时间",
            type: "daterange",
            placeholder: "请选择推送时间",
            clearable: false,
            "unlink-panels": true,
            "picker-options": {
              disabledDate: (date) => date.valueOf() > Date.now(),
            },
          },
          cheliangpaizhao: {
            label: "车牌号码",
            placeholder: "请输入车牌号码",
          },
          roadName: {
            label: "道路名称",
            placeholder: "请输入道路名称",
          },
          shifouchuli: {
            component: "el-select",
            label: "是否处理",
            options: [
              { label: "全部", value: "全部" },
              { label: "已处理", value: "已处理" },
              { label: "未处理", value: "未处理" },
            ],
          },
          shifoushenshu: {
            component: "el-select",
            label: "是否申诉",
            options: [
              { label: "全部", value: "全部" },
              { label: "已申诉", value: "已申诉" },
              { label: "未申诉", value: "未申诉" },
            ],
          },
          shenshuhuifu: {
            component: "el-select",
            label: "是否申诉回复",
            span: 24,
            options: [
              { label: "全部", value: "全部" },
              { label: "已回复", value: "已回复" },
              { label: "未回复", value: "未回复" },
            ],
          },
          isAccessArea: {
            component: "el-select",
            label: "报警类型",
            options: [],
          },
          status: {
            component: "el-select",
            label: "报警等级",
            options: [],
          },
          chaosubi: {
            component: "el-slider",
            label: "超速比范围",
            min: 0,
            max: 200,
            range: true,
            display: false,
          },
        },
      },
    };
  },
  methods: {},
};
</script>