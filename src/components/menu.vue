	<template>
		<section id="side-bar" :class="{'show':showBar}">
			<user-info></user-info>
			<ul class="list-ul">
				<li class="iconfont icon-quanbu" v-link="{name:'list',query:{tab:'all'}}">全部</li>
				<li class="iconfont icon-hao" v-link="{name:'list',query:{tab:'good'}}">精华</li>
				<li class="iconfont icon-fenxiang" v-link="{name:'list',query:{tab:'share'}}">分享</li>
				<li class="iconfont icon-wenda" v-link="{name:'list',query:{tab:'ask'}}">问答</li>
				<li class="iconfont icon-zhaopin" v-link="{name:'list',query:{tab:'job'}}">招聘</li>
				<li class="iconfont icon-xiaoxi" v-link="{name:'message'}">消息</li>
				<li class="iconfont icon-about" v-link="{name:'about'}">关于</li>
			</ul>
		</section>
	</template>
	<script>
		export default{
          props:["showBar","pageType"],
          components:{
          	"userInfo":require("./userinfo.vue")
          }
		}
	</script>
	<style lang="scss">
		#side-bar{
			position: fixed;
			height:100%;
			width:200px;
			top:0;
			left:-200px;
			z-index:99;
			background-color:#fff;
			transition:all .3s ease;
			ul{
				border-top:1px solid #d5dbdb;
				padding-top:18px;
				margin:0 24px;
				li{
					padding:14px 0px;
					color:#7f8c8d;
					font-size:14px;
				}
				li:nth-child(5){
					border-bottom:1px solid #d5dbdb;
				}
			}
		}

	</style>