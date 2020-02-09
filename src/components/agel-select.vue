<template>
  <el-select v-model="newVal" v-bind="$attrs" v-on='events'>
    <el-option
      v-for="option of options"
      v-bind='option'
      :key="option.value"
      :label="option.label"
    >
    </el-option>
  </el-select>
</template>

<script>
import formMixin from '@/mixins/formMixin'
export default {
  name: "agel-select",
  mixins:[formMixin],
  props: {
    value: [Boolean, Number, String],
    options: Array,
  },
  
};
</script>
