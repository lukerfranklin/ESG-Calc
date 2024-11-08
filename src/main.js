import { createApp } from 'vue';

import BootstrapVueNext from 'bootstrap-vue-next';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../src/assets/scss/app.scss'

import App from './App.vue';
import VueApexCharts from 'vue3-apexcharts';

createApp(App)
    .use(VueApexCharts)
    .use(BootstrapVueNext)
    .mount('#app');
