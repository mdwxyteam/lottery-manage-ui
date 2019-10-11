export default function MapLoader() {
  // <-- 原作者这里使用的是module.exports
  return new Promise((resolve, reject) => {
    if (window.AMap && window.AMapUI) {
      resolve({ AMapUI: window.AMapUI, AMap: window.AMap })
    } else {
      // amap 对象
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.onload = function() {
        if (window.AMapUI) {
          console.log('-------script.onload------')
          resolve({ AMapUI: window.AMapUI, AMap: window.AMap })
        }
      }
      // script.src = 'http://webapi.amap.com/maps?v=1.4.15&callback=initTheMap&key=6bcb8a1e8feb4b3da331adac45ae2dea'
      script.src =
        'http://webapi.amap.com/maps?v=1.3&key=c5ee5e229457e04f6b51dcba4cef7627'
      script.onerror = reject
      document.head.appendChild(script)
      console.log(window.AMap)

      //AMapUI对象
      var scriptUI = document.createElement('script')
      scriptUI.type = 'text/javascript'
      scriptUI.async = true
      scriptUI.onload = function() {
        if (window.AMap) {
          console.log('-------scriptUI.onLoad------')
          resolve({ AMapUI: window.AMapUI, AMap: window.AMap })
        }
      }
      // script.src = 'http://webapi.amap.com/maps?v=1.4.15&callback=initTheMap&key=6bcb8a1e8feb4b3da331adac45ae2dea'
      scriptUI.src = 'http://webapi.amap.com/ui/1.0/main.js?v=1.0.11'
      scriptUI.onerror = reject
      document.head.appendChild(scriptUI)

      // console.log("--------------------------------------------")
      // console.log(window.AMapUI)
      // alert("AMapUI对象")
    }
    window.initAMap = () => {
      //   console.log("-----------------window.initAMap---------------------------")
      //   console.log(window)
      //   console.log(window.AMapUI)
      //   console.log(window.AMap)
      //   resolve({AMapUI: window.AMapUI, AMap: window.AMap})
    }
  })
}
