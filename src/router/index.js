import { createRouter, createWebHashHistory } from 'vue-router'
import SignupView from "../views/SignupView.vue"
import AboutView from "../views/AboutView.vue";
import PostsView from "../views/PostsView.vue";
import auth from "../auth"

const routes = [
  {
    path: '/',
    name: 'posts',
    component: PostsView,
    beforeEnter: async(to, from, next) => {
        let authResult = await auth.authenticated();
        if (!authResult) {
            next('/signup')
        } else {
            next();
        }
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
