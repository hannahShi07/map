/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 接受任务管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";

/*接受任务管理列表——查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'orgCode':'',
		"taskState": {data:"",key:""},
		"completeDate": ""
  },
  "size": 每页条数
}*/

export const getacceptTaskList = data =>
  request({
    url: '/partycloud/taskPerform/queryTPPage',
    method: 'post',
    data: data
  })


/*接受任务管理列表——详情*/

/*参数 {
  id:""
}*/

export const getacceptTaskDetail = data =>
  request({
    url: '/partycloud/taskPerform/getTPInfo',
    method: 'post',
    data: data
  })

/*接受任务管理列表——完成操作*/

/*参数 {
  id:""
}*/

export const getacceptTaskComplete = data =>
  request({
    url: '/partycloud/taskPerform/updateTP',
    method: 'post',
    data: data
  })
