/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 培训管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

/*培训管理列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'department':'',
    'trainStart':'',
  },
  "size": 每页条数
}*/

export const getTrainList = data =>
  request({
    url: '/partycloud/train/backPage',
    method: 'post',
    data: data
  })

/*培训管理列表下线*/

/*参数 {
  id:''
}*/

export const getTrainDown = data =>
  request({
    url: '/partycloud/train/offline',
    method: 'post',
    data: data
  })


/*培训管理列表-管理*/

/*参数 {
  "current": 当前页数,
  "model": {
    'phone':'',
    'userName':'',
    'trainId':'',
  },
  "size": 每页条数
}*/

export const getTrainManage = data =>
  request({
    url: '/partycloud/train/front/applyManage',
    method: 'post',
    data: data
  })

/*培训管理列表-培训记录*/

/*参数 {
  id:'',
  record:''
}*/

export const getTrainRecord = data =>
  request({
    url: '/partycloud/train/front/applyRecord',
    method: 'post',
    data: data
  })

/*培训管理列表-培训新增*/

/*参数 {
  必填项
}*/

export const getTrainAdd = data =>
  request({
    url: '/partycloud/train/save',
    method: 'post',
    data: data
  })

/*培训管理列表-培训编辑*/

/*参数 {
  必填项
}*/

export const getTrainEdit = data =>
  request({
    url: '/partycloud/train/update',
    method: 'post',
    data: data
  })

/*培训管理列表-培训详情*/

/*参数 {
  id:''
}*/

export const getTrainDetail = data =>
  request({
    url: '/partycloud/train/detail',
    method: 'post',
    data: data
  })

