<template>
  <div class="demo">
    <!-- <el-select v-model="value" ref="select" @input="input" @change="change">
      <el-option label="1" value="1"></el-option>
      <el-option label="2" value="2"></el-option>
    </el-select> -->
    <agel-select ref="select" filter  v-model="value" :options="options" @input="input" @change="change">

    </agel-select>

    <agel-tree-select v-model="value2"  ref="select" filter  :options="treeoptions" @input="input" @change="change">
    </agel-tree-select>
  </div>
</template>
 
<script>
function createOptions(len, start = 0) {
  return Array(len)
    .fill(0)
    .map((_, index) => ({
      value: `选项${start + index}`,
      label: `我是${start + index}`,
    }));
}

export default {
  data() {
    return {
      treeoptions: createOptions(10),
      options: [
        { label: "分组1", options: createOptions(10) },
        { label: "分组2", options: createOptions(10, 10) },
      ],
      value: "",
      value2: "",
      input: (v) => {
        // console.log("input", v, this.value);
      },
      change: (v) => {
        console.log("change 当前", v, this.value);
        console.log(this.$refs.select.getValueOption(v));
      },
    };
  },
};
</script>
