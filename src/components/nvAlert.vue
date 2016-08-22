	<template>
		<div class="nv-alert" v-show="show">
			<div class="nv-alert_inner">
				{{showText}}
			</div>
		</div>
	</template>
	<script>
		export default{
            props:["show","showText"]
		}
	</script>
	<style lang="scss">
		.nv-alert{
			width:100%;
			height:100%;
			position:fixed;
			top:0;
			left:0;
			z-index:9999;
			.nv-alert_inner{
               position:absolute;
               background:rgba(0,0,0,0.5);
               color:#fff;
               font-size:14px;
               line-height:27px;
               top:30%;
               left:50%;
               text-align:center;
               border-radius:8px;
               padding:18px 30px;
               transform:translate(-50%,-50%);

			}
		}
	</style>