/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 党员示范岗API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//党员示范岗
export const getDemonstrationList = data =>
  request({
    url: '/partycloud/memberExamplePost/pageList',
    method: 'post',
    data: data
  })

// 选择党员
export const getPartyMember = data =>
  request({
    url: '/partycloud/memberExamplePost/selectMember',
    method: 'post',
    data: data
  })

/* 新增 */
export const demonstrationSave = data =>
request({
  url: '/partycloud/memberExamplePost/add',
  method: 'post',
  data: data
})

/* 编辑 */
export const demonstrationEdit = data =>
request({
  url: '/partycloud/memberExamplePost/edit',
  method: 'post',
  data: data
})

/* 删除 */
export const deleteDemonstration = data =>
  request({
    url: '/partycloud/memberExamplePost/delete',
    method: 'post',
    data: data
  })

/* 详情 */
export const infoDemonstration = data =>
  request({
    url: '/partycloud/memberExamplePost/view',
    method: 'post',
    data: data
  })
