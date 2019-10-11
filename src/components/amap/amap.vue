
<template>
  <div class="mdamap"
       style="width:880px;height:400px;">
    <div id="container"
         class="map"
         tabindex="0"></div>

    <el-tag id="locationpositondata"
            type="success">{{poiResult?poiResult.item.location.lat: "0.00"}},{{poiResult?poiResult.item.location.lng: "0.00"}}</el-tag>

    <div id="pickerBox"
         style="">
      <el-input id="pickerInput"
                placeholder="输入关键字选取地点"
                v-model="searchData"></el-input>
      <div id="poiInfo"></div>
    </div>
  </div>
</template>
<style>
#container {
  width: 100%;
  height: 100%;
  margin: 0px;
  font-size: 13px;
}

#pickerBox {
  position: absolute;
  z-index: 9999;
  top: 50px;
  right: 300px;
  width: 300px;
}
#rightbutton {
  position: absolute;
  z-index: 9999;
  top: 50px;
  right: 80px;
  width: 120px;
}
#locationpositondata {
  position: absolute;
  z-index: 9999;
  top: 50px;
  left: 30px;
  width: 150px;
}
#pickerInput {
  width: 200px;
  padding: 5px 5px;
}

#poiInfo {
  background: #fff;
}

.amap_lib_placeSearch .poibox.highlight {
  background-color: #cae1ff;
}
.amap_lib_placeSearch .poi-more {
  display: none !important;
}
</style>
<script>
import MapLoader from '@/assets/js/AMap.js'
export default {
  name: 'mdamap',
  data () {
    return {
      searchData: "美食",
      map: null,
      poiResult: null
      // {
      //   item: {
      //     location: {
      //       lat: 0.00,
      //       lng: 0.00
      //     }
      //   }
      // }
    }
  },
  mounted () {
    let that = this
    MapLoader().then((mapObj = { AMapUI, AMap }) => {
      that.map = new AMap.Map('container', {
        center: [106.550464, 29.563761],
        zoom: 11
      })

      AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {

        var poiPicker = new PoiPicker({
          //city:'北京',
          input: 'pickerInput'
        });

        //初始化poiPicker
        poiPickerReady(poiPicker);
      });

      function poiPickerReady (poiPicker) {

        window.poiPicker = poiPicker;

        var marker = new AMap.Marker();

        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -20)
        });

        //选取了某个POI
        poiPicker.on('poiPicked', function (poiResult) {

          var source = poiResult.source,
            poi = poiResult.item,
            info = {
              source: source,
              id: poi.id,
              name: poi.name,
              location: poi.location.toString(),
              address: poi.address
            };

          marker.setMap(that.map);
          infoWindow.setMap(that.map);

          marker.setPosition(poi.location);
          infoWindow.setPosition(poi.location);

          infoWindow.setContent('POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>');
          infoWindow.open(that.map, marker.getPosition());
          that.poiResult = poiResult;
          console.log(infoWindow)
          //map.setCenter(marker.getPosition());
        });

        poiPicker.onCityReady(function () {
          poiPicker.suggest('美食');
        });
      }

    }).catch((e) => {
      alert('地图加载失败', e);
    })
  },
  methods: {
    getLocation () {
      return this.poiResult;
    }
  }
}
</script>