/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 党建联席活动前台API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/*党建联席活动列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'constructionType':'',
		"orgCode": "",
  },
  "size": 每页条数
}*/

export const getProjectList = data =>
  request({
    url: '/partycloud/partyConstruction/findFrontPage',
    method: 'post',
    data: data
  })

/*党建联席活动列表详情*/

/*参数 {
  id:''
}*/

export const getProjectDetail = data =>
  request({
    url: '/partycloud/partyConstruction/find',
    method: 'post',
    data: data
  })
