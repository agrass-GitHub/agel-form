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
            prop: "inline",
            label: "inline",
            component: "agel-form-inline",
            items: [
              { prop: "name", label: "姓名", required: true },
              { prop: "region", label: "地址" },
            ],
          },
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
          },
        ],
      },
    };
  },
};
</script>