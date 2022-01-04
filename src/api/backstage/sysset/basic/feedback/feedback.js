/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 意见反馈API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*意见反馈列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getFeedbackList = data =>
  request({
    url: "/partycloud/feedback/findFeedbackPage",
    method: "post",
    data: data
  });

/*意见反馈列表删除*/

/*参数 {
 id:'',
isDelete:
}*/

export const getFeedbackDetele = data =>
  request({
    url: "/partycloud/feedback/deleteFeedback",
    method: "post",
    data: data
  });

/*意见反馈列表详情*/

/*参数 {
  id:''
}*/

export const getFeedbackDetail = data =>
  request({
    url: "/partycloud/feedback/viewFeedback",
    method: "post",
    data: data
  });

/*意见反馈列表处理*/

/*参数 {
  必填项
}*/

export const getFeedbackEdit = data =>
  request({
    url: "/partycloud/feedback/processingFeedback",
    method: "post",
    data: data
  });

/*意见反馈导出*/

/*参数 {
  必填项
}*/

/* 导出*/
export const getFeedbackExp = data => {
  let url = "/partycloud/feedback/exportFeedback";
  commonReq.getHistoryExport(data, url);
};
