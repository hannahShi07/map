/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 双带动三提升工程API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/*双带动三提升工程列表查询*/

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

/*双带动三提升工程列表详情*/

/*参数 {
  id:''
}*/

export const getProjectDetail = data =>
  request({
    url: '/partycloud/partyConstruction/find',
    method: 'post',
    data: data
  })

/*双带动三提升工程列表删除*/

/*参数 {
  "ids": []
}*/

export const getProjectDetele = data =>
  request({
    url: '/partycloud/partyConstruction/delete',
    method: 'post',
    data: data
  })

/*双带动三提升工程列表新增*/

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

/*双带动三提升工程列表编辑*/

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





