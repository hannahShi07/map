<template>
  <!--新增弹出框-->
  <el-dialog
    title="选择地址"
    :visible.sync="mapVisible"
    width="1000px"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose">
    <div class="map" id="map">
      <div style="margin-bottom: 10px;text-align: center" >
        <el-input v-model="addressKey" placeholder="请输入地址来查找相关位置" style="width: 790px;float: left"></el-input>
        <span style="display:inline-block;width:66px;margin-left: 10px;">
            <el-button type="primary" @click="search" size="medium">查询</el-button>
        </span>
        <span style="display:inline-block;width:66px;margin-left: 10px;">
            <el-button type="reset" @click="clear" size="medium" >重置</el-button>
        </span>
      </div>
      <baidu-map class="bmView" :scroll-wheel-zoom="true" :center="location" :zoom="zoom" @zoomend="syncZoom" @click="getLocationPoint" ak="3bVHdeo2ZZaZO4QczC63d0kMsbA55ZSD">
        <bm-view style="width: 100%; height:450px; flex: 1" id="local_map"></bm-view>
        <bm-local-search :keyword="addressKeyword" :auto-viewport="true" style="display: none" :zoom="zoom"></bm-local-search>
        <!--点-->
        <div v-for="(point,index) in resultData">
          <!--:icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"-->
          <bm-marker :position="{lng:point.lng,lat:point.lat}" :dragging="true" >
            <!--<bm-label :content="point.locale" :labelStyle="{color: 'red', fontSize : '10px'}" :offset="{width: -35, height: 30}"/>-->
          </bm-marker>
        </div>
      </baidu-map>
      <bm-polygon
        :path="path"
        v-for="path of polygonPath.paths"
        :key="path.toString()"
        stroke-color="blue"
        fill-color="red"
        :fill-opacity="0.8"
        :stroke-opacity="0.5"
        :stroke-weight="2"
        @click="alertpath"
      />
    </div>

    <div class="dialog-left" style="width: 100%;text-align: center;margin-bottom: 20px;margin-top: 20px;">
      <el-button  @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click.native="sub">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import BmView from 'vue-baidu-map/components/map/MapView.vue'
    import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch.vue'

    import { regionData } from 'element-china-area-data'
    import { BmMarker,BmNavigation,BmLabel,BmGeolocation } from 'vue-baidu-map'
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    import db from '@/utils/localstorage'

    export default {
        name: 'BMap',
        props:{
            defaultSelect:false,
            mapVisible:false,
            ruleForm: {}
        },
        components: {
            BmView,
            BmLocalSearch,
            BaiduMap,
            BmMarker,
            BmNavigation,
            BmLabel,
            BmGeolocation,
        },

        data() {
            return {
                options: regionData,
                selectedOptions: [],
                resultData:[],
                center: {lng: 0, lat: 0},
                points: [],
                isShow:false,

                location: this.initLocation(),
                position: {
                    address: "",        // 地址
                    coordinates: "",    // 坐标
                    province: "",       // 省
                    city: "",           // 市
                    district: "",       // 区
                },
                zoom: 15,
                addressKey: "",
                addressKeyword: "",
                polygonPath: {
                    editing: false,
                    paths: []
                }
            };
        },
        mounted(){
            if(this.ruleForm !== null && this.ruleForm !== undefined){
                let points = this.ruleForm.coordinates.split(",");
                let marker = {
                    lng: points[0],
                    lat: points[1]
                }
                this.resultData.push(marker)
                this.addressKeyword = "";

                let _this = this;
                setTimeout(function () {
                    _this.location = {
                        lng: points[0],
                        lat: points[1]
                    }
                },500);
            }
        },
        created:function(){

        },
        methods:{
            initLocation() {
                return {
                    lng: db.get("USER").djOrg && db.get("USER").djOrg.coordinates ? db.get("USER").djOrg.coordinates.split(',')[0] : 117.233728,
                    lat: db.get("USER").djOrg && db.get("USER").djOrg.coordinates ? db.get("USER").djOrg.coordinates.split(',')[1] : 31.827844
                };
            },
            handleClose() {
                this.clear();
                this.$emit('mapClose')
            },
            clearMarker(){
                this.resultData = [];
            },
            getLocationPoint(e) {
                this.resultData = [];
                let marker = {
                    lng: e.point.lng,
                    lat: e.point.lat
                }
                this.resultData.push(marker)

                //用所定位的经纬度查找所在地省市街道等信息
                var point = new BMap.Point(e.point.lng, e.point.lat);
                var gc = new BMap.Geocoder();
                let _this = this;
                gc.getLocation(point, function (rs) {
                    _this.position.coordinates = e.point.lng + "," + e.point.lat;
                    _this.position.province = rs.addressComponents.province;
                    _this.position.city = rs.addressComponents.city;
                    _this.position.district = rs.addressComponents.district;

                    _this.position.address = rs.addressComponents.street;
                    if(rs.surroundingPois && rs.surroundingPois.length > 0){
                        _this.position.address += rs.surroundingPois[0].title
                    }
                    _this.addressKey = _this.position.address;
                });

                setTimeout(function () {
                    _this.location = marker;
                },200);
            },
            sub(){
                this.$emit('mapClose',this.position)
                this.clear();
            },
            handler ({ BMap, map }) {
                map.enableScrollWheelZoom(true)
            },
            // 开启多边形绘制
            toggle (name) {
                this[name].editing = !this[name].editing

                // 在这里做一步判断，如果有路径且开启绘制就把原来的路径清空
                if (this.polygonPath.paths && this.polygonPath.editing) {
                    this.polygonPath.paths = []
                }
            },
            // 同步zoom
            syncZoom(e){
                this.zoom = e.target.getZoom()
            },
            setPosition(data){
                // 不用回显
                /*if(data && data.coordinates){
                    this.position = {
                        address: data.address,              // 地址
                        coordinates: data.coordinates,      // 坐标
                    }
                    if(data.ssqId){
                        let ssq = data.ssqId.split('-');
                        this.position.province = ssq[0];
                        this.position.city = ssq[1];
                        this.position.district = ssq[2];
                        this.addressKeyword = ssq[0] + ssq[1] + ssq[2];
                    }
                }*/
            },
            search(){
                this.addressKeyword = this.addressKey
            },
            clear(){
                this.location = this.initLocation();
                this.position = {
                    address: "",        // 地址
                    coordinates: "",    // 坐标
                    province: "",       // 省
                    city: "",           // 市
                    district: "",       // 区
                }
                this.zoom = 15;
                this.addressKeyword = '';
                this.addressKey = '';
                this.clearMarker();
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bm-view {
    margin-top:0px;
    width: 100%;
    height: 450px;
  }
  /deep/.anchorBL{
    display:none;
  }

  /deep/#local_map input[type="button"] {
    background: url(https://api.map.baidu.com/images/iw_bg.png) 0px -87px repeat-x !important;
    width: 35px !important;
  }
</style>
