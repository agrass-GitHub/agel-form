<template>
  <div class="demo">
    <agel-search-panel :form="form" @search="getList">
      <template v-slot:address>
        <el-input v-model="form.data.address" style="width:100px"></el-input>
      </template>
      <template v-slot:button>
        <el-button>新增</el-button>
      </template>
    </agel-search-panel>
    <!-- 列表 -->
    <el-table v-loading="loading" :data="tableData" style="width: 100%" height="200px" border>
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        panelPosition: "right",
        searchButton: {
          text: "搜索",
        },
        data: {
          address: "agel-form",
        },
        items: [
          { prop: "name", label: "姓名", style: "width:100px" },
          { prop: "address", label: "地址", slot: true },
        ],
      },
      tableData: [],
      loading: false,
    };
  },
  methods: {
    getList() {
      this.loading = true;
      setTimeout(() => {
        this.tableData = [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ];
        this.loading = false;
      }, 1000);
    },
  },
};
</script>