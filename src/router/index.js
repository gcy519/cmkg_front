import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import staticRouter from './staticRouter'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: staticRouter
})

// router.beforeEach((to, from, next) => {
//   next();
// })

export default router
