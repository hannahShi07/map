/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 流动党员API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

//前台-流动党员按流动类型统计
/*参数 {
  orgCode:''//组织编码
}*/

export const getFloatstatistics = data =>
  request({
    url: '/partycloud/djMemberFlow/memberFlowCnt',
    method: 'post',
    data: data
  })


//前台-流动党员分页查询
/*参数 {
  "current": 当前页数,
  "model": {
      "orgCode": "",//组织编码
  },
  "size": 每页条数
}*/

export const getFloatpage = data =>
  request({
    url: '/partycloud/djMemberFlow/memberFlowPageFront',
    method: 'post',
    data: data
  })

/*党员流动-详情*/

/*参数 {
  "id":''
}*/

export const getFloatDetail = data =>
  request({
    url: '/partycloud/djMemberFlow/memberFlowDetail',
    method: 'post',
    data: data
  })



/*流动党员详情*/
/*参数 {
  id:''
}*/

// export const getHistoryDetail = data =>
//   request({
//     url: '/partycloud/djMember/viewMemberFront',
//     method: 'post',
//     data: data
//   })


/*详情-发展党员*/
/* {
	id:''
}
* */
// export const getDetailProcess = data =>
//   request({
//     url: '/partycloud/djMemberDevelop/developProcess',
//     method: 'post',
//     data: data
//   })
