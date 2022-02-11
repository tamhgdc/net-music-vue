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
            isMiniPlayerShow: true,

            keepAlive: true,
        }
    },
    {
        path: '/Mine',
        name: 'Mine',
        component: () => import('../views/Mine.vue'),
        meta: {
            isNavShow: true,
            isMiniPlayerShow: true,

            keepAlive: false,
        }
    },
    {
        path: '/daily-remd-list',
        name: 'DailyRemdList',
        component: () => import('../views/DailyRemdList.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: true,

            keepAlive: false,
        }
    },
    {
        path: '/playlist-plaza/:curr?',
        name: 'PlaylistPlaza',
        component: () => import('../views/PlaylistPlaza.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: true,

            keepAlive: false,
        }
    },
    {
        path: '/tags',
        name: 'Tags',
        component: () => import('../views/Tags.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: true,

            keepAlive: false,
        }
    },
    {
        path: '/list/:id/:type',
        name: 'List',
        component: () => import('../views/List.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: true,
            keepAlive: false,
        }

    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: false,

        }
    },
    {
        path: '/player',
        name: 'Player',
        component: () => import('../views/Player.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: false,
            keepAlive: true,
        }
    },
    {
        path: '/comment/:id/:type',
        name: 'Comment',
        component: () => import('../views/Comment.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: false,
            keepAlive: false,
        }
    },
    {
        path: '/tags-list/:cat',
        name: 'TagsList',
        component: () => import('../views/TagsList.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: true,

            keepAlive: false,
        }
    },
    {
        path: '/top-list',
        name: 'TopList',
        component: () => import('../views/TopList.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: true,
            keepAlive: false,
        }
    },
    {
        path: '/follow',
        name: 'Follow',
        component: () => import('../views/Follow.vue'),
        meta: {
            isNavShow: true,
            isMiniPlayerShow: true,
            keepAlive: false,
        }
    },
    {
        path: '/topic-page/:id',
        name: 'Topic',
        component: () => import('../views/Topic.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: false,
            keepAlive: false,
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: true,
            keepAlive: false,
        }
    },
    {
        path: '/search/:key',
        name: 'SearchResult',
        component: () => import('../views/SearchResult.vue'),
        meta: {
            isNavShow: false,
            isMiniPlayerShow: true,
            keepAlive: false,
        }
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router