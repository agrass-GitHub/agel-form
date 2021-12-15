<template>
  <div class="demo border">
    <span>组件：</span>
    <agel-tree-select v-model="value" node-key="value" :options="data" filter>
      <span slot="option" class="custom-tree-node" slot-scope="{ node }">
        <i class="el-icon-eleme" style="color:#409EFF;margin-right:5px"></i>
        <span>{{ node.label }}</span>
      </span>
    </agel-tree-select>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
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
    };
  },
};
</script>