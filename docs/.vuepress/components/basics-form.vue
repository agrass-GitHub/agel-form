<template>
  <div>
    <agel-form v-model="form"> </agel-form>
    <el-button @click="form.data.tree1=[1,2]">测试</el-button>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        test: () => {},
        title: "在这种",
        show: false,
        loading: false,
        "label-position": "right",
        "label-width": "80px",
        data: {
          tree1: 1,
          tree0: [1, 2],
          select: [],
        },
        items: {
          select: {
            label: "select",
            component: "el-select",
            multiple: true,
            span: 8,
            clearable: true,
            options: [
              { label: "测试3", value: 3 },
              { label: "测试4", value: 4 },
              { label: "测试5", value: 5 },
            ],
          },
          tree0: {
            component: "el-input-tree",
            label: "多选树",
            span: 8,
            nodeKey: "value",
            showCheckbox: true,
            collapseTags: true,
            clearable: true,
            data: [
              { label: "测试1", value: 1 },
              {
                label: "测试2",
                value: 2,
                children: [
                  { label: "测试3", value: 3 },
                  { label: "测试4", value: 4 },
                ],
              },
            ],
          },
        },
      },
    };
  },
};
</script>