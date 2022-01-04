/**
 *  @author wangzhihui
 *  @email 1147965356@qq.com
 *  @description 产业链集群API
 *  @data {{object} data 接口请求参数
 **/

/*当涂大屏-首页*/
import request from '@/api/AxiosRequest'
import commonReq from '@/api/public/commonReq'


/*园区详情概况*/
export const getClusterDetail = data =>
  request({
    url: '/partyclound/industryCluster/clusterDetail',
    method: 'post',
    data
  })


/*产业链党建*/
export const partyLine = data =>
  request({
    url: '/partycloud/gardenGeneral/detail',
    method: 'post',
    data
  })


/*党组织活动风采、一企一品牌-字典表接口
  * 参数：{types：[]}
  * */
export const getHistoryDict = data =>
  request({
    url: '/partycloud/dict/findDictByTypeIds',
    method: 'get',
    data
  })



