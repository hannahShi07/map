/**
 *  @author wangzhihui
 *  @email 1147965356@qq.com
 *  @description 产业链集合API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";

/* 获取列表数据 */
export const gatColonyList = data =>
  request({
    url: '/partycloud/industryCluster/pageList',
    method: 'post',
    data: data
  })

/* 新增 */
export const gatColonySave = data =>
  request({
    url: '/partycloud/industryCluster/add',
    method: 'post',
    data: data
  })

/* 修改 */
export const gatColonyEdit = data =>
  request({
    url: '/partycloud/industryCluster/edit',
    method: 'post',
    data: data
  })

/* 删除 */
export const gatColonyDelete = data =>
  request({
    url: '/partycloud/industryCluster/delete',
    method: 'post',
    data: data
  })

/* 详情 */
export const gatColonyInfo = data =>
  request({
    url: '/partycloud/industryCluster/detail',
    method: 'post',
    data: data
  })

