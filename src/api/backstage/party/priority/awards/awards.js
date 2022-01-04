/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description API奖项申报
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";

/*双强六好奖项申报-新增保存*/
/*参数 {
  id:''
}*/

export const getSixRecordAdd = data =>
  request({
    url: '/partycloud/doubleSixWell/saveOrSubmitDSW',
    method: 'post',
    data: data
  })


/*双强六好奖项申报-审核不通过再次编辑*/
/*参数 {
  id:''
}*/

export const getSixRecordEdit = data =>
  request({
    url: '/partycloud/doubleSixWell/editDSWAgain',
    method: 'post',
    data: data
  })

/*双强六好奖项申报-导出word*/
/*参数 {
  id:''
}*/

export const getSixRecordWord = data =>
  request({
    url: '/partycloud/doubleSixWell/exportDSW',
    method: 'post',
    data: data
  })


/*双强六好奖项申报-详情*/
/*参数 {
  id:''
}*/

export const getSixRecordDetail = data =>
  request({
    url: '/partycloud/doubleSixWell/queryDSWDetails',
    method: 'post',
    data: data
  })



/*非公党建示范点奖项申报-新增保存*/
/*参数 {
  id:''
}*/

export const getNonRecordAdd = data =>
  request({
    url: '/partycloud/exemplaryBase/saveOrSubmitEB',
    method: 'post',
    data: data
  })


/*非公党建示范点奖项申报-审核不通过再次编辑*/
/*参数 {
  id:''
}*/

export const getNonRecordEdit = data =>
  request({
    url: '/partycloud/exemplaryBase/editEBAgain',
    method: 'post',
    data: data
  })

/*非公党建示范点奖项申报-导出word*/
/*参数 {
  id:''
}*/

export const getNonRecordWord = data =>
  request({
    url: '/partycloud/exemplaryBase/exportEB',
    method: 'post',
    data: data
  })


/*非公党建示范点奖项申报-详情*/
/*参数 {
  id:''
}*/

export const getNonRecordDetail = data =>
  request({
    url: '/partycloud/exemplaryBase/queryEBDetails',
    method: 'post',
    data: data
  })


/*奖项申报-社会组织名称*/
/*参数 {
  id:''
}*/

export const getsocialOrgName = data =>
  request({
    url: '/partycloud/enterprise/selectEnterprise',
    method: 'post',
    data: data
  })


/*奖项申报-党组织设置*/
/*参数 {
  id:''
}*/

export const getOrgSetDisc = data =>
  request({
    url: '/partycloud/dict/findCustomDict',
    method: 'post',
    data: data
  })

/*判断是否有未提交申请*/
/*参数 {
}*/
export const getNonSubmit = data =>
  request({
    url: '/partycloud/exemplaryBase/findUnSubmit',
    method: 'post',
    data: data
  })


/*清除未提交申请*/
/*参数 {
}*/
export const getDelete = data =>
  request({
    url: '/partycloud/exemplaryBase/deleteUnSubmit',
    method: 'post',
    data: data
  })



