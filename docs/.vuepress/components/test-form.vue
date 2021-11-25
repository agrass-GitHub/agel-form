<template>
  <div class="demo border">
    <agel-form v-model="form"> </agel-form>
    <el-button type="primary" style="margin-left:100px" @click="getOptions">刷新 options</el-button>
    <el-button type="primary" @click="getRef">获取组件实例（查看控制台）</el-button>
    <el-button type="primary" @click="getItem">获取组件Item（查看控制台）</el-button>
  </div>

</template>
 
<script>
const treeData = [
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
  {
    label: "一级 2",
    value: "2",
    children: [
      {
        label: "二级 2-1",
        value: "2-1",
        children: [{ label: "三级 2-1-1", value: "2-1-1" }],
      },
      {
        label: "二级 2-2",
        value: "2-2",
        children: [{ label: "三级 2-2-1", value: "2-2-1" }],
      },
    ],
  },
];
export default {
  data() {
    return {
      form: {
        labelWidth: "100px",
        span: 12,
        data: {
          tree1: 0,
          tree2: "1-1-1,2-1-1",
          tree4: ["leaf", "zone"],
        },
        items: [
          {
            prop: "tree1",
            component: "el-select",
            multiple: true,
            options: [
              { label: "000000000", value: 0 },
              { label: "111111111", value: 1 },
            ],
          },
          {
            prop: "tree4",
            label: "懒加载树",
            component: "el-tree-select",
            nodeKey: "name",
            lazy: true,
            multiple: true,
            props: {
              label: "name",
              children: "zones",
              isLeaf: "leaf",
            },
            load: (node, resolve) => {
              if (node.level === 0) {
                return resolve([{ name: "region" }]);
              }
              if (node.level > 1) return resolve([]);
              setTimeout(() => {
                const data = [{ name: "leaf", leaf: true }, { name: "zone" }];
                resolve(data);
              }, 500);
            },
            on: {
              change(v) {
                console.log(v);
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    getOptions() {
      this.form.getItem("tree1").options = ["我","不","知"];
    },
    getRef() {
      let tree = this.form.getRef("tree1");
      console.log(" ------ agel-tree-select 实例------ ", tree);
      console.log(" ------ el-tree 实例------", tree.$refs.ref);
      console.log(" ------ el-select 实例------", tree.$refs.select);
    },
    getItem() {
      console.log("items 可以是数组配置，getItem 快速获取对应对象进行修改");
      console.log(this.form.getItem("tree1"));
    },
  },
};
</script>