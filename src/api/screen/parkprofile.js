import request from '@/api/AxiosRequest'
import commonReq from '@/api/public/commonReq'

/**
 *  @author hanliyan
 *  @email 654993295@qq.com  2021、10、22
 *  @description 园区概况API
 *  @data {{object} data 接口请求参数
 **/

//园区概况管理查看详情
  export const getEchartsData = data =>
    request({
    url: '/partycloud/gardenGeneral/detail',
    method: 'post',
    data
  })

//性别分布图
  export const getSexData = data =>
    request({
    url: '/partycloud/windows/sex/person',
    method: 'post',
    data
  })

//年龄分布图
  export const getAgeData = data =>
    request({
    url: '/partycloud/windows/age/person',
    method: 'post',
    data
  })

//党员发展数量统计
  export const getStatisticsData = data =>
    request({
    url: '/partycloud/windows/party/member',
    method: 'post',
    data
  })


//单位性质
export const getDistributionData = data =>
  request({
    url: '/partycloud/windows/workUnit/person',
    method: 'post',
    data
  })

