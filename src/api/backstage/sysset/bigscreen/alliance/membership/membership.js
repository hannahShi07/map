/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 联盟会员名单API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../../AxiosRequest.js";
/*联盟会员名单列表查询*/
export const getMembershipList = data =>
  request({
    url: "/partycloud/unionMembers/memberPage",
    method: "post",
    data: data
  });

/*联盟会员名单列表删除*/
export const getMembershipDetele = data =>
  request({
    url: "/partycloud/unionMembers/deleteMember",
    method: "post",
    data: data
  });

/*联盟会员名单列表详情*/
export const getMembershipDetail = data =>
  request({
    url: "/partycloud/unionMembers/findSimpleMember",
    method: "post",
    data: data
  });

/*联盟会员名单列表新增*/
export const getMembershipAdd = data =>
  request({
    url: "/partycloud/unionMembers/addMember",
    method: "post",
    data: data
  });

/*联盟会员名单列表编辑*/
export const getMembershipEdit = data =>
  request({
    url: "/partycloud/unionMembers/updateMember",
    method: "post",
    data: data
  });


