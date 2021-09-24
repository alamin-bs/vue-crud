import {createRouter,createWebHistory} from 'vue-router'
import Post from './components/Post'
import Category from './components/Category'
import Tabs from './components/Tabs'

const routes = [
    {path:'/',component: Tabs, children:[
        {path:'',redirect: 'post'},
        {path:'post',component: Post },
        {path:'category',component: Category },
    ] },
    

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;