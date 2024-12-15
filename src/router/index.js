import { createRouter, createWebHashHistory } from 'vue-router'
import SignupView from "../views/SignupView.vue"
import LoginView from "../views/LoginView.vue"
import ContactUsView from "../views/ContactUsView.vue";
import PostsView from "../views/PostsView.vue";
import EditPostView from "../views/EditPostView.vue";
import AddPostView from "../views/AddPostView";
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
    name: "EditPostView",
    component: EditPostView,
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
    path: "/posts/addpost",
    name: "Post",
    component: AddPostView,
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
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/contactus',
    name: 'Contact Us',
    component: ContactUsView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
