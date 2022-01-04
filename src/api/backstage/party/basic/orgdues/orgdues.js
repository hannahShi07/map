/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 组织党费
 *  @data {{object} data 接口请求参数
 **/

// 接口还没出

import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/*组织党费列表查询*/

export const getOrgduesList = data =>
  request({
    url: '/partycloud/Orgdues/findPage',
    method: 'post',
    data: data
  })



/*组织党费-新增-保存*/

export const getOrgduesAdd = data =>
  request({
    url: '/partycloud/Orgdues/save',
    method: 'post',
    data: data
  })

/*组织党费-编辑保存*/

/*参数 {
  "id":''
}*/

export const getOrgduesEdit = data =>
  request({
    url: '/partycloud/Orgdues/updateById',
    method: 'post',
    data: data
  })

/*组织党费-详情/编辑详情*/

/*参数 {
  "id":''
}*/

export const getOrgduesDetail = data =>
  request({
    url: '/partycloud/Orgdues/selectById',
    method: 'post',
    data: data
  })

/*组织党费-删除*/
/*参数 {
  memberIds:[]
}*/

export const getOrgduesDetele = data =>
  request({
    url: '/partycloud/Orgdues/deleteById',
    method: 'post',
    data: data
  })




