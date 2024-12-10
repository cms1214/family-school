import {createRouter, createWebHashHistory} from 'vue-router'

import Register from '@/views/Register.vue'

const routes = [
    {
        path: "/",
        name: "layout",
        redirect: "/home",
        component: () => import("@/views/Layout.vue"),
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import("@/views/components/Home.vue"),
            },
            {
                path: "/study",
                name: "study",
                component: () => import("@/views/components/Study.vue"),
            },
            {
                path: "/status",
                name: "status",
                component: () => import("@/views/components/Status.vue"),
            },
            {
                path: "/manage",
                name: "manage",
                component: () => import("@/views/components/Manage.vue"),
            },
            {
                path: "/activity",
                name: "activity",
                component: () => import("@/views/components/Activity.vue"),
            },
            {
                path: "/setting",
                name: "setting",
                component: () => import("@/views/components/UserSetting.vue"),
            },
        ],
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