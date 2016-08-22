import Vue from 'vue'
import VueRouter from "vue-router"   
import filter from "./filter.js"                                                       
import routerMap from "./router.js"
Vue.use(VueRouter);
Object.keys(filter).forEach(k => Vue.filter(k,filter[k]));
let router=new VueRouter({
	saveSrollPosition:true,
	transitionOnLoad:true
})
//当未登录时，点击页脚导航，跳转到登录页面，同时此时记录跳转之前的路径，用query记录下，当登录成功后重新跳回到消息，发表，我的页面
router.beforeEach((transition) => {
	if(transition.to.auth){
		if(localStorage.token){
			transition.next();
		}else{
			let redirect=encodeURIComponent(transition.to.path);
			transition.redirect("/login?redirect="+redirect);
		}
	}else{
		transition.next();
	}
})
let app=Vue.extend({});
routerMap(router);
router.start(app,"#app");

