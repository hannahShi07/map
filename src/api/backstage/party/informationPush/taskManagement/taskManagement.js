/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 发布任务管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";

/*发布任务管理列表——查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'orgCode':'',
		"orgId": {data:"",key:""},
		"completeState": ""
  },
  "size": 每页条数
}*/

export const getTaskmanagementList = data =>
  request({
    url: '/partycloud/taskIssue/queryTIPage',
    method: 'post',
    data: data
  })


/*发布任务管理列表——编辑*/

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

export const getTaskmanagementEdit = data =>
  request({
    url: '/partycloud/taskIssue/updateTI',
    method: 'post',
    data: data
  })


/*发布任务管理列表——新增*/

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

export const getTaskmanagementAdd = data =>
  request({
    url: '/partycloud/taskIssue/saveTI',
    method: 'post',
    data: data
  })

/*发布任务管理列表——详情*/

/*参数 {
  id:""
}*/

export const getTaskmanagementDetail = data =>
  request({
    url: '/partycloud/taskIssue/queryTIById',
    method: 'post',
    data: data
  })

/*发布任务管理列表——任务完成情况详情*/

/*参数 {
  id:""
}*/

export const getTaskcompleteDetail = data =>
  request({
    url: '/partycloud/taskIssue/queryTIById',
    method: 'post',
    data: data
  })

/*发布任务管理列表——撤销*/

/*参数 {
  id:""
}*/

export const getTaskmanagementDetele = data =>
  request({
    url: '/partycloud/taskIssue/deleteTI',
    method: 'post',
    data: data
  })

