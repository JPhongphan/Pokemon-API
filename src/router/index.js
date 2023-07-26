import {createRouter, createWebHistory} from 'vue-router'

import Pokemon_home from '../views/Pokemon_home.vue'
import Pokemon_about from '../views/Pokemon_about.vue'

const routes = [
    {
        path:'/',
        name:'Pokemon',
        component: Pokemon_home,
    },
    {
        path:'/About',
        name:'Pokemon_about',
        component: Pokemon_about
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router