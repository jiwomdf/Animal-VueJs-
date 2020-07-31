import Main from "./components/Main.vue"
import Dashboard from "./components/Dashboard.vue";
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue"
import PostPhoto from "./components/PostPhoto.vue"
import ApiDocumentation from "./components/ApiDocumentation.vue"

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
        component: Login,
        meta: {
            nonAuth: true
        }
    },
    {
        path: "/Register",
        component: Register,
        meta: {
            nonAuth: true
        }
    },
    {
        path: "/Post",
        component: PostPhoto,
        meta: {
            requiresAuth: true
        }
    }, {
        path: "/ApiDocumentation",
        component: ApiDocumentation,
    }
]