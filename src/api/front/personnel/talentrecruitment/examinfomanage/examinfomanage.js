/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 考试公示API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

/*考试公示列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'publishDate':'',
    'publishOrg':'',
    'title':'',
  },
  "size": 每页条数
}*/

export const getExamList = data =>
  request({
    url: '/partycloud/examPublish/frontPage',
    method: 'post',
    data: data
  })

/*考试公示详情*/

/*参数 {
  id:""
}*/

export const getExamDetail = data =>
  request({
    url: '/partycloud/examPublish/findOne',
    method: 'post',
    data: data
  })
