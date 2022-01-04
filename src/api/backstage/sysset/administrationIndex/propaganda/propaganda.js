/**
 *  @author wangwei
 *  @description 宣传栏管理
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/**
 * 宣传栏管理列表
 */
export const getPropagandalist = data =>
  request({
    url: "/partycloud/advertising/findAdvertisingPage",
    method: "post",
    data
  });

/**
 * 宣传栏管理新增-保存
 */
export const getPropagandaadd = data =>
  request({
    url: "/partycloud/advertising/addAdvertising",
    method: "post",
    data
  });

/**
 * 宣传栏管理详情
 */
export const getPropagandadetail = data =>
  request({
    url: "/partycloud/advertising/detail",
    method: "post",
    data
  });

/**
 * 宣传栏管理编辑
 */
export const getPropagandaedit = data =>
  request({
    url: "/partycloud/advertising/updateAdvertising",
    method: "post",
    data
  });

/**
 * 宣传栏管理投放
 */
export const getPropagandaput = data =>
  request({
    url: "/partycloud/advertising/putAdvertising",
    method: "post",
    data
  });

/**
 * 宣传栏管理撤销
 */
export const getPropagandarevoke= data =>
  request({
    url: "/partycloud/advertising/undoAdvertising",
    method: "post",
    data
  });


