import request from '@/utils/request'

export function updateDeal(dealId, data) {
  return request({
    url: `/deals/${dealId}`,
    method: 'put',
    data,
  })
}

export function deleteDeal(dealId) {
  return request({
    url: `/deals/${dealId}`,
    method: 'delete',
  })
}

export function createDeal(data) {
  return request({
    url: '/deals',
    method: 'post',
    data,
  })
}

export function getDeal(dealId) {
  return request({
    url: `/deals/${dealId}`,
    method: 'get',
  })
}

export function getDealByHouse(houseId, isLoggedIn) {
  return request({
    url: `/deals/house/${isLoggedIn ? 'login/' : ''}${houseId}`,
    method: 'get',
    params: {
      // type: 'APT',
      // pageable: {
      //   page: 1,
      //   size: 10,
      // },
    },
  })
}

export function getAvgDealByHouse(houseId) {
  return request({
    url: `/deals/average/${houseId}`,
    method: 'get',
  })
}
