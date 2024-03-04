import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Index from '@/views/Index.vue';
import Contacts from '@/views/Contacts.vue';
import Profile from '@/views/Profile.vue';

import Blogs from '@/views/Blogs.vue';
import Blog from '@/views/Blog.vue';
import AddToBlog from '@/views/dashboard/AddToBlog.vue';

import SignUp from '@/views/SignUp.vue';
import SignIn from '@/views/SignIn.vue';

const routes: Array<RouteRecordRaw> = [
     { path: "/", name: "Index", component: Index, meta: { title: "Марганецький ліцей № 10" } },
     { path: "/login", name: "SignIn", component: SignIn, meta: { title: "Марганецький ліцей № 10 Авторизация", hideHeader: true, } },
     { path: "/register", name: "SignUp", component: SignUp, meta: { title: "Марганецький ліцей № 10 Регистрация", hideHeader: true, } },
     { path: "/category/news", name: "Blogs", component: Blogs, meta: { title: "Марганецький ліцей № 10 Новини", } },
     { path: "/category/news/detail/:id", name: "Blog", component: Blog },
     { path: "/contacts", name: "Contacts", component: Contacts , meta: { title: "Марганецький ліцей № 10 Контакти" } },
     { path: "/profile", name: "Profile", component: Profile , meta: { title: "Марганецький ліцей № 10 Профиль" } },
     { path: "/add/blog", name: "AddToBlog", component: AddToBlog , meta: { title: "Марганецький ліцей № 10 Добавити Блог", role: 'admin' } },
];

const router = createRouter({
     history: createWebHistory(),
     routes,
});

router.beforeEach((to, from, next) => {
     document.title = to.meta.title as string;
     
     const isAuthenticated = localStorage.getItem("auth") === 'true';
     const userRole = localStorage.getItem("role");

     if ((to.name === 'SignIn' || to.name === 'SignUp') && isAuthenticated) {
          router.push({ name: "Index" });
     } else if (to.matched.length === 0) {
          router.push({ name: "Index" });
     } else {
          const requiredRole = to.meta.role;
          
          if (requiredRole && userRole !== requiredRole) {
              router.push({ name: "Index" });
          } else {
              next();
          };
     };
});
export default router;