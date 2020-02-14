import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [];

let files = require.context('./', false, /.router.js$/);
files.keys().map(key => {
    routes.push(...files(key).default);
});

let pages = require.context('../pages', true, /.vue$/);
pages.keys().map(key => {
    let name = key.replace(/(\.\/|\.vue)/g, '');
    routes.push({
        path: '/page/' + name,
        component: pages(key).default
    })
});

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router
