<template>
  <agel-search-panel class="demo border" :form="form"> </agel-search-panel>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        collapse: true,
        collapseAlive: ["name1"],
        collapseButton: true,
        searchButton: { text: "搜索" },
        resetButton: { text: "初始化" },
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