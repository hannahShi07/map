/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 培训心得API
 *  @data {{object} data 接口请求参数
 **/

import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

/*培训心得列表-查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    theme:'',
    trainStart:''
  },
  "size": 每页条数
}*/

export const getTrainList = data =>
  request({
    url: '/partycloud/trainApply/front/applyExperienceList',
    method: 'post',
    data: data
  })

/*培训心得列表导出*/

/*参数 {
  id:''
}*/

export const getTrainExport = data =>{
  let url = '/partycloud/trainApply/front/exportApplyExperience'
  commonReq.getHistoryExport(data,url)
}

/*培训心得列表-心得/编辑上传*/

/*参数 {
  experience:'',
  trainId:'',
}*/

export const getTrainAdd = data =>
  request({
    url: '/partycloud/trainApply/front/saveApplyExperience',
    method: 'post',
    data: data
  })


/*培训心得列表-心得详情*/

/*参数 {
  trainId:'',
}*/

export const getTraindetail = data =>
  request({
    url: '/partycloud/trainApply/front/applyExperienceDeatil',
    method: 'post',
    data: data
  })
