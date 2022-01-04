/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description API党费返还
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from '../../../../public/commonReq.js'

/* 党费返还-导出*/
export const getUseExport = data =>{
  let url = 'partycloud/duesUse/exportDuesUse'
  commonReq.getHistoryExport(data,url)
}

/* 获取列表 */
export const getUseList = data =>
  request({
    url: '/partycloud/duesUse/getDuesUseList',
    method: 'post',
    data: data
  })

/* 新增 */
export const addUse = data =>
  request({
    url: '/partycloud/duesUse/saveDuesUse',
    method: 'post',
    data: data
  })

/* 删除 */
export const deleteUse = data =>
  request({
    url: '/partycloud/duesUse/deleteDuesUse',
    method: 'post',
    data: data
  })

/* 详情 */
export const useInfo = data =>
  request({
    url: '/partycloud/duesUse/getDuesUseDeatil',
    method: 'post',
    data: data
  })

/* 编辑 */
export const useEdit = data =>
request({
  url: '/partycloud/duesUse/updateDuesUse',
  method: 'post',
  data: data
})

/* 查询组织返还总额和使用总额 */
export const useMoney = data =>
request({
  url: '/partycloud/duesUse/countReturnMoney',
  method: 'post',
  data: data
})
