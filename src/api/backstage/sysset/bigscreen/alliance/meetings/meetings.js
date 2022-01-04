/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 党建会议和活动管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../../AxiosRequest.js";
/*党建会议和活动管理列表查询*/
export const getMeetingsList = data =>
  request({
    url: "/partycloud/unionMeeting/meetingPage",
    method: "post",
    data: data
  });

/*党建会议和活动管理列表删除*/
export const getMeetingsDetele = data =>
  request({
    url: "/partycloud/unionMeeting/deleteMeeting",
    method: "post",
    data: data
  });

/*党建会议和活动管理列表详情*/
export const getMeetingsDetail = data =>
  request({
    url: "/partycloud/unionMeeting/findSimpleMeeting",
    method: "post",
    data: data
  });

/*党建会议和活动管理列表新增*/
export const getMeetingsAdd = data =>
  request({
    url: "/partycloud/unionMeeting/addMeeting",
    method: "post",
    data: data
  });

/*党建会议和活动管理列表编辑*/
export const getMeetingsEdit = data =>
  request({
    url: "/partycloud/unionMeeting/updateMeeting",
    method: "post",
    data: data
  });

