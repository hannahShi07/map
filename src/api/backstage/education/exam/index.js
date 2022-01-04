/**
 *  @author liudeng
 *  @description 考试管理API
 **/
import request from '@/api/AxiosRequest';

import commonReq from '../../../public/commonReq';

/**
 * 获取分页查询考试列表
 */
export const getExamList = data =>
  request({
    url: '/partycloud/learnExam/queryExamPage',
    method: 'post',
    data
  })

/**
 * 删除考试
 */
export const delExam = data =>
  request({
    url: '/partycloud/learnExam/deleteExam',
    method: 'post',
    data
  })

/**
 * 新增考试
 */
export const addExam = data =>
  request({
    url: '/partycloud/learnExam/saveExam',
    method: 'post',
    data
  })

/**
 * 编辑考试
 */
export const updateExam = data =>
  request({
    url: '/partycloud/learnExam/editExam',
    method: 'post',
    data
  })

/**
 * 获取详情
 */
export const getExamDetail = data =>
  request({
    url: '/partycloud/learnExam/examDetail',
    method: 'post',
    data
  })

/**
 * 试卷预览
 */
export const previewPaper = data =>
  request({
    url: '/partycloud/learnExam/examPaperDetail',
    method: 'post',
    data
  })

/**
 * 考试结果---个人
 */
export const examResultPerson = data =>
  request({
    url: '/partycloud/learnExam/examResultMember',
    method: 'post',
    data
  })

/**
 * 考试结果---组织
 */
export const examResultOrg = data =>
  request({
    url: '/partycloud/learnExam/examResultOrg',
    method: 'post',
    data
  })

/**
 * 试卷导出
 */
// export const exportpaper = data =>
//   request({
//     url: '/partycloud/learnExam/exportExam',
//     method: 'post',
//     data
//   })
export const exportpaper = data => {
  let url = '/partycloud/learnExam/exportExam'
  commonReq.getHistoryExport(data, url)
}
//答案导出
export const exportAnswer = data => {
  let url = '/partycloud/learnExam/exportExamAnswer'
  commonReq.getHistoryExport(data, url)
}

//导出考试结果--个人
export const exportExamResultPerson = data => {
  let url = '/partycloud/learnExam/exportExamResultMember'
  commonReq.getHistoryExport(data, url)
}

//导出考试结果--组织
export const exportExamResultOrg = data => {
  let url = '/partycloud/learnExam/exportExamResultOrg'
  commonReq.getHistoryExport(data, url)
}

//考试信息--前台
export const examInfo = data =>
  request({
    url: '/partycloud/learnExam/examReceptionQuery',
    method: 'post',
    data
  })

//
export const getDetaillist = data =>
  request({
    url: '/partycloud/learnExam/selectQuestPage',
    method: 'post',
    data
  })

/**
 * 获取考试组织
 */
export const examOrgList = data =>
  request({
    url: '/partycloud/learnExam/resultOrgList',
    method: 'post',
    data
  })
