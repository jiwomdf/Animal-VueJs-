import Main from "./components/Main.vue"
import Dashboard from "./components/Dashboard.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue"
import PostPhoto from "./components/PostPhoto.vue"
import state from "./state";

export default [
    { path: "/", component: Main },
    {
        path: "/Dashboard",
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            if (state.loginUserName != "") next()
            else next("/Login")
        }
    },
    { path: "/Login", component: Login },
    { path: "/Register", component: Register },
    {
        path: "/Post",
        component: PostPhoto,
        beforeEnter: (to, from, next) => {
            if (state.loginUserName != "") next()
            else next("/Login")
        }
    }
];