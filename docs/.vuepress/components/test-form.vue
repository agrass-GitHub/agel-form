<template>
  <div class="demo border">
    <el-select v-model="a.value"  filterable remote placeholder="请输入关键词" reserve-keyword :remote-method="a.remoteMethod" :loading="a.loading">
      <el-option v-for="item in a.options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>

    <agel-select v-model="b.value"   :options="b.options" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="b.remoteMethod" :loading="b.loading">
    </agel-select>

    <agel-tree-select v-model="c.value" multiple node-key="value" :options="c.data" filter  @input="c.input" @change="c.change">
    </agel-tree-select>

    <agel-checkbox v-model="b.value" :options="b.options" @input="b.input" @change="b.change">

    </agel-checkbox>
    <agel-form v-model="form"> </agel-form>

  </div>
</template>
 
<script>
// import { tableditorMenuColumn } from "agel-form"
// import { agelSelect } from "../../../src/index";
export default {
  data() {
    return {
      a: {
        value: [],
        loading: false,
        options: [],
        remoteMethod: (query) => {
          if (query !== "") {
            setTimeout(() => {
              this.a.options =
                query == "a"
                  ? [
                      { label: "0", value: "0" },
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                    ]
                  : [];
            }, 200);
          } else {
            this.a.options = [];
          }
        },
        input: (v) => {
          console.log("input", v);
        },
        change: (v) => {
          console.log("change", v);
        },
      },
      b: {
        value: "",
        loading: false,
        options: [],
        remoteMethod: (query) => {
          if (query !== "") {
            setTimeout(() => {
              this.b.options =
                query == "a"
                  ? [
                      { label: "0", value: "0" },
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "3", value: "3" },
                      { label: "4", value: "4" },
                    ]
                  : [];
            }, 200);
          } else {
            this.b.options = [];
          }
        },
        input: (v) => {
          console.log("input", v);
        },
        change: (v) => {
          console.log("change", v);
        },
      },
      c: {
        value: "1",
        data: [
          {
            label: "一级 1",
            value: "1",
            children: [
              {
                label: "二级 1-1",
                value: "1-1",
                children: [{ label: "三级 1-1-1", value: "1-1-1" }],
              },
            ],
          },
          { label: "二级 ", value: "2" },
        ],
        input: (v) => {
          console.log("input", v);
        },
        change: (v) => {
          console.log("change", v);
        },
      },
      form: {
        data: {},
        rules: {},
        items: [
          {
            component: "el-select",
            prop: "region",
            label: "远程搜索",
            remote: true,
            filterable: true,
            loading: false,
            reserveKeyword: true,
            options: [],
            remoteMethod: (query) => {
              const vm = this.form.getItem("region");
              vm.loading = true;
              if (query !== "") {
                setTimeout(() => {
                  vm.options =
                    query == "a"
                      ? [
                          { label: "0", value: "0" },
                          { label: "1", value: "1" },
                          { label: "2", value: "2" },
                          { label: "3", value: "3" },
                          { label: "4", value: "4" },
                        ]
                      : [];
                  vm.loading = false;
                }, 200);
              } else {
                vm.options = [];
              }
            },
            slots: {
              empty: () => {
                return <div>自定义空插槽</div>;
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    getRules() {},
    validateRow() {
      // agel-form-tableditor 实例
      console.log(this.form.getRef("layout"));
      this.form.getRef("layout").validateRow(2, () => {
        this.$message.success("验证成功");
      });
    },
    getRef() {
      console.log("---------- Table 实例 ----------");
      console.log(this.form.getRef("elTable"));
      console.log("----- 组件实例，index 为 2 prop 为 name 组件----");
      console.log(this.form.getRef("tableditor.2.name"));
      this.$message.info("获取实例成功，查看控制台");
    },
  },
};
</script>