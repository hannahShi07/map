/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description API申报审核信息（双强六好）
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq  from "@/api/public/commonReq.js"

/*双强六好申报审核信息列表查询*/

/*参数 {

}*/

export const getDeclareList = data =>
  request({
    url: '/partycloud/doubleSixWell/queryDSWCheckPage',
    method: 'post',
    data: data
  })


/*非公党建申报审核信息列表查询*/

/*参数 {

}*/

export const getDeclareNonList = data =>
  request({
    url: '/partycloud/exemplaryBase/queryEBCheckPage',
    method: 'post',
    data: data
  })

/*双强六好申报审核信息-审核-保存*/
/*参数 {
  所有必填项
}*/

export const getDeclareSave = data =>
  request({
    url: '/partycloud/doubleSixWell/reviewDSW',
    method: 'post',
    data: data
  })


/*双强六好申报审核信息-编辑审核不通过审核-保存*/
/*参数 {
  所有必填项
}*/

export const getDeclareBeginSave = data =>
  request({
    url: '/partycloud/doubleSixWell/editDSWAgain',
    method: 'post',
    data: data
  })



/*非公党建申报审核信息-审核-保存*/
/*参数 {
  所有必填项
}*/

export const getDeclareNonSave = data =>
  request({
    url: '/partycloud/exemplaryBase/reviewEB',
    method: 'post',
    data: data
  })



/*非公党建申报审核信息-编辑审核不通过审核-保存*/
/*参数 {
  所有必填项
}*/

export const getDeclareNonBeginSave = data =>
  request({
    url: '/partycloud/exemplaryBase/editEBAgain',
    method: 'post',
    data: data
  })



/*双强六好申报审核信息-详情*/
/*参数 {
  id:''
}*/

export const getDeclareDetail = data =>
  request({
    url: '/partycloud/doubleSixWell/queryDSWDetails',
    method: 'post',
    data: data
  })


/*非公党建申报审核信息-详情*/
/*参数 {
  id:''
}*/

export const getDeclareNonDetail = data =>
  request({
    url: '/partycloud/exemplaryBase/queryEBDetails',
    method: 'post',
    data: data
  })


/* 双强六好申报审核信息-导出word*/
export const getDeclareExport = data =>{
  let url = '/partycloud/doubleSixWell/exportDSW'
  commonReq.getHistoryExport(data,url)
}

/* 非公党建申报审核信息-导出word*/
export const getDeclareNonExport = data =>{
  let url = '/partycloud/exemplaryBase/exportEB'
  commonReq.getHistoryExport(data,url)
}


