import request from '@/plugins/axios'

/**
 * 案件总数折线图
 */
export function casesGroupByDate () {
  return request({
    url: '/dataVisualization/casesGroupByDate',
    method: 'get',
    params: {}
  })
}
