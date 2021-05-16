<template>
  <el-drawer direction="rtl" custom-class="search-drawer el-drawer-custom" title="条件查询" size="300px" :visible.sync="search.show">
    <div class="drawer-body">
      <agel-form v-model="search" :attach="attach"></agel-form>
    </div>
    <div class="drawer-footer">
      <div class="btn-cancel" @click="search.show=false">重置</div>
      <div class="btn-submit" @click="submit">查询</div>
    </div>
  </el-drawer>
</template>
 
<script>
export default {
  name: "agel-form-drawer",
  props: {
    search: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      attach: {
        labelPosition: "top",
        span: 24,
      },
    };
  },
  methods: {
    submit() {
      this.search.show = false;
      this.$emit("confirm");
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>

<style lang="scss" >
.el-drawer:focus {
  outline: none;
}

.el-drawer__header {
  padding: 10px;
  margin-bottom: 0px;
  border-bottom: 1px solid #eee;
  span {
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 2px;
    color: #3a8ee6;
    &:focus {
      outline: none;
    }
  }
}

.el-drawer__body {
  padding: 10px;
  overflow: auto;
}

.el-drawer-custom {
  background: linear-gradient(#f5f5f5, #f5f5f5, #307dff);
  .el-drawer__header {
    border: 0px;
    padding: 10px 15px 0px 20px;
  }
  .el-drawer__body {
    padding: 0px 10px;
  }
  .drawer-body {
    margin-top: 5px;
    height: calc(100% - 55px);
    width: 100%;
    border-radius: 5px;
    overflow: auto;
    background: white;
    padding: 10px;
    box-shadow: 0px 0px 3px #c0c4cc;
  }
  .drawer-footer {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 50px;
    align-items: center;
  }
  .btn-cancel {
    background: #669fff;
    width: 50%;
    height: 35px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    color: white;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 15px;
    border-radius: 3px;
    cursor: pointer;
    max-width: 200px;
  }
  .btn-submit {
    width: 50%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    color: black;
    background: white;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 15px;
    border-radius: 3px;
    cursor: pointer;
    max-width: 200px;
  }
}
</style>