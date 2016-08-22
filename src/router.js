/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-12 13:17:23
 * @version $Id$
 */

export default function(router){
    router.map({
    	"*":{
            name:"home",
    		component:function(resolve){
    			require(['./views/index.vue'],resolve);
    		}
    	},
        "/":{
            name:"home",
            component:function(resolve){
                require(['./views/index.vue'],resolve);
            }
        },
    	"/list":{
    		name:"list",
    		component:function(resolve){
    			require(['./views/list.vue'],resolve);
    		}
    	},
    	"/login":{
    		name:"login",
    		component:function(resolve){
    			require(['./views/login.vue'],resolve)
    		}
    	},
        "/user/:loginname":{
            name:"user",
            component:function(resolve){
                require(['./views/user.vue'],resolve);
            },
           auth:true
        },
        "/topic/:id":{
            name:"topic",
            component:function(resolve){
                require(['./views/topic.vue'],resolve);
            }
        },
        "/about":{
            name:"about",
            component:function(resolve){
                require(['./views/about.vue'],resolve);
            }
        },
        "/message":{
            name:"message",
            component:function(resolve){
                require(['./views/message.vue'],resolve);
            },
            auth:true
        },
        "/publish":{
            name:"publish",
            component:function(resolve){
                require(['./views/publish.vue'],resolve);
            },
            auth:true
        }
    })
}