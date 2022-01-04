/**
 *  @author wangwei
 *  @email 1147965356@qq.com
 *  @description 组织转接模块API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";

/* 组织转接-分页查询党员接转或历史记录
*
*{
  "current": 1,
  "model": {
   "orgId": {  // 所属组织
            "data": ""
    },
    info："",//党员信息
    "transferState": {// 接转状态
            "data": "",
            "key": 0
    },
    orgIdWrite:"",//原组织
    "acceptOrg": {//接收组织
            "data": ""
    },
    "type": {// 接转类型
            "data": "",
            "key": 0
    }，
  },
  "size": 10,
}
*
* */
export const getOrgPage = data =>
  request({
    url: '/partycloud/memberTransfer/pageMemberTransfer',
    method: 'post',
    data: data
  })

/* 组织转接-组织关系转入-保存*/
/*参数：必填参数*/
export const getOrgAdd = data =>
  request({
    url: '/partycloud/memberTransfer/addMemberTransfer',
    method: 'post',
    data: data
  })


/* 组织转接-详情
*
* 参数：{id：0}
* */
export const getOrgDetail = data =>
  request({
    url: '/partycloud/memberTransfer/memberTransferDetails',
    method: 'post',
    data: data
  })

/* 组织转接详情-历史记录列表
*
* 参数：{
  "current": 1,
	"model": {
    	"memberId": {
        "data": '',
        "key": 0
      },
  },
  "size": 10,
* */
export const getOrgDetaillist = data =>
  request({
    url: '/partycloud/memberTransfer/pageMemberTransferHistory',
    method: 'post',
    data: data
  })

/* 组织转接详情-历史记录列表详情
*
* 参数：{
  id:''
* */
export const getOrgHistorydetail = data =>
  request({
    url: '/partycloud/memberTransfer/memberTransferHistoryDetails',
    method: 'post',
    data: data
  })

/* 组织转接-撤销/审核
*
* 参数：{
  auditResult:'',
  id：0,
  transferState:{
    data:'',
    key:''
  }
  }
* */
export const getOrgDetele = data =>
  request({
    url: '/partycloud/memberTransfer/memberTransferAudit',
    method: 'post',
    data: data
  })


//获取组织关系转出-园区内党组织
/*参数 {
  name:组织名称
}*/

export const getOrgTree = data =>
  request({
    url: '/partycloud/djOrg/djOrgTree',
    method: 'post',
    data: data
  })

//获取组织关系转入/转出-当前组织
/*参数 {
  userId:''
}*/

export const getUserinformation = data =>
  request({
    url: '/partycloud/currentUser/findCurrentLoginUser',
    method: 'post',
    data: data
  })

//获取组织关系转出-党员姓名
/*参数 {
  orgId:''
}*/

export const getOrgName = data =>
  request({
    url: '/partycloud/djMember/selectMemberList',
    method: 'post',
    data: data
  })

//验证身份证号，获取性别、民族和出生日期
/*参数 {
  memberId:'',
  opt:'',
  value:''
}*/

export const getidCode = data =>
  request({
    url: '/partycloud/currentUser/validateMemberInfo',
    method: 'post',
    data: data
  })


/**
 * 查询所有可用党组织(不包括党小组与组织权限)
 * @Author: dfzhu
 * @Date: 2020/12/11
 */
export const getAllOrgTree = data =>
  request({
    url: '/partycloud/memberTransfer/findAllOrgTree',
    method: 'post',
    data: data
  })
