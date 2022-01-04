/**
 *  @author hanliyan
 *  @description 政策下发API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//政策下发列表
export const policyPage = data =>
  request({
    url: '/partycloud/policy/findPolicyPage',
    method: 'post',
    data: data
  })

//政策下发新增保存
export const policySave = data =>
  request({
    url: '/partycloud/policy/addPolicy',
    method: 'post',
    data: data
  })

// 政策下发详情
export const getpolicyInfo = data =>
  request({
    url: '/partycloud/policy/policyDetail',
    method: 'post',
    data: data
  })

// 政策下发编辑
export const policyEdit = data =>
  request({
    url: '/partycloud/policy/updatePolicy',
    method: 'post',
    data: data
  })


//检测标签
// export const policyLable = data =>
//   request({
//     url: '/partycloud/policy/detectionLable',
//     method: 'post',
//     data: data
//   })

// 政策下发删除
export const policyDelet = data =>
  request({
    url: '/partycloud/policy/deletePolicy',
    method: 'post',
    data: data
  })
