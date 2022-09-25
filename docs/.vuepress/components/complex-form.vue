<template>
  <div class="demo border">
    <agel-form v-model="form"></agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        layout: "grid",
        data: {
          name: "演示",
          tableditor: [{ name: "tableditor", intor: "" }],
          inline: { name: "inline" },
          descriptions: { name: "descriptions" },
        },
        items: [
          { prop: "name", label: "姓名", span: 12, required: true },
          {
            prop: "descriptions",
            label: "descriptions",
            component: "agel-form-descriptions",
            column: 1,
            items: [
              { prop: "name", label: "姓名", required: true },
              { prop: "region", label: "地址" },
            ],
          },
          {
            prop: "tableditor",
            label: "table",
            component: "agel-form-tableditor",
            items: [
              { prop: "name", label: "姓名", required: true },
              { prop: "region", label: "地址" },
              { prop: "intor", label: "介绍" },
            ],
            // 注意：使用函数插槽 prepend append 只能返回单列
            slots: {
              prepend: () => {
                return (
                  <el-table-column
                    type="selection"
                    label="多选"
                    key="selection"
                  ></el-table-column>
                );
              },
              append: () => {
                return (
                  <tableditor-menu-column
                    data={this.form.data.tableditor}
                    edit={false}
                    width={80}
                  ></tableditor-menu-column>
                );
              },
            },
          },
        ],
      },
    };
  },
};
</script>