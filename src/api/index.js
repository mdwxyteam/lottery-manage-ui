import axios from 'axios';

var webURL = 'http://127.0.0.1:8080/web/api';
var fileURL = 'http://127.0.0.1:8080/lottery'

/**赞助商类型列表 */    
 export const sponsorType = (page,rows) => {
     return axios.get(webURL+'/page/type?pageNum='+ page +'&pageSize='+rows
    )
}
  /**新增保存赞助商类型 */    
  export const addType = (type) => {
    return axios.post(webURL+'/add/type?type='+type
  )
}
/**修改保存赞助商类型 */   
  export const editType = (id,type) => {
    return axios.post(webURL+'/edit/type?id='+ id +'&type='+ type
  )
}
/**更改赞助商类型状态 */   
export const statusType = (typeId,status) => {
    var isStatus
    if(status == true){
      isStatus = 0;  
    } else if(status == false){
      isStatus = 1;
    }
     return axios.post(webURL+'/status/type?typeId='+ typeId +'&isStatus='+ isStatus
  )
}
 /**新增保存奖品 */    
 export const addPrize = (prizeDescription,iconUrl,prizeCount) => {
   return axios.post(webURL+'/add/prize?prizeDescription='+ prizeDescription +'&iconUrl='+ iconUrl +'&prizeCount='+ prizeCount
 )
}
 /**修改保存奖品 */
export const editPrize = (prizeId,prizeDescription,iconUrl,prizeCount)=>{
   return axios.post(webURL+'/edit/prize?prizeId='+ prizeId +'&prizeDescription='+ prizeDescription + '&iconUrl=' + iconUrl +'&prizeCount='+ prizeCount
   )
}
 /**删除状态奖品 */    
 export const delPrize = (prizeId) => {
  return axios.post(webURL+'/del/prize?prizeId='+ prizeId
 )
}


/**奖品列表 */    
export const prize = (page,rows) => {
  return axios.get(webURL+'/page/prize?pageNum='+ page +'&pageSize='+rows
 )
}

/**文件上传 */    
export const file = fileURL+"/upload/image"
    