/**
 *  @author wangzhihui
 *  @email 1147965356@qq.com
 *  @description 产业链组织架构API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";

/* 获取列表数据 */
export const gatStructureList = data =>
  request({
    url: '/partycloud/industry/pageList',
    method: 'post',
    data: data
  })


/* 新增 */
export const gatStructureSave = data =>
  request({
    url: '/partycloud/industry/add',
    method: 'post',
    data: data
  })

/* 修改 */
export const gatStructureEdit = data =>
  request({
    url: '/partycloud/industry/edit',
    method: 'post',
    data: data
  })

/* 删除 */
export const gatStructureDelete = data =>
  request({
    url: '/partycloud/industry/delete',
    method: 'post',
    data: data
  })

/* 详情 */
export const gatStructureInfo = data =>
  request({
    url: '/partycloud/industry/detail',
    method: 'post',
    data: data
  })

