/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 培训报名API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

/*培训报名列表-查询*/

/*参数 {
  "current": 当前页数,
  "model": {

  },
  "size": 每页条数
}*/

export const getTrainList = data =>
  request({
    url: '/partycloud/train/frontPage',
    method: 'post',
    data: data
  })

/*培训报名列表-报名*/

/*参数 {
  id:''
}*/

export const getTrainsignup = data =>
  request({
    url: '/partycloud/trainApply/front/apply',
    method: 'post',
    data: data
  })

/*培训报名列表-取消报名*/

/*参数 {
  id:''
}*/

export const getTrainsigndown = data =>
  request({
    url: '/partycloud/trainApply/front/applyCancel',
    method: 'post',
    data: data
  })

