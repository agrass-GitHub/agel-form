<template>
  <div class="demo">
    <agel-form class="demo" v-model="form"></agel-form>
    <agel-map-input>
      <el-tag>wwwwwwwwwww</el-tag>
      <template v-slot:name="props">
        <span>11{{props.user}}</span>
      </template>
    </agel-map-input>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
        inline: true,
        data: {},
        items: {
          slotStyle: {
            label: "",
            component: "agel-map-input",
            slots: {
              default: () => {
                return <el-tag>wwwwwwwwwww</el-tag>;
              },
              name: (props) => {
                return <span>11{props.user}</span>;
              },
            },
          },
        },
      },
    };
  },
};
</script>