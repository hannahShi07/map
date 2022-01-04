/**
 *  @author wsw
 *  @description 党员奖惩模块API
 **/
import request from '@/api/AxiosRequest'
import commonReq from '@/api/public/commonReq'

/**
 * 党员奖惩管理-导出
 */
export const getAwardPartyExport = data => {
  commonReq.getHistoryExport(data, '/partycloud/memberPrizePunish/exportMemberPrizePunish')
}

/**
 * 党员奖惩管理-分页查询
 */
export const getAwardPartyByPage = data =>
  request({
    url: '/partycloud/memberPrizePunish/pageMemberPrizePunish',
    method: 'post',
    data
  })

/**
 * 党员奖惩管理-添加
 */
export const addAwardParty = data =>
  request({
    url: '/partycloud/memberPrizePunish/addMemberPrizePunish',
    method: 'post',
    data
  })

/**
 * 党员奖惩管理-编辑
 */
export const setAwardParty = data =>
  request({
    url: '/partycloud/memberPrizePunish/updateMemberPrizePunish',
    method: 'post',
    data
  })

/**
 * 党员奖惩管理-删除
 */
export const delAwardParty = data =>
  request({
    url: '/partycloud/memberPrizePunish/deleteMemberPrizePunish',
    method: 'post',
    data
  })

/**
 * 党员奖惩管理-获取详情
 */
export const getAwardPartyMsg = data =>
  request({
    url: '/partycloud/memberPrizePunish/detailMemberPrizePunish',
    method: 'post',
    data
  })

/**
 * 组织奖惩管理-导出
 */
export const getAwardOrgExport = data => {
  commonReq.getHistoryExport(data, '/partycloud/djOrgPrizePunish/exportOrgPrizePunish')
}

/**
 * 组织奖惩管理-分页查询
 */
export const getAwardOrgByPage = data =>
  request({
    url: '/partycloud/djOrgPrizePunish/findDjOrgPrizePunish',
    method: 'post',
    data
  })

/**
 * 组织奖惩管理-添加
 */
export const addAwardOrg = data =>
  request({
    url: '/partycloud/djOrgPrizePunish/addOrgPrizePunish',
    method: 'post',
    data
  })

/**
 * 组织奖惩管理-编辑
 */
export const setAwardOrg = data =>
  request({
    url: '/partycloud/djOrgPrizePunish/updateOrgPrizePunish',
    method: 'post',
    data
  })

/**
 * 组织奖惩管理-删除
 */
export const delAwardOrg = data =>
  request({
    url: '/partycloud/djOrgPrizePunish/deleteOrgPrizePunish',
    method: 'post',
    data
  })

/**
 * 组织奖惩管理-获取详情
 */
export const getAwardOrgMsg = data =>
  request({
    url: '/partycloud/djOrgPrizePunish/getOrgPrizePunish',
    method: 'post',
    data
  })
