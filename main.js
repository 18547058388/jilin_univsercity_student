import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Request from './tools/spt-request/index.js';
// import Application from './tools/spt-application/index.js';

Vue.prototype.request = Request.getInstance();
// Vue.prototype.application = Application.getInstance();

Vue.use(ElementUI);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
