/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 招聘信息API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

/*招聘信息列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'publishDate':'',
    'publishOrg':'',
    'title':'',
  },
  "size": 每页条数
}*/

export const getRecruitList = data =>
  request({
    url: '/partycloud/zhaopinPublish/backPage',
    method: 'post',
    data: data
  })

/*招聘信息列表删除*/

/*参数 {
  id:""
}*/

export const getRecruitDelete = data =>
  request({
    url: '/partycloud/zhaopinPublish/delete',
    method: 'post',
    data: data
  })

/*招聘信息详情*/

/*参数 {
  id:""
}*/

export const getRecruitDetail = data =>
  request({
    url: '/partycloud/zhaopinPublish/detail',
    method: 'post',
    data: data
  })

/*招聘信息新增*/

/*参数 {
  必填项
}*/

export const getRecruitAdd = data =>
  request({
    url: '/partycloud/zhaopinPublish/save',
    method: 'post',
    data: data
  })

/*招聘信息编辑*/

/*参数 {
  id:'',
  必填项
}*/

export const getRecruitEdit = data =>
  request({
    url: '/partycloud/zhaopinPublish/update',
    method: 'post',
    data: data
  })
