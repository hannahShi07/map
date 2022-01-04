/**
 *  @author wsw
 *  @description 学习专题管理API
 **/
import request from '@/api/AxiosRequest'
import commonReq from '@/api/public/commonReq'

/**
 * 学习专题管理-学习结果导出
 */
export const getEducationSpecialExport = data => {
  commonReq.getHistoryExport(data, '/partycloud/djLearnTheme/exportDjLearning')
}

/**
 * 学习专题管理-学习结果详情导出
 */
export const getEducationSpecialDetailExport = data => {
  commonReq.getHistoryExport(data, '/partycloud/djLearnTheme/exportCommonOrgResult')
}

/**
 * 学习专题管理-获取分页
 */
export const getEducationSpecialByPage = data =>
  request({
    url: '/partycloud/djLearnTheme/selectLearnThemePage',
    method: 'post',
    data
  })

/**
 * 学习专题管理-切换启用 | 停用
 */
export const setEducationSpecialStatus = data =>
  request({
    url: '/partycloud/djLearnTheme/blockUp',
    method: 'post',
    data
  })

/**
 * 学习专题管理-新增
 */
export const addEducationSpecial = data =>
  request({
    url: '/partycloud/djLearnTheme/saveDjLearnTheme',
    method: 'post',
    data
  })

/**
 * 学习专题管理-新增
 */
export const setEducationSpecial = data =>
  request({
    url: '/partycloud/djLearnTheme/updateDjLearnTheme',
    method: 'post',
    data
  })

/**
 * 学习专题管理-查看详情
 */
export const getEducationSpecialDetail = data =>
  request({
    url: '/partycloud/djLearnTheme/selectDjLearnTheme',
    method: 'post',
    data
  })

/**
 * 学习专题管理-查询学习结果
 */
export const getEducationSpecialStudy = data =>
  request({
    url: '/partycloud/djLearnTheme/selectDjLearningOutcomeVo',
    method: 'post',
    data
  })

/**
 * 学习专题管理-查询学习结果详情
 */
export const getEducationSpecialStudyDetail = data =>
  request({
    url: '/partycloud/djLearnTheme/selectCommonOrgResult',
    method: 'post',
    data
  })

/**
 * 学习专题前台-查询访问量统计信息
 */
export const getEducationSpecialTotal = data =>
  request({
    url: '/partycloud/djLearnTheme/numCount',
    method: 'post',
    data
  })
