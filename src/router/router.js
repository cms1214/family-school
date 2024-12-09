import {createRouter, createWebHashHistory} from 'vue-router'

import Register from '@/views/Register.vue'

const routes = [
    {
        path: "/",
        name: "layout",
        component: () => import("@/views/Layout.vue"),
    },
    {
        path: '/login',
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: '/register',
        component: Register
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


export default router;