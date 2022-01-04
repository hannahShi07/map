/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 新闻舆情API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

//新闻舆情列表查询
export const newsPage = data =>
  request({
    url: '/partycloud/popularFeelings/selectPopularFeelings',
    method: 'post',
    data: data
  })
