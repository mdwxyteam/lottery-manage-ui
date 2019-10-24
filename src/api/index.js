import axios from 'axios'

var webURL = 'http://127.0.0.1:8081/web/api'

var fileURL = 'http://127.0.0.1:8081/lottery'

export const fileUploadURL = 'http://182.61.39.148:8082/lottery/upload/image'

/**分页查询活动 */
export const pageActivity = page => {
  return axios.get(
    webURL +
      '/activ/page?pageNum=' +
      page.pageNum +
      '&pageSize=' +
      page.pageSize +
      '&conditionType=' +
      page.conditionType +
      '&sponsorName=' +
      page.sponsorName
  )
}
/**删活动 */
export const delActivity = (id, delState) => {
  return axios.post(webURL + '/activ/delState', { id, delState })
}

/**新增活动 */

export const addActivity = fromData => {
  return axios.post(webURL + '/add/activ', fromData)
}

/**赞助商列表 */
export const sponsor = (page, rows, typeId, sponsorName, status) => {
  return axios.get(
    webURL +
      '/sponsor/condition?pageNum=' +
      page +
      '&pageSize=' +
      rows +
      '&typeId=' +
      typeId +
      '&sponsorName=' +
      sponsorName +
      '&status=' +
      status
  )
}

/**通过名字模糊查询赞助商 */
export const querySponsor = sponsorName => {
  return axios.get(webURL + '/query/sponsor?sponsorName=' + sponsorName)
}
/**赞助商类型列表 */

export const sponsorType = (page, rows) => {
  return axios.get(webURL + '/page/type?pageNum=' + page + '&pageSize=' + rows)
}
/**获取所有赞助商类型 */

export const allsponsorType = () => {
  return axios.get(webURL + '/allType')
}
/**赞助商详情 */
export const sponsorDetail = sponsordId => {
  return axios.get(webURL + '/detail/sponsor?sponsorId=' + sponsordId)
}
/**新增赞助商 */

export const addSponsor = (
  typeId,
  type,
  sponsor,
  location,
  address,
  detalis,
  markDown
) => {
  return axios.post(webURL + '/add/sponsor', {
    typeId,
    type,
    sponsor,
    location,
    address,
    detalis,
    markDown
  })
}
/**更新赞助商 */
export const updateSponsor = (
  id,
  typeId,
  type,
  sponsor,
  location,
  address,
  detalis,
  markDown
) => {
  return axios.post(webURL + '/update/sponsor', {
    id,
    typeId,
    type,
    sponsor,
    location,
    address,
    detalis,
    markDown
  })
}
/**新增保存赞助商类型 */
export const addType = type => {
  return axios.post(webURL + '/add/type?type=' + type)
}
/**修改保存赞助商类型 */

export const editType = (typeId, typeName) => {
  return axios.post(
    webURL + '/edit/type?typeId=' + typeId + '&typeName=' + typeName
  )
}

/**更改赞助商状态 */
export const statusSponsor = (sponsorId, status) => {
  var isStatus
  if (status == true) {
    isStatus = 0
  } else if (status == false) {
    isStatus = 1
  }
  return axios.post(
    webURL + '/del/sponsor?id=' + sponsorId + '&status=' + isStatus
  )
}
/**更改赞助商类型状态 */
export const statusType = (typeId, status) => {
  var isStatus
  if (status == true) {
    isStatus = 0
  } else if (status == false) {
    isStatus = 1
  }
  return axios.post(
    webURL + '/status/type?typeId=' + typeId + '&isStatus=' + isStatus
  )
}
/**条件分页查询奖品 */
export const queryByPrizeDescription = (page, pageSize, prizeDescription) => {
  return axios.get(
    webURL +
      '/page/description/prize?pageNum=' +
      page +
      '&pageSize=' +
      pageSize +
      '&prizeDescription=' +
      prizeDescription
  )
}
/**新增保存奖品 */

export const addPrize = (prizeDescription, iconUrl, prizeCount) => {
  return axios.post(
    webURL +
      '/add/prize?prizeDescription=' +
      prizeDescription +
      '&iconUrl=' +
      iconUrl +
      '&prizeCount=' +
      prizeCount
  )
}
/**修改保存奖品 */
export const editPrize = (prizeId, prizeDescription, iconUrl, prizeCount) => {
  return axios.post(
    webURL +
      '/edit/prize?prizeId=' +
      prizeId +
      '&prizeDescription=' +
      prizeDescription +
      '&iconUrl=' +
      iconUrl +
      '&prizeCount=' +
      prizeCount
  )
}
/**删除状态奖品 */

export const delPrize = prizeId => {
  return axios.post(webURL + '/del/prize?prizeId=' + prizeId)
}

/**奖品列表 */

export const prize = (page, rows) => {
  return axios.get(webURL + '/page/prize?pageNum=' + page + '&pageSize=' + rows)
}

/**文件上传 */

export const file = fileUploadURL
