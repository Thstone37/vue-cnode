	<template>
	   <div class="user-info">
		<div class="login-no" v-if="!loginname">
			<span @click="goLogin"><a>登录</a></span>
		</div>
		<div class="login-yes" v-if="loginname" @click="goUser">
			<div class="avatar">
				<img  v-if="avatar_url" :src="avatar_url">
			</div>
			<div class="info">
				<p v-if="loginname" v-text="loginname"></p>
			</div>
		</div>
	</div>
	</template>
	<script>
		export default{
			data(){
				return{
                   loginname:localStorage.loginname||"",
                   avatar_url:localStorage.avatar_url||""
				}
			},
			methods:{
               goLogin(){
               	let link="/login?redirect="+encodeURIComponent(this.$route.path);
               	this.$route.router.go(link);
               },
               goUser(){
               	this.$route.router.go({name:"user",params:{loginname:localStorage.loginname}});
               }
			}
		}
	</script>
	<style lang="scss">
	.user-info{
		padding:15px;
		    
		.login-no{	
			span{
				a{
					color:#000;
					margin-left:10px;
					line-height:24px;
					height:24px;
					vertical-align:top;
				}
			}
			span:before{
				content:'';
				display:inline-block;
				
                 width:24px;
                 height:24px;
                 background:url("../assets/images/components/login_icon.png") no-repeat left top;
                 background-size:24px 24px;
			}
		}
		.login-yes{	

			background:url("../assets/images/components/go_icon.png") no-repeat right center;
			background-size:6px 10px;
           div{
           	display:inline-block;
            vertical-align:middle;
           }
           .avatar{
           	width:40px;
           	height:40px;
           	border-radius:50%;
           	img{
           		width:100%;
           		height:100%;
           		border-radius:50%;
           	}
           }
           .info{
           	font-size:12px;
           }
		}
	}
	</style>