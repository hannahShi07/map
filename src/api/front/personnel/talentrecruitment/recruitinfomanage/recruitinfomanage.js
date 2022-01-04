/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 招聘信息前台API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

/*招聘信息列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'publishDate':'',
    'publishOrg':'',
    'title':'',
  },
  "size": 每页条数
}*/

export const getRecruitList = data =>
  request({
    url: '/partycloud/zhaopinPublish/frontPage',
    method: 'post',
    data: data
  })

/*招聘信息列表详情*/
/*参数 {
  id:''
}*/

export const getRecruitDetail = data =>
  request({
    url: '/partycloud/zhaopinPublish/detail',
    method: 'post',
    data: data
  })
