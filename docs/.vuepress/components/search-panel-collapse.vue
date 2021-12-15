<template>
  <agel-search-panel class="demo border" :form="search"> </agel-search-panel>
</template>
 
<script>
export default {
  data() {
    return {
      search: {
        collapseButton: true, // 显示折叠按钮
        collapse: true, // 默认折叠
        collapseAlive: ["name1"], // 不被折叠的 prop
        searchButton: { text: "搜索" }, // 配置按钮图标属性等
        resetButton: { text: "初始化" }, // 配置按钮图标属性等
        data: {},
        items: [
          { prop: "name1", label: "姓名1" },
          { prop: "name2", label: "姓名2", collapseAlive: true },
          { prop: "name3", label: "姓名3" },
          { prop: "name4", label: "姓名4" },
          { prop: "name5", label: "姓名5" },
          { prop: "name6", label: "姓名6" },
          { prop: "name7", label: "姓名7" },
        ],
      },
    };
  },
  methods: {},
};
</script>