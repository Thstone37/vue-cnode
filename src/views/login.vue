	<template>
		<nv-head page-type="登录" :show-bar="showBar" fix-head="true"></nv-head>
		<section class="login-body">
				<div class="label">
					<input type="text" placeholder="Access Token" v-model="token">
				</div>
				<div class="label">
					<input type="button" value="选择二维码照片">
					<input type="file" value="选择二维码照片" @change="readPic" accept="image/*" capture="camera">
					<input type="button" value="登录" @click="login">
				</div>
	    </section>
	    <nv-alert :show="alert.show" :show-text="alert.text"></nv-alert>
	    <nv-loading :show="loading.show" :show-text="loading.showText"></nv-loading>
	</template>
	<script>
	    import {qrcode} from "../libs/qrcode.js"
        let browser={
        	version:function(){
        		let u=navigator.userAgent,
        		    app=navigator.appVersion;
        		    return{
        		    	ios:!!u.match(/\(i[^;]+;(U;)?CPU.+Mac OS X/),
        		    	android:u.indexOf("Android")>-1||u.indexOf("Linux")>-1,
        		    	iphone:u.indexOf("iPhone")>-1,
        		    	ipad:u.indexOf("iPad")>-1,
        		    };
        	}(),
        }
		export default{
				props:[],
				data(){
					return{
						showBar:false,
						token:"",
						loading:{
							show:false,
							showText:"二维码扫描中..."
						},
						alert:{
							show:false,
							text:""
						},
						
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
					login(){
						let self=this;
						if(self.token==""){
							let text = "令牌格式错误,应为36位UUID字符串";
							self.alert.text=text;
							self.alert.show=true;
							self.hideFn();
							return false;
						}
						//验证等待，提示信息
						let waittext="access Token验证中,请稍后...";
						self.alert.text=waittext;
						self.alert.show=true;
						//将access Token提交至后台验证
						$.ajax({
							type:"post",
							url:"https://cnodejs.org/api/v1/accesstoken",
							dataType:"json",
							data:{accesstoken:self.token},
							//请求成功后相关处理
							success:function(res){
								
								localStorage.loginname=res.loginname;
								localStorage.avatar_url=res.avatar_url;
								localStorage.token=self.token;
								localStorage.userid=res.id;
								//验证成功后，跳转到list路由
								self.alert.text="验证成功,正在跳转";
						        let timer;
                        		clearTimeout(timer);
                        		timer=setTimeout(function(){
                            		self.alert.show=false;
                            		let redirect=decodeURIComponent(self.$route.query.redirect||"/");
                            		self.$route.router.go(redirect);
                           		}, 2000);
							},
							//请求失败相关处理
							error:function(res){
								  console.log(res);
                                  var error=JSON.parse(res.responseText);
                                  self.alert.text=error.error_msg;
                                  self.alert.show=true;
                                  self.hideFn();
                                  return false;
							}
						})
					},
					readPic(e){
                        let self=this;
                        let file=e.currentTarget.files[0];
                        let reader=new FileReader();
                        reader.onload=function(){
                            let resultURL=reader.result;
                            let base64=resultURL.split("base64,");
                            let param={"img":base64[1]};
                            self.loading.show=true;
                            //ios下qrcode无法使用
                            if(browser.version.ios||browser.version.iphone||browser.version.ipad){
                            	$.post("http://m.yueqingwang.com/common.ashx",param,function(d){
                            		if(d=="qrcode error"){
                            			console.log("验证无法通过")
                            		}else{
                            			self.token=d;
                            		}
                            	})
                            }else{
                            	qrcode.decode(resultURL);
                            	qrcode.callback=function(data){
                            		self.loading.show=false;
                            		self.token=data;
                            	}
                            }

                        }
                        reader.readAsDataURL(file);
					}
				},
          		components:{
          			"nvHead":require('../components/header.vue'),
          			"nvAlert":require("../components/nvAlert.vue"),
          			"nvLoading":require('../components/loading.vue')
          		}
		}
	</script>
	<style lang="scss">
		.login-body{
			padding:50px 15px;
			margin-top:45px;
			.label{
				width:100%;			
				position:relative;
				margin-top:15px;			
				input[type="text"]{
					border:0;
					padding:12px 0px;
					font-size:14px;
					width:100%;
					border-bottom:1px solid #4fc08d;
					outline:none;
				}
				input[type="button"]{
					font-size:16px;
					border:0;
					background:#4fc08d;
					width:48%;
					outline:none;
					height:42px;
					color:#fff;
					border-radius:3px;
				}
				input[type="file"]{
					opacity:0;
					position:absolute;
					top:0;
					left:0;
					height:42px;
					width:48%;
					
				}
			}
		}
	</style>