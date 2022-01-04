/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 优秀支部
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/*优秀支部列表查询*/

export const getExcellentList = data =>
  request({
    url: '/partycloud/excellent/findPage',
    method: 'post',
    data: data
  })



/*优秀支部-新增-保存*/

export const getExcellentAdd = data =>
  request({
    url: '/partycloud/excellent/save',
    method: 'post',
    data: data
  })

/*优秀支部-编辑保存*/

/*参数 {
  "id":''
}*/

export const getExcellentEdit = data =>
  request({
    url: '/partycloud/excellent/updateById',
    method: 'post',
    data: data
  })

/*优秀支部-详情/编辑详情*/

/*参数 {
  "id":''
}*/

export const getExcellentDetail = data =>
  request({
    url: '/partycloud/excellent/selectById',
    method: 'post',
    data: data
  })

/*优秀支部-删除*/
/*参数 {
  memberIds:[]
}*/

export const getExcellentDetele = data =>
  request({
    url: '/partycloud/excellent/deleteById',
    method: 'post',
    data: data
  })

// 查询关联企业
export const searchCompany = data =>
  request({
    url: '/partycloud/enterprise/findEnterpriseByOrgId?orgId='+data,
    method: 'post'
  })



