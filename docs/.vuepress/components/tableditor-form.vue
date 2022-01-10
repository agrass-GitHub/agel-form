<template>
  <div class="demo border">
    <agel-form v-model="form">
      <el-table-column slot="prepend" label="#" type="selection" align="center" :width="50"></el-table-column>
      <tableditor-menu-column slot="append" :data="form.data" :add="addRow" :edit="saveRow" :del="delRow" delConfirm></tableditor-menu-column>
    </agel-form>
    <div style="margin-top:10px">
      <el-button type="primary" @click="validateRow">验证某一行表单</el-button>
      <el-button type="primary" @click="getRef">获取Table组件实例</el-button>
    </div>
  </div>
</template>
 
<script>
// import { tableditorMenuColumn } from "agel-form"
export default {
  data() {
    return {
      form: {
        layout: "tableditor",
        maxHeight: "300px",
        data: [
          {
            name: "表单1",
            region: "区域1",
            date: "2021-1-10",
            delivery: true,
            _view_: true,
          },
          {
            name: "表单2",
            region: "区域1",
            date: "2021-1-10",
            delivery: true,
            _view_: true,
          },
          { name: "表单3", delivery: false, _view_: false },
          { name: "表单4", delivery: true, _view_: false },
          { name: "表单5", delivery: true, _view_: false },
        ],
        items: [
          {
            label: "名称",
            prop: "name",
            required: true,
            width: "100px",
            "show-overflow-tooltip": true,
            viewModel: true,
            viewFormat: ({ value }) => {
              return <el-tag disable-transitions> {value} </el-tag>;
            },
          },
          {
            label: "即时配送",
            prop: "delivery",
            component: "el-switch",
            viewFormat: ({ value }) => {
              return (
                <el-tag disable-transitions>
                  {value ? "即时配送" : "延时配送"}
                </el-tag>
              );
            },
          },
          {
            component: "el-select",
            label: "活动区域",
            prop: "region",
            required: true,
            component: "el-select",
            options: ["区域1", "区域2"],
            width: "150px",
          },
          {
            label: "活动时间",
            prop: "date",
            component: "el-date-picker",
            width: "150px",
          },
        ],
        on: {
          // 可以触发 el-table event
          "selection-change": (selection) => {
            this.$message.info(`已选取${selection.length}条数据`);
          },
        },
      },
    };
  },
  methods: {
    addRow(done) {
      done({ name: "表单" + (this.form.data.length + 1), _view_: false });
    },
    saveRow(done, { row }) {
      //此处模拟 http 请求 保存
      setTimeout(() => {
        const isok = row.region == "区域1";
        isok
          ? this.$message.success("保存成功")
          : this.$message.error("保存失败,活动区域需要设置区域1");
        done(isok);
      }, 1500);
    },
    delRow(done, columnScope) {
      //此处模拟 http 请求 删除
      setTimeout(() => {
        this.$message.success("删除成功");
        done();
      }, 1500);
    },
    validateRow() {
      this.form.getRef("agLayout").validateRow(2, () => {
        this.$message.success("验证成功");
      });
    },
    getRef() {
      this.$message.success("获取组件实例成功，查看控制台");
      console.log("---------- el-table 实例 ----------");
      console.log(this.form.getRef("elTable"));
    },
  },
};
</script>