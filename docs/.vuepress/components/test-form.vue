<template>
  <div class="demo border">
    <!-- 
    <el-button type="primary" style="margin-left:100px" @click="getOptions">刷新 options</el-button>
    <el-button type="primary" @click="getRef">获取组件实例（查看控制台）</el-button>
    <el-button type="primary" @click="getItem">获取组件Item（查看控制台）</el-button> -->

    <!-- <agel-form v-model="form"> </agel-form> -->

    <agel-tree-select v-model="form.data.tree1" :options="treeData" @change="change" node-key="value"  clearable >
      <span slot="option" class="custom-tree-node" slot-scope="{ node }">
        <i class="el-icon-eleme" style="color:#409EFF;margin-right:5px"></i>
        <span>{{ node.label }}</span>
      </span>
    </agel-tree-select>
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
      treeData,
      form: {
        labelWidth: "100px",
        span: 12,
        data: {
          tree1: "11111111",
          tree2: "1-1-1,2-1-1",
        },
        itemsx: [
          {
            prop: "tree1",
            label: "普通树形",
            component: "el-tree-select",
            nodeKey: "value",
            options: [],
            data: [],
          },
          {
            prop: "tree2",
            label: "多选树形",
            component: "el-tree-select",
            nodeKey: "value",
            multiple: true,
            leafOnly: true, // 只包含叶子节点
            options: treeData,
          },
          {
            prop: "tree3",
            label: "过滤树形",
            component: "el-tree-select",
            nodeKey: "value",
            filter: true,
            options: treeData,
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
          {
            prop: "tree5",
            label: "异步树形",
            component: "el-tree-select",
            nodeKey: "value",
            options: async () => {
              let data = await this.$http.get("/api/getRandomTreeData");
              return data;
            },
          },
          {
            prop: "tree6",
            label: "自定义树形",
            component: "el-tree-select",
            nodeKey: "value",
            options: this.$http.get("/api/getRandomTreeData"),
            renderContent: (h, { node, data, store }) => {
              return (
                <span class="custom-tree-node">
                  <i
                    class="el-icon-eleme"
                    style="color:#409EFF;margin-right:5px"
                  ></i>
                  <span>{node.label}</span>
                </span>
              );
            },
          },
        ],
        items: [
          {
            prop: "tree1",
            label: "普通树形",
            component: "el-tree-select",
            nodeKey: "value",
            options: treeData,
            slots: {
              option: ({ node, data }) => {
                return (
                  <span class="custom-tree-node">
                    <i
                      class="el-icon-eleme"
                      style="color:#409EFF;margin-right:5px"
                    ></i>
                    <span>{node.label}</span>
                  </span>
                );
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    getOptions() {
      this.form.getRef("tree5").getOptions();
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
    change(v){
      console.log('change',v)
    }
  },
};
</script>