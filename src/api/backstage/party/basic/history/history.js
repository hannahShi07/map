/**
 *  @author wangzhihui
 *  @email 1147965356@qq.com
 *  @description 历史人员库模块API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/* 历史人员库-分页查询党员历史库记录*/
export const getHistoryPersonByPage = data =>
  request({
    url: '/partycloud/memberHistory/memberHistoryPage',
    method: 'post',
    data: data
  })

/* 历史人员库-人员类型 - 字典表接口
* 参数：{types：[]}
*
* */
export const getHistoryDict = data =>
  request({
    url: '/partycloud/dict/findDictByTypeIds',
    method: 'get',
    data: data
  })


//详情合在一起的接口暂未开发 start
/* 历史人员库-详情-基本信息 --
* 参数：{id:''}
* */
export const getHistoryDetail = data =>
  request({
    url: '/partycloud/djMember/viewMember',
    method: 'post',
    data: data
  })

/* 历史人员库-详情-发展流程
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

/* 历史人员库-详情-移出历史库 需传字典
移入：1258604854977232896，移出: 1258605078227451904
*
* {
	"handle": {
		"data": "",
		"key": 1258605078227451904
	},
	"memberId": 0,
	"reason": ""
}
* */
export const getHistoryDetailRemove = data =>
  request({
    url: '/partycloud/memberHistory/handlerMemberHistory',
    method: 'post',
    data: data
  })

/* 历史人员库-删除 -- 接口暂未开发*/
export const getHistoryDelet = data =>
  request({
    url: '/partycloud/memberHistory/deleteMemberHistory',
    method: 'post',
    data: data
  })

/* 历史人员库-导出*/
export const getHistoryExport = data =>{
  let url = '/partycloud/memberHistory/exportMemberHistory'
  commonReq.getHistoryExport(data,url)
}

/*详情-发展党员*/
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
