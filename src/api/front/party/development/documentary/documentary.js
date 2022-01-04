/**
 *  @author wangzhihui
 *  @email 1147965356@qq.com
 *  @description 发展党员纪实模块API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/* 发展党员纪实-分页列表查询*/
export const getDevelopPersonByPage = data =>
  request({
    url: '/partycloud/djMemberDevelop/memberDevelopPageFront',
    method: 'post',
    data: data
  })


  /* 发展党员纪实-获取阶段数值*/
export const getDevelopCount = data =>
  request({
    url: '/partycloud/djMemberDevelop/djMemberDevelopCount',
    method: 'post',
    data: data
  })

/*发展党员纪实-详情*/
/*参数 {
  id:''
}*/

export const getHistoryDetail = data =>
  request({
    url: '/partycloud/djMember/viewMemberFront',
    method: 'post',
    data: data
  })


/*发展党员纪实-流程详情*/
/* {
	id:''
}
* */
export const getDetailProcess = data =>
  request({
    url: '/partycloud/djMemberDevelop/developProcess',
    method: 'post',
    data: data
  })

/* 发展党员纪实-详情-附件
*参数：
	"model": {
		"id": 1
	}
* */
export const getHistoryDetailFile = data =>
  request({
    url: '/partycloud/djMember/memberDevelopFile',
    method: 'post',
    data: data
  })
