import Main from "./components/Main.vue"
import Dashboard from "./components/Dashboard.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue"
import PostPhoto from "./components/PostPhoto.vue"

export default [
    {
        path: "/",
        component: Main
    },
    {
        path: "/Dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/Login",
        component: Login
    },
    {
        path: "/Register",
        component: Register
    },
    {
        path: "/Post",
        component: PostPhoto,
        meta: {
            requiresAuth: true
        }
    }
]