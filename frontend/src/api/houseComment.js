import request from '@/utils/request'

export function updateArticle(articleId, data) {
  return request({
    url: `/articles/${articleId}`,
    method: 'put',
    data,
  })
}

export function deleteArticle(articleId) {
  return request({
    url: `/articles/${articleId}`,
    method: 'delete',
  })
}

export function getArticlesByHouse(houseId) {
  return request({
    url: `/houses/${houseId}/articles`,
    method: 'get',
  })
}

export function createArticle(houseId, data) {
  return request({
    url: `/houses/${houseId}/articles`,
    method: 'post',
    data,
  })
}

export function getMyArticles() {
  return request({
    url: '/me/articles',
    method: 'get',
  })
}
