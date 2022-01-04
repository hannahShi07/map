/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 流动党员API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/*党员流动列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
      "memberInfo": "",
      "orgId": {
        "data": "",
        "key": 0
      },
      "type": {
        "data": "",
        "key": 0
      }
  },
  "size": 每页条数
}*/

export const getFloatList = data =>
  request({
    url: '/partycloud/djMemberFlow/memberFlowPage',
    method: 'post',
    data: data
  })



/*党员流动-新增流入/流出-保存*/

/*参数 {
  "branchPerson": "",
  	"duesDate": "",
  	"flowMemberNum": "",
  	"flowOrg": "",
  	"flowReasons": "",
  	"inflowDate": "",
  	"inflowOrg": 0,
  	"memberId": 0,
  	"orgAddress": "",
  	"orgId": 0,
  	"orgRelationAddress": "",
  	"outflowDate": "",
  	"returnflowDate": "",
  	"type": {
  		"data": "",
  		"key": 0
  	}
}*/

export const getFloatAdd = data =>
  request({
    url: '/partycloud/djMemberFlow/addDjMemberFlow',
    method: 'post',
    data: data
  })


/*党员流动-编辑保存*/

/*参数 {
  "id":''
}*/

export const getFloatEdit = data =>
  request({
    url: '/partycloud/djMemberFlow/updateDjMemberFlow',
    method: 'post',
    data: data
  })

/*党员流动-详情/编辑详情*/

/*参数 {
  "id":''
}*/

export const getFloatDetail = data =>
  request({
    url: '/partycloud/djMemberFlow/memberFlowDetail',
    method: 'post',
    data: data
  })

/*党员流动-删除*/
/*参数 {
  memberIds:[]
}*/

export const getFloatDetele = data =>
  request({
    url: '/partycloud/djMemberFlow/deleteDjMemberFlow',
    method: 'post',
    data: data
  })

//获取新增流出-所属组织
/*参数 {
  userId:''
}*/

export const getUserinformation = data =>
  request({
    url: '/partycloud/currentUser/findCurrentLoginUser',
    method: 'post',
    data: data
  })

//获取新增流出-党员姓名
/*参数 {
  orgId:''
}*/

export const getOrgName = data =>
  request({
    url: '/partycloud/djMember/selectMemberList',
    method: 'post',
    data: data
  })

export const getSelectFlowOutMemberList = data =>
  request({
    url: '/partycloud/djMemberFlow/selectFlowOutMemberList',
    method: 'post',
    data: data
  })



