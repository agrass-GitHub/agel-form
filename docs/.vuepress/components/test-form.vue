<template>
  <agel-search-panel class="demo border" :form="form">
    <el-button>测试</el-button>
    <el-button>测试2</el-button>
  </agel-search-panel>
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
        items: {
          // name1: { prop: "name1", label: "test1" },
          // name2: { prop: "name2", label: "test2", collapseAlive: true },
          // name3: { prop: "name3", label: "test3" },
          // name4: { prop: "name4", label: "test4" },
          // name5: { prop: "name5", label: "test5" },
          // name6: { prop: "name6", label: "test6" },
          name1: { label: "test1" },
          name2: { label: "test2", collapseAlive: true },
          name3: { label: "test3" },
          name4: { label: "test4" },
          name5: { label: "test5" },
          name6: { label: "test6" },
        },
      },
    };
  },
  methods: {},
};
</script>