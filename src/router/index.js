import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [

  {
    path: '/navi',
    name: 'navi',
    alias: '',
    component: () => import('../views/Navi.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        alias: '',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/classify',
        name: 'classify',
        component: () => import('../views/Classify.vue')
      },
      {
        path: '/rankinglist',
        name: 'rankinglist',
        component: () => import('../views/RankingList.vue')
      },
      {
        path: '/renew',
        name: 'renew',
        component: () => import('../views/Renew.vue')
      },
      {
        path: '/cartoondetail',
        name: 'cartoondetail',
        component: () => import('../views/CartoonDetail.vue')
      },
      {
        path: '/comicsearch',
        name: 'comicsearch',
        component: () => import('../views/comicSearch.vue')
      },
    ]
  },
  {
    path: '/comiccontent',
    name: 'comiccontent',
    component: () => import('../views/ComicContent.vue')
  },


]

const router = new VueRouter({
  routes
})

export default router
