/**
 *  @author wangzhihui
 *  @email 1147965356@qq.com
 *  @description  智能电器产业集群API
 *  @data {{object} data 接口请求参数
 **/

import request from '@/api/AxiosRequest'


/*  智能电器产业集群数据 */
export const getClusterDetail = data =>
  request({
    url: '/partycloud/industryCluster/clusterDetail',
    method: 'post',
    data
  })

/* 智能电器党组织活动风采、联盟党建联席会 */
export const getMeetingPage = data =>
  request({
    url: '/partycloud/unionMeeting/meetingPage',
    method: 'post',
    data
  })


/**
 * 1076000427119649339   联盟党建联席会
 * 1076000427119649340  智能电器茶业链党组织活动
 * 1076000427119649341  生命健康产业链党组织活动
 * */
export const JOINTMEETING = '1076000427119649339'
export const INTELLIGENCE = '1076000427119649340'
export const LIFE = '1076000427119649341'


/**
 * 1133468841887809540   智能电气
 * 1133468841887809541  生命健康
 * */
export const ElECTRIC = '1133468841887809540'
export const LIFEHEALTH = '1133468841887809541'

/*  智能电器产业链组织架构 */
export const getIndustryList = data =>
  request({
    url: '/partycloud/industry/industryList',
    method: 'post',
    data
  })




