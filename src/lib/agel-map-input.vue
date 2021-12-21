<template>
  <div class="agel-map-input">
    <el-input ref="ref" :value="proxyValue" :clearable="clearable" :prefix-icon="prefixIcon" v-bind="elInputPorps" v-on="$listeners" @clear="clear"
      @focus="loadDialog">
      <template v-slot:prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-slot:suffix>
        <slot name="suffix"></slot>
      </template>
      <template v-slot:prepend>
        <slot name="prepend"></slot>
      </template>
      <template v-slot:append>
        <slot name="append"></slot>
      </template>
    </el-input>
    <!-- 地图选择器 -->
    <el-dialog v-if="dialog" width="800px" title="地图选择器" :visible.sync="open" append-to-body custom-class="agel-map-input-dialog"
      :close-on-press-escape="false" @opened="loadMapInstance" @closed="dialogClosed">
      <div class="ag-dialog-body">
        <div class="addr-row">
          <div class="addr-label">已选中地址</div>
          <el-input v-model="address" :readonly="!editable">
            <span slot="append" v-if="Array.isArray(value)">{{lnglat? lnglat.lng+' , '+lnglat.lat:'无经纬度'}}</span>
          </el-input>
          <div v-if="error" class="addr-error">{{error}}</div>
        </div>
        <div class="addr-row">
          <div class="addr-label">关键字检索</div>
          <el-autocomplete style="width:100%" v-model="search" popper-class="agel-map-input-popper" :fetch-suggestions="autocompleteFetch"
            placeholder="输入关键字检索地址" value-key="name" clearable size="small" @select="autocompleteSelected" @clear="drawMarker">
            <template slot-scope="{ item }">
              <span><i :class="item.location?'el-icon-location-information':'el-icon-search'"></i></span>
              <span class="name">{{ item.name }}</span>
              <span class="addr">{{ item.district + item.address}}</span>
            </template>
          </el-autocomplete>
        </div>
        <div class="agel-map-box" v-loading="!map.AMap" style="width:100%;height:400px;position:relative">
          <div :id="'map-'+map.id" style="width:100%;height:100%"></div>
          <div :id="'panel-'+map.id" class="agel-map-panel"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="confrim">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import { guid, getIncludeAttrs } from "../utils/utils";

const propsKeys = [
  "placeholder",
  "clearable",
  "disabled",
  "readonly",
  "suffix-icon",
  "show-word-limit",
  "size",
  "type",
  "rows",
  "resize",
  "autosize",
  "validate-event",
];

