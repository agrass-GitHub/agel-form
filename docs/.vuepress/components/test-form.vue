<template>
  <agel-form v-model="form">

  </agel-form>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        span: 12,
        layout: "tableditor",
        data: [
          {
            name: "11",
          },
          {
            name: "11",
          },
        ],
        items: [
          {
            prop: "name",
            label: "字符串",
            dynamic: true,
          },
        ],
      },
    }
  },
}
</script>