/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description  先进模范API
 *  @data {{object} data 接口请求参数
 **/

import request from '@/api/AxiosRequest'

/*  先进模范列表 */
export const getModellist = data =>
  request({
    url: '/partycloud/advancePunish/findPunishList',
    method: 'post',
    data
  })

