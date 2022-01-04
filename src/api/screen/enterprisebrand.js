/*当涂大屏-一企一品牌*/
import request from '@/api/AxiosRequest'
import commonReq from '@/api/public/commonReq'

/*企业列表*/
export const companyList = data =>
  request({
    url: '/partycloud/company/companyList',
    method: 'post',
    data
  })


/*企业详情*/
export const companyDetail = data =>
  request({
    url: '/partycloud/company/companyDetail',
    method: 'post',
    data
  })

