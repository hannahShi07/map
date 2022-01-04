/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 培训记录API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

/*培训记录列表-查询*/

/*参数 {
  "current": 当前页数,
  "model": {

  },
  "size": 每页条数
}*/

export const getTrainList = data =>
  request({
    url: '/partycloud/trainApply/front/applyList',
    method: 'post',
    data: data
  })

/*培训记录列表-详情*/

/*参数 {
 trainId:''
}*/

export const getTraindetail = data =>
  request({
    url: '/partycloud/trainApply/front/applyDetail',
    method: 'post',
    data: data
  })
