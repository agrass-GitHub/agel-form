<template>
  <div class="demo">
    <span>组件：</span>
    <agel-tree-select v-model="value" node-key="value" :data="data" filter></agel-tree-select>
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
          label: "二级 ",
          value: "2",
        },
      ],
    };
  },
};
</script>