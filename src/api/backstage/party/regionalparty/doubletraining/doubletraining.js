/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 三培双帮带API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/*三培双帮带列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'constructionType':'',
		"orgCode": "",
		"orgName": "",
		"startTime": "",
		"theme": "",
  },
  "size": 每页条数
}*/

export const getProjectList = data =>
  request({
    url: '/partycloud/partyConstruction/findBackPage',
    method: 'post',
    data: data
  })

/*三培双帮带列表详情*/

/*参数 {
  id:''
}*/

export const getProjectDetail = data =>
  request({
    url: '/partycloud/partyConstruction/find',
    method: 'post',
    data: data
  })

/*三培双帮带列表删除*/

/*参数 {
  "ids": []
}*/

export const getProjectDetele = data =>
  request({
    url: '/partycloud/partyConstruction/delete',
    method: 'post',
    data: data
  })

/*三培双帮带列表新增*/

/*参数 {
  "address": "",
	"constructionType": 0,
	"content": "",
	"id": 0,
	"orgId": 0,
	"participantsIds": "",
	"participantsNum": 0,
	"startTime": "",
	"theme": ""
}*/

export const getProjectAdd = data =>
  request({
    url: '/partycloud/partyConstruction/save',
    method: 'post',
    data: data
  })

/*三培双帮带列表编辑*/

/*参数 {
  "address": "",
	"constructionType": 0,
	"content": "",
	"id": 0,
	"orgId": 0,
	"participantsIds": "",
	"participantsNum": 0,
	"startTime": "",
	"theme": ""
}*/

export const getProjectEdit = data =>
  request({
    url: '/partycloud/partyConstruction/update',
    method: 'post',
    data: data
  })

/*新增、编辑和删除权限控制*/
/*
参数:''
* */

export const getAuthority = data =>
  request({
    url: '/partycloud/partyConstruction/isAllowed',
    method: 'post',
    data: data
  })
