/**
 *  @author hanliyan
 *  @email 654993295@qq.com
 *  @description 换届选举公示管理API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq.js";

/*换届选举公示管理列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
  },
  "size": 每页条数
}*/

export const getGeneralelectionList = data =>
  request({
    url: "/partycloud/changeTeam/findList",
    method: "post",
    data: data
  });

/*换届选举公示管理列表删除*/

/*参数 {
 id:'',
isDelete:
}*/

export const getGeneralelectionDetele = data =>
  request({
    url: "/partycloud/changeTeam/delete",
    method: "post",
    data: data
  });

/*换届选举公示管理列表详情*/

/*参数 {
  id:''
}*/

export const getGeneralelectionDetail = data =>
  request({
    url: "/partycloud/changeTeam/findDetail",
    method: "post",
    data: data
  });

/*换届选举公示管理列表新增*/

/*参数 {
  必填项
}*/

export const getGeneralelectionAdd = data =>
  request({
    url: "/partycloud/changeTeam/save",
    method: "post",
    data: data
  });

/*换届选举公示管理列表编辑*/

/*参数 {
  必填项
}*/

export const getGeneralelectionEdit = data =>
  request({
    url: "/partycloud/changeTeam/update",
    method: "post",
    data: data
  });

/*换届选举公示管理新增——参与人员*/

/*参数 {
  必填项
}*/

export const getGeneralelectionPerson = data =>
  request({
    url: "/partycloud/djMember/selectMemberList",
    method: "post",
    data: data
  });
