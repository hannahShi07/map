/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 工作动态API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";

/*工作动态列表——查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'orgCode':'',
		"orgId": {data:"",key:""},
		"wageDate": ""
  },
  "size": 每页条数
}*/

export const getDynamicworkList = data =>
  request({
    url: '/partycloud/workTrend/queryWTPage',
    method: 'post',
    data: data
  })


/*工作动态列表——编辑*/

/*参数 {
  	"content": "",
	"fileUrl": "",
	"id": 0,
	"orgId": {
		"data": "",
		"key": 0
	},
	"title": "",
	"wageDate": ""
}*/

export const getDynamicworkEdit = data =>
  request({
    url: '/partycloud/workTrend/updateWT',
    method: 'post',
    data: data
  })


/*工作动态列表——新增*/

/*参数 {
  "content": "",
	"fileUrl": "",
	"orgId": {
		"data": "",
		"key": 0
	},
	"title": "",
	"wageDate": ""
}*/

export const getDynamicworkAdd = data =>
  request({
    url: '/partycloud/workTrend/saveWT',
    method: 'post',
    data: data
  })

/*工作动态列表——详情*/

/*参数 {
  id:""
}*/

export const getDynamicworkDetail = data =>
  request({
    url: '/partycloud/workTrend/queryWTDetails',
    method: 'post',
    data: data
  })

/*工作动态列表——删除*/

/*参数 {
  id:""
}*/

export const getDynamicworkDetele = data =>
  request({
    url: '/partycloud/workTrend/deleteWT',
    method: 'post',
    data: data
  })

