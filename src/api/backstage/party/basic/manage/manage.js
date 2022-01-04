/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description API党员管理
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/*党员管理列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
      "memberInfo":"",
      "orgId":"",
      "orgName":"",
      "state":""
  },
  "size": 每页条数
}*/

export const getManageList = data =>
  request({
    url: '/partycloud/djMember/memberPage',
    method: 'post',
    data: data
  })

/*党员管理-新增-保存*/
/*参数 {
  所有必填项
}*/

export const getManageAdd = data =>
  request({
    url: '/partycloud/djMember/addMember',
    method: 'post',
    data: data
  })

/*党员管理-编辑-保存*/
/*参数 {
  所有必填项
}*/

export const getManageEdit = data =>
  request({
    url: '/partycloud/djMember/updateMember',
    method: 'post',
    data: data
  })


/*党员管理-详情*/
/*参数 {
  id:''
}*/

export const getManageDetail = data =>
  request({
    url: '/partycloud/djMember/viewMember',
    method: 'post',
    data: data
  })


//获取新增流出-移至历史人员库
/*参数 {
  	"handle": {
  		"data": "",
  		"key": 0
  	},
  	"memberId": 0,
  	"reason": ""
}*/

export const getMoveHistory = data =>
  request({
    url: '/partycloud/memberHistory/handlerMemberHistory',
    method: 'post',
    data: data
  })

//获取党员管理新增、编辑-所属党组织
/*参数 {
  name:组织名称
}*/

export const getManageTree = data =>
  request({
    url: '/partycloud/djOrg/djOrgTree',
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


/* 流动党员-导出*/
export const getManageExport = data =>{
  let url = '/partycloud/djMember/exportMember'
  commonReq.getHistoryExport(data,url)
}


