import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/route-components/home';
import release from '@/components/route-components/release';
import menu from '@/components/route-components/menu';
import banner from '@/components/route-components/banner';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/home',
        name: 'home',
        component: home
    }, {
        path: '/release',
        name: 'release',
        component: release
    }, {
        path: '/menu',
        name: 'menu',
        component: menu
    }, {
        path: '/banner',
        name: 'banner',
        component: banner
    }, {
        path: '*',
        name: 'home',
        component: home
    }]
});
