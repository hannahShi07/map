/*当涂大屏-产业链企业和职能部门*/
import request from '@/api/AxiosRequest'
import commonReq from '@/api/public/commonReq'

/*联盟问题明细*/
export const issueList = data =>
  request({
    url: '/partycloud/feedback/findFeedbackPage',
    method: 'post',
    data
  })


/*点对点智库*/
export const thinkTank = data =>
  request({
    url: '/partycloud/unionThinkTank/thinkTankPageFront',
    method: 'post',
    data
  })


/*服务企业工作清单*/
export const serviceWork = data =>
  request({
    url: '/partycloud/unionWorkList/workListPageFront',
    method: 'post',
    data
  })

/*产业链集群活动清单*/
export const industryActivities = data =>
  request({
    url: '/partycloud/industryActivity/activityList',
    method: 'post',
    data
  })

