/* eslint-disable no-unused-vars */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../src/pages/Boms'
import BomDetails from '../src/pages/BomDetails'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/index',
            // name: 'home',
            component: Home
        },
        {
            path: '/GetBomDetail/:assemblyPartNumber',
            name: 'GetBomDetail',
            component: BomDetails
        }

    ]
})