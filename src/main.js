// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import {
    Form,
    FormItem,
    upload,
    Row,
    Col,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Select,
    Option,
    OptionGroup,
    Button,
    Card,
    Tree,
    Dialog,
    Pagination
} from 'element-ui';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(upload);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(Card);
Vue.use(Pagination);
Vue.use(Tree);
Vue.use(Dialog);
/* eslint-disable no-new */

Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
});
