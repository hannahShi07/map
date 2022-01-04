/**
 *  @author wangzhihui
 *  @email 1147965356@qq.com
 *  @description 金融产品管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../AxiosRequest.js";
import commonReq from "../../../public/commonReq";

//金融产品管理 新增
export const financialAdd = data =>
  request({
    url: '/partycloud/financialProduct/saveDjFinancialProducts',
    method: 'post',
    data: data
  })

//金融产品管理 编辑
export const financialEdit = data =>
  request({
    url: '/partycloud/financialProduct/updateDjFinancialProducts',
    method: 'post',
    data: data
  })

//金融产品管理 列表
export const financialList = data =>
  request({
    url: '/partycloud/financialProduct/selectDjFinancialProductsList',
    method: 'post',
    data: data
  })

//金融产品管理 详情
export const financialDetail = data =>
  request({
    url: '/partycloud/financialProduct/detailDjFinancialProducts',
    method: 'post',
    data: data
  })
