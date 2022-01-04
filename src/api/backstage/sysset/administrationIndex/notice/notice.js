/**
 *  @author wagnzhihui
 *  @description 公告管理
 **/
import request from "../../../../AxiosRequest.js";

/**
 * 公告管理列表
 */
export const getNoticelist = data =>
  request({
    url: "/partycloud/afficheTerrace/findAfficheTerracePage",
    method: "post",
    data
  });

/**
 * 公告管理新增-保存、发布
 */
export const getNoticeAdd = data =>
  request({
    url: "/partycloud/afficheTerrace/save",
    method: "post",
    data
  });

/**
 * 公告管理编辑、撤下
 */
export const getNoticeedit = data =>
  request({
    url: "/partycloud/afficheTerrace/update",
    method: "post",
    data
  });

/**
 * 公告管理详情
 */
export const getNoticeInfo = data =>
  request({
    url: "/partycloud/afficheTerrace/view",
    method: "post",
    data
  });

