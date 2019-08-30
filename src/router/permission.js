import router from './index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start()

  next()
})

router.afterEach(() => {
  NProgress.done()
})
