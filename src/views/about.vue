	<template>
		<nv-head page-type="关于" fix-head="true"></nv-head>
		<section class="about">
		<div class="about-info">
			<h2>关于项目</h2>
			<p>该项目是基于CNode社区的API,采用vue.js重写的webapp</p>
		</div>
		<div class="about-version">
			<h2>当前版本</h2>
			<p>V0.0.0</p>
		</div>
	</section>
	<nv-foot :select="2"></nv-foot>
	</template>
	<script>
		export default{
			components:{
				'nvHead':require("../components/header.vue"),
				"nvFoot":require("../components/nvfooter.vue")
			}
		}
	</script>
	<style lang="scss">
		.about{
			margin-top:45px;
			background:#f7f7f7;
		    padding:0 15px;
		    .about-info{
		    	border-bottom:1px solid #d5d5d5;
		    	padding:30px 0px;
		    	line-height:30px;
		    	p{color:#42b983;}
		    }
		    .about-version{
		    	border-bottom:1px solid #d5d5d5;
		    	line-height:30px;
		    	padding:30px 0px;
		    	p{color:#42b983;}
		    }
		}
	</style>