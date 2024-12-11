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


router.beforeEach((to, from, next) => {
    /**
     * to:   要到哪个路由
     * from: 当前路由
     * next: 只有执行next页面才会跳转
     */
        // console.log("目标路由：", to, "当前路由：", from)

        //从localstorage中获取token
    const token = localStorage.getItem("token");

    if (!token) {
        //localstorage中不存在token
        if (to.path === "/login") {
            next();
            return;
        }
        if (to.path === "/register") {
            next();
            return;
        }
        next("/login");
    } else {
        //localstorage中存在token
        next();
    }
});


export default router;