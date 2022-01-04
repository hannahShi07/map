/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 督查通报API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'


/*督查通报列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'orgId':'',
		"articleSource": "",
		"articleTitle": "",
		"releaseTime": ""
  },
  "size": 每页条数
}*/

export const getInspectionList = data =>
  request({
    url: '/partycloud/inspectionReport/list',
    method: 'post',
    data: data
  })

/*督查通报列表删除*/

/*参数 {
  ids:[]
}*/

export const getInspectionDetele = data =>
  request({
    url: '/partycloud/inspectionReport/delete',
    method: 'post',
    data: data
  })

/*督查通报列表详情*/

/*参数 {
  id:''
}*/

export const getInspectionDetail = data =>
  request({
    url: '/partycloud/inspectionReport/find',
    method: 'post',
    data: data
  })

/*督查通报列表新增*/

/*参数 {
  必填项
}*/

export const getInspectionAdd = data =>
  request({
    url: '/partycloud/inspectionReport/save',
    method: 'post',
    data: data
  })

/*督查通报列表编辑*/

/*参数 {
  必填项
}*/

export const getInspectionEdit = data =>
  request({
    url: '/partycloud/inspectionReport/update',
    method: 'post',
    data: data
  })


