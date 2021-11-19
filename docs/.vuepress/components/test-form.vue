<template>
  <div class="demo border">
    <!-- 
    <el-button type="primary" style="margin-left:100px" @click="getOptions">刷新 options</el-button>
    <el-button type="primary" @click="getRef">获取组件实例（查看控制台）</el-button>
    <el-button type="primary" @click="getItem">获取组件Item（查看控制台）</el-button> -->

    <agel-form style="width:100%" v-model="form"> </agel-form>

    <el-button type="primary" @click="getOptions">获取组件Item（查看控制台）</el-button>

    <el-button type="primary" @click="getOptions2">xxxxxxxxxxx</el-button>

    <!-- <agel-tree-select v-model="form.data.tree1" :options="treeData" @change="change" node-key="value"  clearable >
      <span slot="option" class="custom-tree-node" slot-scope="{ node }">
        <i class="el-icon-eleme" style="color:#409EFF;margin-right:5px"></i>
        <span>{{ node.label }}</span>
      </span>
    </agel-tree-select> -->
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
      },
    ],
  },
];

export default {
  data() {
    return {
      treeData,
      restaurants: [],
      form: {
        labelWidth: "100px",
        // span: 12,
        inline: true,
        data: {},
        items: [
          // {
          //   prop: "tree1",
          //   label: "普通树形",
          //   component: "el-tree-select",
          //   nodeKey: "value",
          //   multiple: true,
          //   style: "width:200px",
          //   options: async () => {
          //     let data = await this.$http.get("/api/getRandomTreeData");
          //     return data;
          //   },
          // },
          // {
          //   prop: "tree2",
          //   label: "普通树形",
          //   component: "el-radio",
          //   // multiple: true,
          //   style: "width:250px",
          //   options: async () => {
          //     let data = await this.$http.get("/api/getRandomData");
          //     return data;
          //   },
          // },
          {
            prop: "tree4",
            label: "xx",
            component: "el-input-number",
          },
          {
            prop: "tree3",
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
                const data = [{ name: "leaf", leaf: true }, { name: "zone" }];
                resolve(data);
              }, 500);
            },
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    getOptions() {
      this.form.getRef("tree2").getOptions();
    },
    getOptions2() {
      this.form.data.tree2 = "1,2";
    },
    getRef() {
      let tree = this.form.getRef("tree1");
      console.log(" ------ agel-tree-select 实例------ ", tree);
      console.log(" ------ el-tree 实例------", tree.$refs.ref);
      console.log(" ------ el-select 实例------", tree.$refs.select);
    },
    getItem() {
      this.form.data.tree1 = "2";
    },
    change(v) {
      console.log("change", v);
    },
  },
};
</script>