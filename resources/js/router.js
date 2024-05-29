import Router from 'vue-router';
import Tasks from './pages/Tasks.vue';
import NotFound from './pages/NotFound.vue';
import Login from './pages/Login.vue';
import Registration from './pages/Registration.vue';
import store from './store';

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/tasks',
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'registration',
      component: Registration,
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound,
    },
    {
      path: '/:catchAll(.*)',
      redirect: '404',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if user is authenticated
    if (!store.getters.isAuthenticated) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
