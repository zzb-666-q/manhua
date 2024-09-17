import request from '@/https/http.js';
//首页 获取轮播图
export function getBanner(query) {
  return request({
    url: '/Banner',
    method: 'get',
    params: query,
  });
}

//首页 获取分类列表
export function getClassify(query) {
  return request({
    url: '/AllLabel',
    method: 'get',
    params: query,
  });
}
//首页 获取为你推荐列表
export function getCommend(query) {
  return request({
    url: '/HomeRecommend',
    method: 'get',
    params: query,
  });
}
//首页 热门速递列表
export function getHotlist(query) {
  return request({
    url: '/GetClassPageSixComics',
    method: 'get',
    params: query,
  });
}

//漫画搜索
export function comicSearch(query) {
  return request({
    url: '/Search',
    method: 'get',
    params: query,
  });
}
//漫画分类列表
export function ClassPage(query) {
  return request({
    url: '/ClassPage',
    method: 'get',
    params: query,
  });
}

//漫画详情
export function getComicDetail(query) {
  return request({
    url: '/ComicDetail',
    method: 'get',
    params: query,
  });
}
//漫画更多推荐列表
export function getRecomm(query) {
  return request({
    url: '/MoreRecommend',
    method: 'get',
    params: query,
  });
}
//漫画评论
export function getReplyMain(query) {
  return request({
    url: '/ReplyMain',
    method: 'get',
    params: query,
  });
}

//获取排行榜
export function getRankInfo(query) {
  return request({
    url: '/GetRankInfo',
    method: 'get',
    params: query,
  });
}
//漫画获取图片地址列表
export function getImageIndex(query) {
  return request({
    url: '/GetImageIndex',
    method: 'get',
    params: query,
  });
}
//漫画图片
export function getImageToken(query) {
  return request({
    url: '/ImageToken',
    method: 'get',
    params: query,
  });
}


// export function addBinding(data) {
//   return request({
//     url: '/carrier/binding',
//     method: 'post',
//     data: data,
//   });
// }
