/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 班子管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//班子成员列表
export const getElectionList = data =>
  request({
    url: '/partycloud/election/findElectionList',
    method: 'post',
    data: data
  })

/* 新增班子成员 */
export const addLeadership = data =>
request({
  url: '/partycloud/leadership/addLeadership',
  method: 'post',
  data: data
})

/* 详情 */
export const electionInfo = data =>
  request({
    url: '/partycloud/election/findElectionLeadership',
    method: 'post',
    data: data
  })

/* 新增 */
export const addElectionList = data =>
  request({
    url: '/partycloud/election/addElection',
    method: 'post',
    data: data
  })

// 删除
export const deleteElection = data =>
  request({
    url: '/partycloud/election/deleteElection',
    method: 'post',
    data: data
  })

// 编辑
export const editElectionList = data =>
  request({
    url: '/partycloud/election/updateElection',
    method: 'post',
    data: data
  })

  // 班子成员删除
export const deleteMembersList = data =>
  request({
    url: '/partycloud/leadership/deleteLeadership',
    method: 'post',
    data: data
  })

// 获取查询组织最新一届换届选举
export const getNewElection = data =>
  request({
    url: '/partycloud/election/findNowElection',
    method: 'post',
    data: data
  })