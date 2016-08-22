	<template>
		<nv-head page-type="用户信息" fix-head="true" :show-bar="showMenu"></nv-head>
		<section class="userinfo" v-if="!loadshow">
			<div class="u-info">
				<img :src="user.avatar_url">
				<span v-text="user.loginname"></span>
			</div>
			<div class="u-ref">
				<span class="u-create-time" v-text="user.create_at|getLastTimeStr false"></span>
				<span class="u-score">积分:{{user.score}}</span>
			</div>
		</section>
		<section class="recent-dynamic">
			<div class="recent-tabs">
				<span class="recent-reply" :class="{'selected':selectItem===1}" @click="changeItem(1)">最近回复</span>
				<span class="recent-publish" :class="{'selected':selectItem===2}" @click="changeItem(2)">最新发布</span>
			</div>
			<div class="recent-content" v-for="item in recentData">
				<section class="recent-li">
					<img :src="item.author.avatar_url" v-link="{name:'user',params:{loginname:item.author.loginname}}">
					<div class="info" v-link="{name:'topic',params:{id:item.id}}">
						<h3 v-text="item.title"></h3>
						<div class="author">
							<span v-text="item.author.loginname"></span>
							<span v-text="item.last_reply_at|getLastTimeStr true"></span>
						</div>
					</div>
				</section>
			</div>

		</section>
		<load v-if="loadshow"></load>
		<nv-foot :select="4"></nv-foot>
	</template>
	<script>
		export default{
			data(){
                return{
                	user:{},
                	selectItem:1,
                	recentData:[],
                	showMenu:false,
                	loadshow:true
                }
			},
			route:{
                data(transition){
                	let loginname;
                	if(transition.from.name=='user'){
                	   loginname=transition.to.params.loginname;}
                	else{
                       loginname=localStorage.loginname;
                	}
                	let _self=this;
                	//当点击其他用户图片
                	if(transition.from.name=="user"){
                        _self.showMenu=false;
                	}
                	$.get("https://cnodejs.org/api/v1/user/"+loginname,function(d){
                		console.log(d);
                		if(d&&d.data){
                		   _self.loadshow=false;
                           _self.user=d.data;
                           if(d.data.recent_replies.length>0){
                               _self.recentData=d.data.recent_replies;
                           }else{
                           	  _self.recentData=d.data.recent_topics;
                           }
                		}
                	})
                }
			},
			methods:{
				changeItem(num){
                    this.selectItem=num;
                    this.recentData=this.selectItem===1?this.user.recent_replies:this.user.recent_topics;
				}
			},
			components:{
				"nvHead":require("../components/header.vue"),
				"nvFoot":require("../components/nvfooter.vue"),
				"load":require("../components/load.vue")
			}
		}
	</script>
	<style lang="scss">
		.userinfo{
			background-color:#e7e7e7;
			text-align:center;
			padding-bottom:15px;
			margin-top:45px;
			.u-info{
				padding-top:15px;				
				img{
					display:block;
					width:100px;
					height:100px;
					border-radius:50%;
					margin:0 auto;
				}
				span{
					display:block;
					font-size:14px;
				}
			}
			.u-ref{
				display:flex;
				margin-top:20px;
				.u-create-time{
					font-size:14px;
					flex:1;
					text-align:center;
					margin-left:10px;
				}
				.u-score{
					flex:1;
					text-align:right;
					font-size:14px;
					color:#80bd01;
					margin-right:10px;
				}
			}
		}
		.recent-dynamic{
			.recent-tabs{
				display:flex;
				text-align:center;
				border-bottom:1px solid #d4d4d4;
				span{
					flex:1;
					text-alidn:center;
					line-height:40px;
					font-weight:bold;
					font-size:14px;
				}
				span.recent-reply{
					border-right:1px solid #d4d4d4;
				}
				.selected{
                    color:#ff5a5f;
                    border-bottom:2px solid #ff5a5f;
				}
			}
			.recent-content{
				border-bottom:1px solid #d4d4d4;
				padding:5px;
				.recent-li{
					display:flex;
					img{
						width:40px;
						height:40px;
						border-radius:50%;
						margin-right:10px;
					}
					.info{
						flex:1;
                        overflow:hidden;
						h3{
							text-overflow:ellipsis;
							overflow:hidden;
							white-space:nowrap;
							color:#333;
						}
						.author{
							display:flex;
							span{
								flex:1;
							}
							span:first-child{
								color:#626262;
								text-align:left;
							}
							span:last-child{
								text-align:right;
								color:#80bd01;
								font-size:14px;
							}
						}
					}
				}
			}
		}
	</style>