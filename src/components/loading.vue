	<template>
		<div class="loading" v-show="show">
			<div class="loading-inner">
				<i class="loading-icon"></i>
				{{showText}}
			</div>
		</div>
	</template>
	<script>
		export default{
			props:["show","showText"],

		}
	</script>
	<style lang="scss">
		.loading{
			position:fixed;
			top:0;
			left:0;
			background:rgba(0,0,0,0);
			z-index:9999;
			width:100%;
			height:100%;
			.loading-inner{
				color:#fff;
				font-size:14px;
				position:absolute;
				top:50%;
				left:50%;
				background:rgba(0,0,0,0.5);
				transform:translate(-50%,-50%);
				padding:50px 30px 10px 30px;
				border-radius:5px;
				text-align:center;
				.loading-icon{
				   display:block;
                   width:24px;
                   height:24px;
                   position:absolute;
                   top:15px;
                   left:50%;
                   margin-left:-14px;
                   transform:translateX(-50%);
                   border:2px solid #fff;
                   border-radius:24px;
                   animation:myanimate 1s infinite linear;
                   clip:rect(0 auto 12px 0);
                   @keyframes myanimate{
                   	0%{
                   		transform:rotate(0deg);
                   	}
                   	100%{
                   		transform:rotate(360deg)
                   	}
                   }
				}
			}
		}
	</style>