<template>
  <div class="agel-form" v-if="LOAD">
    <el-form ref="form" :model="value.data" v-bind="attrs">
      <el-row :gutter="value.gutter">
        <el-col
          v-for="(item, key) in items"
          v-show="item.show"
          :span="item.span"
          :offset="item.offset"
          :key="key"
        >
          <el-form-item
            :prop="key"
            :label="item.label"
            :label-width="item.labelWidth"
            :required="item.required"
            :rules="item.rules"
          >
            <component
              :is="item.component"
              :events="item.on"
              v-bind="item.attrs"
              v-model="value.data[key]"
              v-on="item.on"
            ></component>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="agel-buttons">
      <el-button :loading="value.loading" type="primary" @click="submit"
        >提交</el-button
      >
      <el-button>模拟数据</el-button>
    </div>
  </div>
</template>

<script>
import getApi from "./api.js";

const components = {
  "agel-radio": () => import("./components/agel-radio.vue"),
  "agel-checkbox": () => import("./components/agel-checkbox.vue"),
  "agel-select": () => import("./components/agel-select.vue"),
  "agel-upload": () => import("./components/agel-upload.vue")
};

export default {
  name: "agel-form",
  components,
  install(vue, opts = {}) {
    vue.prototype.$agelFormConfig = opts;
    vue.component(opts.name || this.name, this);
  },
  props: {
    value: Object
  },
  data() {
    return {
      LOAD: false,
      API: {}
    };
  },
  created() {
    this.initApi();
  },
  computed: {
    attrs() {
      return this.getAttrs();
    },
    items() {
      return this.getItems();
    }
  },
  methods: {
    initApi() {
      let api = getApi.call(this);
      let items = {};
      Object.keys(api.localApi.items).forEach(key => {
        let item = api.localApi.items[key];
        let newItem = {
          ...api.itemExtendApi,
          ...api.globalItemApi,
          ...(api.config[item.component] || {}),
          ...item
        };
        if (
          newItem.defaultValue !== undefined &&
          this.value.data[key] === undefined
        ) {
          this.$set(this.value.data, key, newItem.defaultValue);
        }
        items[key] = newItem;
      });

      this.$emit("input", {
        ...api.defaultApi,
        ...api.extendApi,
        ...api.globalApi,
        ...api.localApi,
        items
      });
      this.API = api;
      if (this.LOAD) return;
      this.$nextTick()
        .then(() => (this.LOAD = true))
        .then(() => {
          this.value.$ref = this.$refs.form;
        });
    },
    getAttrs() {
      let attrs = {};
      for (const key in this.value) {
        if (!this.API.extendApi.hasOwnProperty(key)) {
          attrs[key] = this.value[key];
        }
      }
      return attrs;
    },
    getItems() {
      let items = {};
      let extend = this.API.itemExtendApi;
      for (const prop in this.value.items) {
        let item = this.value.items[prop];
        if (item.display === false) continue;
        let newItem = { attrs: {} };
        for (const key in item) {
          let obj = extend.hasOwnProperty(key) ? newItem : newItem.attrs;
          obj[key] = item[key];
        }
        let agName = "ag" + item.component;
        newItem.component = components[agName] ? agName : item.component;
        items[prop] = newItem;
      }
      return items;
    },
    submit() {
      this.$refs.form.validate(is => {
        if (is) {
          this.value.loading = true;
          let data = this.value.getFormData();
          this.value.submit(data);
        }
      });
    }
  }
};
</script>

<style lang="stylus">
.agel-form {
  .el-date-editor.el-input, .el-date-editor.el-input__inner, .el-select, .el-cascader {
    width: 100%;
  }

  .el-form--label-top .el-form-item__label {
    padding: 0px;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .agel-buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
