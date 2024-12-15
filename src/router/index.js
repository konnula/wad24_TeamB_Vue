import { createRouter, createWebHashHistory } from 'vue-router'
import SignupView from "../views/SignupView.vue"
import LoginView from "../views/LoginView.vue"
import AboutView from "../views/AboutView.vue";
import PostsView from "../views/PostsView.vue";
import PostView from "../views/EditPostView.vue";
import auth from "../auth"

const routes = [
  {
    path: '/',
    name: 'posts',
    component: PostsView,
    beforeEnter: async(to, from, next) => {
        let authResult = await auth.authenticated();
        if (!authResult) {
            next('/login')
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
    path: "/post/:id",
    name: "Post",
    component: PostView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
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
