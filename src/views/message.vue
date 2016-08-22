	<template>
		<nv-head page-type="消息" fix-head="true"></nv-head>
        <section class="message">
			<div class="message-tabs">
					<span class="read-yes" :class="{'selected':selectItem===1}" @click="changeMessage(1)">已读消息</span>
					<span class="read-no" :class="{'selected':selectItem===2}" @click="changeMessage(2)">未读消息</span>
			</div>
	    </section>
		<nv-foot :select="2"></nv-foot>
	</template>
	<script>
		export default{
			data(){
				return{
				   selectItem:1
			   }
			},
			methods:{
                 changeMessage(num){
                 	this.selectItem=num;
                 }
			},

			components:{
				"nvHead":require("../components/header.vue"),
				"nvFoot":require("../components/nvfooter.vue")
			}
		}
	</script>
	<style lang="scss">
	.message{
		margin-top:45px;
		.message-tabs{
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
				span.read-yes{
					border-right:1px solid #d4d4d4;
				}
				.selected{
                    color:#ff5a5f;
                    border-bottom:2px solid #ff5a5f;
				}
			}
	}
	</style>