	<template>
		<nv-head page-type="发表" fix-head="true"></nv-head>
		<section class="publish">
			<div class="topic">
				<div class="con">
					<span>选择分类:</span>
					<select v-model="topic.tab">
						<option value="share">分享</option>
						<option value="ask">问答</option>
						<option value="job">招聘</option>
					</select>
					<input type="button" value="发表"  @click="addTopic">
				</div>
			</div>
			<div class="title">
				<input type="text" v-model="topic.title" :class="{'validate-err':err=='title'}" placeholder="标题:字数在10字以上">
			</div>
			<div class="textarea">
				<textarea rows="30"  v-model="topic.content" :class="{'validate-err':err=='content'}" placeholder='回复支持Markdown语法,请注意标记代码'></textarea>
		    </div>
		</section>
		<nv-alert :show="alert.show" :show-text="alert.text"></nv-alert>
		<nv-foot :select="3"></nv-foot>
	</template>
	<script>
		export default{
			data(){
				return{
					topic:{
						tab:"share",
						content:"",
						title:"",
						accesstoken:localStorage.token
					},
					signHTML:"<br/><br/><a>来自优雅的vue-app</a>",
					err:"",
					alert:{
						show:false,
						text:"",
					}
				}
			},
			methods:{
			  hideFn(){
				let self=this;
				let timer;
                clearTimeout(timer);
                timer=setTimeout(function(){
                            self.alert.show=false;
                           }, 2000);
					},
              addTopic(){
              	 let self=this,title=$.trim(self.topic.title),content=$.trim(self.topic.content);
              	 if(!title||title.length<10){
              	 	self.err="title";
                     return false;
              	 }
                 if(!content){
                 	self.err="content";
                 	return false;
                 }
                 self.topic.content=self.topic.content+self.signHTML;
              	 $.ajax({
              	 	type:"post",
              	 	url:"https://cnodejs.org/api/v1/topics",
              	 	dataType:"json",
              	 	data:self.topic,
              	 	success:function(res){
                       if(res.success){
                       	self.$route.router.go({name:'list'});
                       }
              	 	},
                    error:function(res){
                    	let data=JSON.parse(res.responseText);
                    	self.alert.show=true;
                    	self.alert.text=data.error_msg;
                        self.hideFn();
                    }
              	 })
              }
			},
			components:{
				"nvHead":require("../components/header.vue"),
				"nvFoot":require("../components/nvfooter.vue"),
				"nvAlert":require("../components/nvAlert.vue")
			}
		}
	</script>
	<style lang="scss">
		.publish{
			margin-top:45px;
			.topic{
				width:100%;
				padding:15px;
				border-bottom:1px solid rgb(212,212,212);
				.con{
					width:100%;
					display:flex;
					span{
						flex:2;
						font-size:16px;
						color:#666;
					}
                    select{
                    	flex:7;
                    	font-size:16px;
                    }
                    input{
                    	margin-left:10px;
                    	color:#fff;
                    	flex:1;
                    	border-radius:5px;
                    	border:0;
                    	outline:none;
                    	background-color:#80bd01;
                    }
				}
			}
			.title{
				padding:15px;
				border-bottom:1px solid rgb(212,212,212);
				input{
					border:0;
					outline:none;
					width:100%;
					font-size:16px;
					line-height:25px;
				}
			}
			.textarea{
				padding:10px 15px;
				textarea{
					width:100%;
					font-size:16px;
				}
			}
			input.validate-err,textarea.validate-err{
				border:1px solid red;
			}
			.validate-err textarea{
				border:1px solid red;
			}
		}
	</style>