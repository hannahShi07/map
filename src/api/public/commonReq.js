import request from "../AxiosRequest";
import {downloadFile, initQueryParams} from '@/utils/commons'

export default {
  /* 字典表接口
  * 参数：{types：[]}
  * */
  getHistoryDict( data){
    return request({
      url: '/partycloud/dict/findDictByTypeIds',
      method: 'get',
      data: data
    })
  },


  /* 自定义字典表接口
  * 参数：{types：[]}
  * */
  getCustomDict( data){
    return request({
      url: '/partycloud/dict/findCustomDict',
      method: 'post',
      data: data
    })
  },

  /*验证身份证号和手机号的唯一性*/
  getVerification(data){
    return request({
      url: '/partycloud/djMember/findMemberIdCardOrPhone',
      method: 'post',
      data: data
    })
  },

  /*查询企业*/
  getCompanyname(data){
    return request({
      url: '/partycloud/enterprise/selectEnterprise',
      method: 'post',
      data: data
    })
  },

  /* 导出 */
  getHistoryExport (data,url) {
    return request({
      url: url,
      method: 'post',
      responseType: "blob",
      data: initQueryParams(data)
    }).then(response => {
      downloadFile(response);
    })
  },

  /*题库导出*/
  getQestionExport (data,url) {
    return request({
      url: url,
      method: 'post',
      responseType: "blob",
      data: data
    }).then(response => {
      downloadFile(response);
    })
  },
  /*前台-获取用户信息*/
  getUserinformation(data){
    return request({
      url: '/partycloud/currentUser/findCurrentLoginUser',
      method: 'post',
      data: data
    })
  },

  //获取党员姓名
  /*参数 {
    orgId:''
  }*/

  getOrgName(data){
    return request({
      url: '/partycloud/djMember/selectMemberList',
      method: 'post',
      data: data
    })
  },


  /*前台-选择党组织*/
  getOrglist(data){
    return request({
      url: '/partycloud/djOrg/djOrgList',
      method: 'post',
      data: data
    })
  },

  /*新增 - 获取id*/
  getNewUid(data){
    return request({
      url: '/partycloud/currentUser/getUid',
      method: 'post',
      data: data
    })
  },
  // 校验身份证号
  verificationIdCard(data){
    return request({
      url: '/partycloud/currentUser/validateMemberInfo',
      method: 'post',
      data: data
    })
  },

  //附件回显
  /*
  参数{
    bizIds: '',//数据id
    bizTypes: ''//附件上传的标识
  }
  */
  getAttachment(data){
    return request({
      url: '/file/attachment',
      method: 'get',
      data: data
    })
  },
  //附件下载
  /*
  参数{
    filename: '',//文件名
    url: ''//文件地址
  }
  */
  downloadFile (url,name) {
    let data = {
      filename:name,
      url:url
    }
    return request({
      url: '/file/attachment/download/url',
      method: 'get',
      responseType: "blob",
      data: initQueryParams(data)
    }).then(response => {
      downloadFile(response);
    })
  },


  /* 附件与业务关联接口*/
  relationFile(data){
    return request({
      url: '/file/attachment/submitFile',
      method: 'post',
      data: data
    })
  },
  /* 附件与业务关联接口*/
  uploadFile(data){
    return request({
      url: '/file/attachment/uploadFile',
      method: 'post',
      data: data
    })
  },


  /* 附件与业务关联接口 视频专用*/
  relationFileVideo(data){
    return request({
      url: '/file/attachment/submitVideoFile',
      method: 'post',
      data: data
    })
  }

}

