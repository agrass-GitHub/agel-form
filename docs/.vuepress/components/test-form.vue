<template>
  <div>
    <agel-form class="demo" v-model="form">

    </agel-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        labelPosition: "left",
        labelWidth: "100px",
        span: 13,
        data: {},
        items: [
          {
            label: "xx",
            prop: "name",
            on: {
              input: (v) => {
                console.log(v);
              },
            },
          },
          {
            is: "el-checkbox-group",
            label: "xx",
            prop: "name2",
            options: [
              { label: "x", value: 1 },
              { label: "y", value: 2 },
            ],
            on: {
              input: (v) => {
                console.log(v);
              },
            },
          },
        ],
      },
    };
  },
};
</script>