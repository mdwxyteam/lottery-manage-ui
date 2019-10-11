<template>
  <div> <button @click="initSearch">搜索</button>
    <p>{{address}}</p>
    <hr>
    <div class="amap-page-container">
      <div class="search-box"
           v-if="toSearch">
        <input v-model="searchKey"
               type="search"
               id="search"> <button @click="searchByHand">搜索</button>
        <div class="tip-box"
             id="searchTip"></div>
      </div>
      <el-amap vid="amap"
               :zoom="zoom"
               class="amap-demo"
               :center="center"
               :amapManager="amapManager"
               :events="events">
        <el-amap-circle vid="circle"
                        :center="center"
                        :radius="radius"
                        fill-opacity="0.2"
                        strokeColor="#38f"
                        strokeOpacity="0.8"
                        strokeWeight="1"
                        fillColor="#38f"> </el-amap-circle>
      </el-amap>
    </div>
    <ul>
      <li v-for="item in result"
          :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template> <style scoped>
.amap-page-container {
  height: 300px;
  position: relative;
}
.search-box {
  position: absolute;
  z-index: 5;
  width: 90%;
  left: 5%;
  top: 10px;
  height: 30px;
}
.search-box input {
  float: left;
  width: 80%;
  height: 100%;
  border: 1px solid #38f;
  padding: 0 8px;
}
.search-box button {
  float: left;
  width: 20%;
  height: 100%;
  background: #38f;
  border: 1px solid #38f;
  color: #fff;
}
.tip-box {
  width: 100%;
  max-height: 260px;
  position: absolute;
  top: 30px;
  overflow-y: auto;
  background-color: #fff;
}
.toolbar {
  margin-top: 15px;
}
hr {
  border-color: red;
  border-style: dashed;
}
</style>