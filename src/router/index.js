import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
// import photo from '@/components/photo'
// import about from '@/components/about'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
      // props: route => ({
      //   _key: route.hash
      // })
    }
    // },
    // {
    //   path: '/photo',
    //   name: 'photo',
    //   component: photo
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: about
    // }
  ]
})
