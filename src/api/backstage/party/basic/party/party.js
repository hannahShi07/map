/**
 *  @author wangzhihui
 *  @email 1147965356@qq.com
 *  @description 党组织架构API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

/*党组织查询 - 党组织架构
*
* 参数 { name:''}
*
* */
export const getPartyTree = data =>
  request({
    url: '/partycloud/djOrg/partyTree',
    method: 'post',
    data: data
  })

/*党组织查询 - 其他模块左侧树
*
* 参数 { name:''}
*
* */
export const getOtherTree = data =>
  request({
    url: '/partycloud/djOrg/djOrgTree',
    method: 'post',
    data: data
  })

/*党组织架构查询列表
*
* 参数 {
*  "current": 页数,
* "model": {
*    "categoryId": 0,
*   "code": "",
*  "name": ""
* },
* "size": 每页条数
*}
* */
export const getPartyList = data =>
  request({
    url: '/partycloud/djOrg/djOrgPage',
    method: 'post',
    data: data
  })

/*导出*/
export const getPartyExport = data =>{
  let url = '/partycloud/djOrg/exportOrgExcel'
  commonReq.getHistoryExport(data,url)
}

/*党组织架构 - 详情
*
* 参数{id:0}
*
* */
export const getPartydetail = data =>
  request({
    url: '/partycloud/djOrg/orgDetail',
    method: 'post',
    data: data
  })

/*党组织架构-撤销
*
* 参数{orgId:0}
*
* */
export const getPartyRevoke = data =>
  request({
    url: '/partycloud/djOrg/orgUndo',
    method: 'post',
    data: data
  })

/*党组织架构
*
* */
export const getPartyCategory = data =>
  request({
    url: '/partycloud/dict/findDictByOrgCategory',
    method: 'post',
    data: data
  })

/*党组织架构 - 新增保存
*
* */
export const getPartySave = data =>
  request({
    url: '/partycloud/djOrg/save',
    method: 'post',
    data: data
  })

/*党组织架构 - 编辑保存
*
* */
export const getPartyUpdate = data =>
request({
  url: '/partycloud/djOrg/update',
  method: 'post',
  data: data
})

/*党组织架构-导入
* 参数{
*   headRows:1,
*   titleRows:2,
*   file:文件,
*   parentOrgName:上级党组织
* }
* */
export const getPartyImport = data =>
  request({
    url: '/partycloud/djOrg/importOrgExcel',
    formData: true,
    method: 'post',
    data: data
  })


/*党组织架构 - 选择人员
*
* 参数{ info:'',orgId:''}
*
* */
export const getPartyMemberList= data =>
  request({
    url: '/partycloud/djMember/selectMemberList',
    method: 'post',
    data: data
  })

/*党组织架构- 批量迁移党员
*
* */
export const getPartyMigration = data =>
  request({
    url: '/partycloud/djOrg/massMigrationMember',
    method: 'post',
    data: data
  })

/*党组织架构 - 党小组组长列表数据，正式党员
*
* 参数{ info:'',orgId:''}
*
* */
export const getPartydjGroupMembers= data =>
  request({
    url: '/partycloud/djMember/djGroupMember',
    method: 'post',
    data: data
  })

/*党组织架构 - 党小组成员
*
* 参数{ info:'',orgId:''}
*
* */
export const getPartygroupMember= data =>
  request({
    url: '/partycloud/djGroup/groupMemberList',
    method: 'post',
    data: data
  })

/*党组织架构 - 判断手机号码的唯一性
*
* 参数{ orgId: 0, phone:''}
*
* */
export const getOrgPhoneIsRepeat= data =>
  request({
    url: '/partycloud/djOrg/findOrgPhoneIsRepeat',
    method: 'post',
    data: data
  })


/**
 * 查询党组织所在分页位置
 * @Date: 2021/2/26
 */
export const findOrgPageNum = data =>
  request({
    url: '/partycloud/djOrg/findOrgPageNum',
    method: 'post',
    data: data
  })
