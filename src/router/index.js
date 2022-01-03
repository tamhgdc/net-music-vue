import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            isNavShow: true,
            isTopShow: true,
            keepAlive: true,
        }
    },
    {
        path: '/Mine',
        name: 'Mine',
        component: () => import('../views/Mine.vue'),
        meta: {
            isNavShow: true,
            isTopShow: true,
            keepAlive: true,
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            isNavShow: true,
        }
    },
    {
        path: '/list/:id/:type',
        name: 'List',
        component: () => import('../views/List.vue'),
        meta: {
            isNavShow: false,
        }

    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {
            isNavShow: false,
            isTopShow: false,
        }
    },
    {
        path: '/player/:id/:n',
        name: 'Player',
        component: () => import('../views/Player.vue'),
        meta: {
            isNavShow: false,
            keepAlive: false,
        }
    }

]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router