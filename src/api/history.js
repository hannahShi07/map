import request from './AxiosRequest.js'

/* 历史人员库api */

/**
 * 历史人员库-获取分页
 * */
export const getHistoryPersonByPage = params =>
  request({
    url: '',
    method: 'get',
    params: params
  })

/**
 * 历史人员库-新增
 * */
export const addHistoryPerson = data =>
  request({
    url: '',
    method: 'post',
    data: data
  })
