import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/route-components/home';
import release from '@/components/route-components/release';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        component: home
    }, {
        path: '/release',
        name: 'release',
        component: release
    }]
});
