/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

// Containers
const TheContainer = () => import('@/containers/TheContainer')

const Oppos = () => import('@/pages/Oppos')
const LogIn = () => import('@/pages/Login')


export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})

function configRoutes() {
    return [
        {
            path: '/',
            redirect: '',
            name: 'Home',
            component: TheContainer,
            children: [
                {
                    path: 'oppos',
                    name: 'Oppos',
                    component: Oppos
                }
            ]
        },
        {
            path: '/LogIn',
            redirect: '',
            name: 'LogIn',
            component: LogIn,
        }

    ]
}