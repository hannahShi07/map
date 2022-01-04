/**
 *  @author wsw
 *  @description 学习资料库管理API
 **/
import request from '@/api/AxiosRequest'

/**
 * 获取(音频视频 | 书籍材料 | 其他材料)分页
 */
export const getEducationDataByPage = data =>
  request({
    url: '/partycloud/djLearningFile/selectLearningFileList',
    method: 'post',
    data
  })

/**
 * 删除(音频视频 | 书籍材料 | 其他材料)
 */
export const delEducationData = data =>
  request({
    url: '/partycloud/djLearningFile/deleteDjLearningFile',
    method: 'post',
    data
  })

/**
 * 新增(音频视频 | 书籍材料 | 其他材料)
 */
export const addEducationData = data =>
  request({
    url: '/partycloud/djLearningFile/saveDjLearningFile',
    method: 'post',
    data
  })

/**
 * 编辑(音频视频 | 书籍材料 | 其他材料)
 */
export const setEducationData = data =>
  request({
    url: '/partycloud/djLearningFile/updateDjLearningFile',
    method: 'post',
    data
  })

/**
 * 获取详情(音频视频 | 书籍材料 | 其他材料)
 */
export const getEducationDataMsg = data =>
  request({
    url: '/partycloud/djLearningFile/selectDjLearningFile',
    method: 'post',
    data
  })

/**
 * 增加(音频视频 | 书籍材料 | 其他材料)访问量,点一次调一次
 */
export const addEducationDataSum = data =>
  request({
    url: '/partycloud/djLearningFile/numInc',
    method: 'post',
    data
  })
