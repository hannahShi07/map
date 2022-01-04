/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description API申报记录管理
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq  from "@/api/public/commonReq.js"

/*双强六好申报记录管理列表查询*/

/*参数 {

}*/

export const getRecordList = data =>
  request({
    url: '/partycloud/doubleSixWell/queryDSWManagePage',
    method: 'post',
    data: data
  })


/*非公党建申报记录管理列表查询*/

/*参数 {

}*/

export const getRecordNonList = data =>
  request({
    url: '/partycloud/exemplaryBase/queryEBManagePage',
    method: 'post',
    data: data
  })

/*双强六好申报记录管理-审核-保存*/
/*参数 {
  所有必填项
}*/

export const getRecordSave = data =>
  request({
    url: '/partycloud/doubleSixWell/reviewDSW',
    method: 'post',
    data: data
  })


/*非公党建申报记录管理-编辑审核不通过审核-保存*/
/*参数 {
  所有必填项
}*/

export const getRecordNonSave = data =>
  request({
    url: '/partycloud/exemplaryBase/editEBAgain',
    method: 'post',
    data: data
  })



/*双强六好申报记录管理-详情*/
/*参数 {
  id:''
}*/

export const getRecordDetail = data =>
  request({
    url: '/partycloud/doubleSixWell/queryDSWDetails',
    method: 'post',
    data: data
  })


/*非公党建申报记录管理-详情*/
/*参数 {
  id:''
}*/

export const getRecordNonDetail = data =>
  request({
    url: '/partycloud/exemplaryBase/queryEBDetails',
    method: 'post',
    data: data
  })


/* 双强六好申报记录管理-导出word*/
export const getRecordExport = data =>{
  let url = '/partycloud/doubleSixWell/exportDSW'
  commonReq.getHistoryExport(data,url)
}

/* 非公党建申报记录管理-导出word*/
export const getRecordNonExport = data =>{
  let url = '/partycloud/exemplaryBase/exportEB'
  commonReq.getHistoryExport(data,url)
}




