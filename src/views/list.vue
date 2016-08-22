	<template>
		<nv-head :show-bar.sync="showBar" fix-head="true" :page-type="serachKey.tab|getTitleStr"></nv-head>
		<load v-if="loadshow"></load>
		<section id="page" v-if="!loadshow">
			<ul>
				<li v-for="item in data" v-link="{name:'topic',params:{id:item.id}}">
					<h3 v-text="item.title" :class="item.tab|getTabClassName item.good item.top"></h3>
					<div class="content">
						<img :src="item.author.avatar_url">
						<div class="info">
							<p>
								<span class="name">{{item.author.loginname}}</span>
								<span class="status" v-if="item.reply_count > 0">
									<b>{{item.reply_count}}</b>/{{item.visit_count}}
								</span>
							</p>
							<p>
								<time>
									{{item.create_at | getLastTimeStr true}}
								</time>
								<time>{{item.last_reply_at | getLastTimeStr true}}</time>
							</p>
						</div>
					</div>
				</li>
			</ul>
		</section>
		<nv-foot :select="1"></nv-foot>
	</template>
	<script>	
		export default{
			data(){
				return{
				showBar:false,
				data:[],
				scroll:true,
				serachKey:{
					page:1,
                    limit:20,
                    tab:'all',
                    mdrender:true
				},
				serachDataStr:"",
				loadshow:true
			 }
			},
			route:{
				data(transition){
					let query=transition.to.query,tab=query.tab||"all";
					if(this.serachDataStr==""){
						this.serachDataStr=JSON.stringify(this.serachKey);
					}
					if(transition.from.name=="list"){
						this.serachKey.limit==20;
						this.serachKey=JSON.parse(this.serachDataStr);
						this.loadshow=true;
					}
					this.serachKey.tab=query.tab
					this.getTopics();
					this.showBar=false;
					$(window).on("scroll",() => {
						this.getScrollData();
					})
				},
				deactivate(transition){
					$(window).off("scroll");
					transition.next();
				}
			},
			methods:{
				getTopics(serachKey){
					var self=this;
					let params=$.param(this.serachKey);
					$.get('https://cnodejs.org/api/v1/topics?'+params,function(d){
						     self.scroll=true;
                             console.log(d);
                             console.log(d.data);
                             if(d&&d.data){
                             self.data=d.data;
                             self.loadshow=false;                      
                         }
					})
				},
				getScrollData(){
                     if(this.scroll){
                     	let totalheight=parseFloat($(window).height())+parseFloat($(window).scrollTop());
                     	if($(document).height()<=totalheight+200){
                            this.scroll=false;
                            this.serachKey.limit+=20;
                            this.getTopics();
                     	}
                     }
				}
			},
			components:{
				"nvHead":require("../components/header.vue"),
				"load":require("../components/load.vue"),
				"nvFoot":require("../components/nvfooter.vue")
			}
		}
	</script>
	<style lang="scss">
		#page{
			margin-top:45px;
			ul{
				list-style:none;
				margin:0;
				padding:0;
				li{
				   border-bottom:1px solid #d5dbdb;
					padding:10px 15px;
					h3{
						font-size:16px;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        &:before{
                        	font-size:10px;
                        	padding:0px 6px;
                        	margin-right:10px;
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
					div.content{
						display:flex;
						margin-top:10px;
						img{
							width:40px;
							height:40px;
							border-radius:50%;
							border:1px sold #f3f3f3;
							display:block;
							margin-right:10px;
						}
						.info{
							flex:1;
							p{
								margin:3px 0;
								line-height:1em;
								display:flex;
								.name{
									flex:1;
								}
								.status{
									color:#34495e;
									b{
										color:#42b983;
									}
								}
								time{
									font-size:12px;
									color:#34495e;
								}
                               time:first-child{
                               	flex:1;
                               }
							}
						}

					}
				}
			}
		}
	</style>