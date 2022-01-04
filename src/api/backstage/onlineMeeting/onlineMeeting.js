/**
 *  @author wangzhihui
 *  @email 1147965356@qq.com
 *  @description 在线会议模块API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../AxiosRequest.js";
import commonReq from '../../public/commonReq.js'

/* 会议信息列表 */
export const getMeetIngList = data =>
  request({
    url: '/partycloud/tencent/findMeetIngList',
    method: 'post',
    data: data
  })

/* 删除会议 */
export const delet = data =>
  request({
    url: '/partycloud/tencent/delete',
    method: 'post',
    data: data
  })
