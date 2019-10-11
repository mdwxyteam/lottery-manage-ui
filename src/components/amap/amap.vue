
<template>
  <div class="mdamap" style="width:850px;height:400px;">
    <div id="outer-box">
        <div id="container" class="map" tabindex="0"></div>
        <div id="panel" class="scrollbar1">
            <div id="searchBar">
                <input id="searchInput" placeholder="输入关键字搜素POI" />
            </div>
            <div id="searchResults"></div>
        </div>
    </div>
  </div>
</template>
<style>
     #outer-box {
        height: 100%;
        padding-right: 300px;
    }
    
    #container {
        height: 100%;
        width: 100%;
    }
    
    #panel {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        overflow: auto;
        width: 300px;
        z-index: 999;
        border-left: 1px solid #eaeaea;
        background: #fff;
    }
    
    #searchBar {
        height: 30px;
        background: #ccc;
    }
    
    #searchInput {
        width: 100%;
        height: 30px;
        line-height: 30%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ccc;
        padding: 0 5px;
    }
    
    #searchResults {
        overflow: auto;
        height: calc(100% - 30px);
    }
    
    .amap_lib_placeSearch,
    .amap-ui-poi-picker-sugg-container {
        border: none!important;
    }
    
    .amap_lib_placeSearch .poibox.highlight {
        background-color: #CAE1FF;
    }
    
    .poi-more {
        display: none!important;
    }
  </style>
<script>
import MapLoader from '@/assets/js/AMap.js'
export default {
  name: 'mdamap',
  data () {
    return {
      map: null
    }
  },
  mounted () {
    let that = this
    MapLoader().then((mapObj = {AMapUI, AMap}) => {
      alert('地图加载成功')
      that.map = new AMap.Map('container', {
        center: [106.550464,29.563761],
        zoom: 11
      })
    console.log("-------AMapUI----------")
    console.log(AMapUI)
    
     AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {

        var poiPicker = new PoiPicker({
            input: 'searchInput',
            placeSearchOptions: {
                map: that.map,
                pageSize: 10
            },
            searchResultsContainer: 'searchResults'
        });

        poiPicker.on('poiPicked', function(poiResult) {

            poiPicker.hideSearchResults();

            var source = poiResult.source,
                poi = poiResult.item;

            if (source !== 'search') {

                //suggest来源的，同样调用搜索
                poiPicker.searchByKeyword(poi.name);

            } else {

                //console.log(poi);
            }
        });

        poiPicker.onCityReady(function() {
            poiPicker.searchByKeyword('美食');
        });
    });

    }). catch((e) => {
      alert('地图加载失败' ,e);
    })
  }
}
</script>