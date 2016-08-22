	<template>
		<footer id="ft">
			<ul>
				<li class="iconfont  ft-index" :class="{'selected':select===1}" v-link="{name:'list',query:{tab:'all'}}">全部</li>
				<li class="iconfont  ft-message" :class="{'selected':select===2}"v-link="{name:'message'}">消息</li>
				<li class="iconfont  ft-publish" :class="{'selected':select===3}" v-link="{name:'publish'}">发表</li>
				<li class="iconfont ft-my" :class="{'selected':select===4}" v-link="{name:'user'}">我的</li>
			</ul>
		</footer>
	</template>
	<script>
		export default{
			props:["select"],
              data(){
              	return{              		
              		loginname:localStorage.loginname||""
              	}
              },
              route:{
              data(transition){
                  this.select=1;
              },
          },
              methods:{
              	changeItem(num){
              		this.select=num;
              		console.log(this.select)
              	}
              }
		}
	</script>
	<style lang="scss">
		#ft{
			position:fixed;
			left:0;
			bottom:0;
			height:45px;
			background:#fff;
			width:100%;
			ul{
				width:100%;
				display:flex;
				li{
					flex:1;
					text-align:center;
				}
				.ft-index:before{
					content:"\e604";
					display:block;
				}
				.ft-message:before{
					content:"\e606";
					display:block;
				}
				.ft-publish:before{
					content:"\e60f";
					display:block;
				}
				.ft-my:before{
					content:"\e605";
					display:block;
					
				}
				.selected{
					color:#42b983;
				}
			}
		}
	</style>