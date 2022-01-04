/**
 *  @author wangwei
 *  @email 1440691919@qq.com
 *  @description 题库管理API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../AxiosRequest.js";
import commonReq from "../../../public/commonReq";
import {downloadFile, initQueryParams} from '@/utils/commons'

/*题库管理列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
		'orgId':{
		  data:'',
		  key:''
		},
    'sortCreateDate':'',
    'startDate':'',
    'endDate':'',
    'status':'',
    'title':'',
  },
  "size": 每页条数
}*/

export const getQuestionList = data =>
  request({
    url: '/partycloud/djLearnRepo/selectDjLearnRepoPage',
    method: 'post',
    data: data
  })

/*题库管理列表启用*/

/*参数 {
  id:'',
  status:'',
}*/

export const getQuestionStart = data =>
  request({
    url: '/partycloud/djLearnRepo/updateDjLearnRepo',
    method: 'post',
    data: data
  })

/*题库管理新增*/

/*参数 {
  title:'',
}*/

export const getQuestonlistAdd = data =>
  request({
    url: '/partycloud/djLearnRepo/saveDjLearnRepo',
    method: 'post',
    data: data
  })




/*题库管理详情列表查询*/

/*参数 {
  "current": 当前页数,
  "model": {
    'questTitle':'',
    'repoId':'',
    'sortCreateDate':'',
    'startDate':'',
    'endDate':'',
    'type':'',
  },
  "size": 每页条数
}*/

export const getDetaillist = data =>
  request({
    url: '/partycloud/djLearnRepo/selectDjLearnQuestPage',
    method: 'post',
    data: data
  })

/*题库管理详情列表删除*/

/*参数 {
  ids:'',
  repoId:''
}*/

export const getDetaildetele = data =>
  request({
    url: '/partycloud/djLearnRepo/deleteDjLearnQuest',
    method: 'post',
    data: data
  })

/*题库管理详情列表导出*/

/*参数 {
  ids:'',
  repoId:''
}*/

export const getDetailexport = data =>{
  let url = '/partycloud/djLearnRepo/exportDjLearnQuest'
  commonReq.getQestionExport(data,url)

}

/*题库管理详情列表-查询题库详情*/

/*参数 {
  id:''
}*/

export const getQuestonlistDetail = data =>
  request({
    url: '/partycloud/djLearnRepo/queryRepoById',
    method: 'post',
    data: data
  })

/*题库管理详情列表-编辑题库详情*/

/*参数 {
  id:''
}*/

export const getQuestonlistEdit = data =>
  request({
    url: '/partycloud/djLearnRepo/updateDjLearnRepoUpdateDTO',
    method: 'post',
    data: data
  })


/*题目新增*/

/*参数 {
  isSort:'',
  repoId:'',
  result:'',
  resultAnalysis:'',
  title:'',
  type:'',
}*/

export const getQuestonAdd = data =>
  request({
    url: '/partycloud/djLearnRepo/saveDjLearnQuest',
    method: 'post',
    data: data
  })

/*题目编辑*/

/*参数 {
  id:'',
  isSort:'',
  repoId:'',
  result:'',
  resultAnalysis:'',
  title:'',
  type:'',
}*/

export const getQuestonEdit = data =>
  request({
    url: '/partycloud/djLearnRepo/updateDjLearnQuest',
    method: 'post',
    data: data
  })

/*题目详情*/

/*参数 {
  id:'',
}*/

export const getQuestonDetail = data =>
  request({
    url: '/partycloud/djLearnRepo/selectById',
    method: 'post',
    data: data
  })

