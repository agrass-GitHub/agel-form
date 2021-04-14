<template>
  <div class="demo">
    <agel-form v-model="form"> </agel-form>
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
        children: [
          {
            label: "三级 1-1-1",
            value: "1-1-1",
          },
        ],
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
        children: [
          {
            label: "三级 2-1-1",
            value: "2-1-1",
          },
        ],
      },
      {
        label: "二级 2-2",
        value: "2-2",
        children: [
          {
            label: "三级 2-2-1",
            value: "2-2-1",
          },
        ],
      },
    ],
  },
];
export default {
  data() {
    return {
      form: {
        "label-position": "right",
        "label-width": "80px",
        span: 18,
        data: {
          tree1: "2",
          tree2: ["1-1-1", "2-1-1"],
        },
        items: [
          {
            prop: "tree1",
            label: "普通树形",
            component: "el-tree-select",
            nodeKey: "value",
            data: treeData,
          },
          {
            prop: "tree2",
            label: "多选树形",
            component: "el-tree-select",
            nodeKey: "value",
            showCheckbox: true,
            leafOnly: true,
            data: treeData,
          },
          {
            prop: "tree3",
            label: "过滤树形",
            component: "el-tree-select",
            nodeKey: "value",
            filter: true,
            data: treeData,
          },
          {
            prop: "tree4",
            label: "懒加载树",
            component: "el-tree-select",
            nodeKey: "name",
            lazy: true,
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
                const data = [
                  {
                    name: "leaf",
                    leaf: true,
                  },
                  {
                    name: "zone",
                  },
                ];
                resolve(data);
              }, 500);
            },
          },
        ],
      },
    };
  },
  methods: {
    getRef() {
      console.log(this.form.getRef("tree1"));
    },
    getItem() {
      console.log(this.form.getItem("tree1"));
    },
  },
};
</script>