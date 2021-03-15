/* eslint-disable no-unused-vars */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Oppos from '../pages/Oppos'
import BomDetails from '../pages/BomDetails'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Oppos
        },
        {
            path: '/GetBomDetail/:assemblyPartNumber',
            name: 'GetBomDetail',
            component: BomDetails
        }

    ]
})