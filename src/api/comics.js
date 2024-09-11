import request from '@/utils/request';

//漫画搜索
export function comicSearch(query) {
  return request({
    url: '/Search',
    method: 'get',
    params: query,
  });
}
//漫画搜索
export function ClassPage(query) {
  return request({
    url: 'ClassPage',
    method: 'get',
    params: query,
  });
}

// 新增承运商揽件地址绑定
export function addBinding(data) {
  return request({
    url: '/carrier/binding',
    method: 'post',
    data: data,
  });
}
