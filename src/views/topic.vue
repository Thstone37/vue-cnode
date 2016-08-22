	<template>
		<nv-head page-Type="主题" fix-head="true"></nv-head>
		<load v-if="loadshow"></load>
		<div class="topic-con" v-if="!loadshow">
			<h3 class="title" v-text="topicData.title">				
			</h3>
			<section class="author-info">
				<img :src="topicData.author.avatar_url">
				<div class="author-name">
					<p v-text="topicData.author.loginname"></p>
					<p>发布于{{topicData.create_at|getLastTimeStr true}}</p>
				</div>
				<div class="browser-num">
					<p :class="topicData.tab|getTabClassName topicData.good topicData.top"></p>
					<p>{{topicData.visit_count}}次浏览</p>
				</div>
			</section>
			<section class="topic-content" v-html="topicData.content">				
			</section>
			<h3 class="reply_count"><strong>{{topicData.reply_count}}</strong>回复</h3>
			<section class="reply-list">
				<ul>
					<li v-for="item in topicData.replies">
					   <div class="reply-user">
    						<img :src="item.author.avatar_url">
    						<div class="replier-name">
    							<p v-text="item.author.loginname"></p>
    							<p>发布于{{item.create_at|getLastTimeStr true}}</p>
    						</div>
    						<div class="reply-distribute">
    							<span class="iconfont icon" :class='{"uped":isUps(item.ups)}' @click="upReply(item)">&#xe608;</span>{{item.ups.length}}
    							<span class="iconfont icon" @click="addReply(item.id)">&#xe609;</span>
    						</div>
					   </div>
					    <div class="reply-content" v-html="item.content"></div>
					    <nv-reply :topic-id="topicId" :reply-id="item.id" v-if="userId&&curReplyId==item.id&&showReply" :reply-to="item.author.loginname" :topic-data.sync="topicData"></nv-reply>
					</li>
				</ul>
			</section>
			<nv-reply :topic-id="topicId" v-if="userId" :topic-data.sync="topicData"></nv-reply>
		</div>
    <nv-alert :show="alert.show" :show-text="alert.text"></nv-alert>
	</template>
	<script>
		export default{
		  data(){
		  	return{
		  		topicData:{},
		  		loadshow:true,
		  		topicId:"",
		  		userId:localStorage.userid||"",
		  		curReplyId:"",
          showReply:false,
          alert:{
             show:false,
             text:"",
          }
		  	}
		  },
		  route:{
		  	data(transition){
		  		let id=transition.to.params.id;
		  		let _self=this;
		  		_self.topicId=id;
		  		$.get("https://cnodejs.org/api/v1/topic/"+id,function(d){
		  			console.log(d.data);
		  			_self.topicData=d.data;
		  			_self.loadshow=false;
		  		})
		  	}
		  },
		  methods:{
        isUps(ups){
            return $.inArray(this.userId, ups)>=0;
        },
		  	upReply(item){
		  		let _self=this;
		  		if(!_self.userId){
		  			_self.$route.router.go("/login?redirect="+encodeURIComponent(this.$route.path));
		  		}else{
		  			$.ajax({
		  				type:"post",
		  				url:"https://cnodejs.org/api/v1/reply/"+item.id+"/ups ",
		  				dataType:"json",
		  				data:{accesstoken:localStorage.token},
		  				success:function(res){
		  					if(res.success){
		  						if(res.action=="down"){
                    let index=$.inArray(_self.userId,item.ups);
                    item.ups.splice(index,1);
		  						}else{
                      item.ups.push(_self.userId);
		  						}
		  					}
		  				},
              error:function(res){
                let error=JSON.parse(res.responseText);
                console.log(error);
                _self.alert.text=error.error_msg;
                _self.alert.show=true;
                _self.hideFn();
              }
		  			})
		  		}

		  	},
		  	addReply(id){
		  		this.curReplyId=id;
          this.showReply=!this.showReply;
		  		let _self=this;
		  		if(!_self.userId){
		  			_self.$route.router.go("/login?redirect="+encodeURIComponent(this.$route.path));
		  		}
		  	},
        hideFn(){
            let self=this;
            let timer;
            clearTimeout(timer);
            timer=setTimeout(function(){
            self.alert.show=false;
            }, 2000);
          }
		  },
          components:{
          	"nvHead":require("../components/header.vue"),
          	"load":require("../components/load.vue"),
          	"nvReply":require("../components/reply.vue"),
            "nvAlert":require("../components/nvAlert.vue")
          }
		}
	</script>
	<style lang="scss">
		.topic-con{
      margin-top:45px;
      padding-top:15px;
		   h3{
           font-size:18px;
           background-color:#f0f0f0;
           padding:5px;
           margin:15px;
           color:#2c3e50;
           margin-top:0;
          }
          .author-info{
          	display:flex;
          	padding:0px 15px;
          	font-size:12px;
          	img{
               width:40px;
               height:40px;
               border-radius:50%;
               margin-right:15px;
          	}
          	.author-name{
          		
          		flex:1;
          	}
          	.browser-num{
          		
          		flex:1;
          		text-align:right;
          		p:first-child{
          			display:block;
                        &:before{
                        	font-size:10px;
                        	border-radius:4px;
                        	padding:0px 6px;
                        	
                        	color:#fff;
                        	line-height:24px;
                        	display:inline-block;
                        	height:24px;
                        }
                        &.top:before{
                        	content:"置顶";
                        	background:#E74C3C;
                        }
                        &.good:before{
                        	content:"精华";
                        	background:#E67E22;
                        }
                        &.share:before{
                        	content:"分享";
                        	background:#1ABC9C;
                        }
                        &.ask:before{
                        	content:"问答";
                        	background:#3498DB;
                        }
                        &.job:before{
                        	content:"招聘";
                        	background:#9B59B6;
                        }
					
          	   }
           }
         }
         .topic-content{
         	padding:15px;
         	margin-top:15px;
         	border-bottom:1px solid #d4d4d4;
         	.markdown-text{
         		img{max-width:100%}
         		p{
         			width:100%;
              
         			margin-bottom:15px;
         			img{max-width:100%}
              a{color:#80bd01;}
         		}
         	}
         }
         .reply_count{
         	background-color:#fff;
             strong{
             	color:#42b983;
             }
         }
         .reply-list{
         	ul{
         		width:100%;
         		overflow:hidden;
         		li{
         			padding:15px 10px;
         			border-top:1px solid #d4d4d4;
         		   .reply-user{
         		   	 display:flex;
         		   	 img{
         		   	 	width:40px;
         		   	 	height:40px;
         		   	 	margin-right:10px;
         		   	 	border-radius:50%;
         		   	 }
         		   	 .replier-name{
         		   	 	flex:1;
         		   	 }
         		   	 .reply-distribute{
         		   	 	flex:1;
         		   	 	text-align:right;
         		   	 	span{
         		   	 		font-size:26px;
         		   	 	}
                  .uped{
                    color:#80bd01;
                  }
         		   	 }
         		   }
         		}
         	}
         }
		}
	</style>
