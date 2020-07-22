import Dashboard from "./components/Dashboard.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue"

export default [
    { path: "/", component: Dashboard },
    { path: "/Login", component: Login },
    { path: "/Register", component: Register }
];