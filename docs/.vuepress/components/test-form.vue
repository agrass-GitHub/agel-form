<template>
  <div class="demo">
    <agel-upload v-model="value" :action="action" :limitSize="1" drag></agel-upload>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      value: [],
      action: "/xxx/upload",
    };
  },
};
</script>