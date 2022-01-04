/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 结对共建前台API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/*结对共建列表查询*/

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

/*结对共建列表详情*/

/*参数 {
  id:''
}*/

export const getProjectDetail = data =>
  request({
    url: '/partycloud/partyConstruction/find',
    method: 'post',
    data: data
  })