export default {
  name: "agel-map-input",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Array],
      default: () => new Array(),
    },
    prefixIcon: {
      type: String,
      default: "el-icon-location-information",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    // 是否可编辑
    editable: {
      type: Boolean,
      default: false,
    },
    // 关键字检索地址
    keywordSearch: {
      type: Boolean,
      default: true,
    },
    // dialog 关闭时是否销毁
    destroyDialogOnClose: {
      type: Boolean,
      default: false,
    },
    // 高德地图加载函数
    AMap: {
      type: Function,
      default: function (reslove) {
        reslove(window.AMap);
      },
    },
  },
  data() {
    return {
      error: "",
      loading: false,
      dialog: false,
      open: false,
      search: "",
      address: "",
      lnglat: null,
      map: {
        id: guid(),
        AMap: null,
        map: null,
        Marker: null,
        PlaceSearch: null,
        Autocomplete: null,
      },
    };
  },
  computed: {
    elInputPorps() {
      return getIncludeAttrs(propsKeys, this.$attrs);
    },
    proxyValue() {
      return Array.isArray(this.value) ? this.value[0] || "" : this.value;
    },
  },
  methods: {
    loadDialog() {
      this.dialog = true;
      this.$nextTick(() => (this.open = true));
    },
    loadMapInstance() {
      if (this.map.AMap) {
        this.loadMap();
      } else {
        const plugins = [
          "AMap.PlaceSearch",
          "AMap.Autocomplete",
          "AMap.Geocoder",
        ];
        this.AMap((AMap) => {
          if (AMap && AMap.Map) {
            this.map.AMap = AMap;
            this.loadMap();
          } else {
            console.error("Error:AMap is not valid", AMap);
          }
        }, plugins);
      }
    },
    loadMap() {
      const { AMap, map } = this.map;
      if (map) {
        this.valueSelected();
        return;
      }
      this.map.map = new AMap.Map("map-" + this.map.id, { zoom: 12 });
      this.map.Geocoder = new AMap.Geocoder();
      this.map.Autocomplete = new AMap.Autocomplete();
      this.map.PlaceSearch = new AMap.PlaceSearch({
        map: this.map.map,
        pageSize: 5,
        pageIndex: 1,
        panel: "panel-" + this.map.id,
        autoFitView: true,
      });
      this.map.PlaceSearch.on("selectChanged", this.placeSearchSelected);
      this.map.map.on("click", this.mapSelected);
      this.valueSelected();
    },
    dialogClosed() {
      this.lnglat = null;
      this.address = "";
      this.search = "";
      this.error = "";
      this.map.PlaceSearch && this.map.PlaceSearch.clear();
      this.drawMarker(null);
      if (this.destroyDialogOnClose) {
        this.map.map.destroy();
        this.map.map = null;
        this.map.id = guid();
        this.dialog = false;
      }
    },
    autocompleteFetch(query, cb) {
      if (!query || query.trim() == "") return cb([]);
      this.map.Autocomplete.search(query, (status, result) => {
        cb(status == "complete" ? result.tips : []);
      });
    },
    valueSelected() {
      const { map, AMap } = this.map;
      this.address = this.proxyValue;
      if (Array.isArray(this.value) && this.value[1] && this.value[2]) {
        const lnglat = new AMap.LngLat(this.value[1], this.value[2]);
        this.lnglat = lnglat;
        this.drawMarker();
        map.setZoomAndCenter(12, lnglat);
      } else {
        this.lnglat = null;
        this.drawMarker(null);
      }
    },
    mapSelected(e) {
      const { Geocoder } = this.map;
      Geocoder.getAddress(e.lnglat, (status, result) => {
        if (status === "complete" && result.regeocode) {
          this.search = "";
          this.error = "";
          this.address = result.regeocode.formattedAddress;
          this.lnglat = e.lnglat;
          this.drawMarker();
        }
      });
    },
    autocompleteSelected(item) {
      if (item == undefined) return;
      if (item.location) {
        this.address = item.name;
        this.lnglat = item.location;
        this.error = "";
      }
      this.drawMarker(null);
      this.map.PlaceSearch.search(item.district + item.name);
    },
    placeSearchSelected(e) {
      this.address = e.selected.data.name;
      this.lnglat = e.selected.data.location;
      this.error = "";
      this.drawMarker(null);
    },
    drawMarker(draw = true) {
      const { AMap, Marker, PlaceSearch, map } = this.map;
      if (Marker) {
        map.remove(Marker);
        this.map.Marker = null;
      }
      if (draw && this.lnglat && this.address) {
        PlaceSearch && PlaceSearch.clear();
        this.map.Marker = new AMap.Marker({
          position: this.lnglat,
          label: {
            direction: "bottom",
            content: this.address,
          },
        });
        map.add(this.map.Marker);
      }
    },
    confrim() {
      if (this.address && this.lnglat) {
        this.error = "";
        if (Array.isArray(this.value)) {
          this.$emit("input", [this.address, this.lnglat.lng, this.lnglat.lat]);
        } else {
          this.$emit("input", this.address);
        }
        this.open = false;
      } else {
        this.error = "请先选择地点";
        if (Array.isArray(this.value)) this.error += " / 经纬度";
      }
    },
    // input....
    clear() {
      this.$emit("input", Array.isArray(this.value) ? [] : "");
    },
    focus() {
      this.$refs.ref.focus();
    },
    blur() {
      this.$refs.ref.blur();
    },
    select() {
      this.$refs.ref.select();
    },
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
 
<style>
.agel-map-input-dialog .amap-marker-label {
  background: #409eff;
  border: 1px solid white;
  color: white;
}

.agel-map-input-dialog .amap-logo,
.agel-map-input-dialog .amap-copyright {
  display: none !important;
}

.agel-map-input-dialog .addr-row {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  white-space: nowrap;
  position: relative;
}

.agel-map-input-dialog .addr-label {
  width: 90px;
}

.agel-map-input-dialog .addr-error {
  position: absolute;
  top: 100%;
  color: #f56c6c;
  left: 80px;
  font-size: 12px;
}

.agel-map-input-popper .addr {
  margin-left: 5px;
  font-size: 80%;
  color: #999;
}

.agel-map-panel {
  position: absolute;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  left: 10px;
  width: 280px;
}

.agel-map-panel .poi-tel,
.agel-map-panel .poi-more {
  display: none;
}
.agel-map-panel .pageLink {
  color: #409eff;
}
</style>