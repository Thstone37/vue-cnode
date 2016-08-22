<template>
    <div class="page-cover" v-if="showBar&&fixHead" @click="closeMenu"></div>
	<header id="hd" :class="{'show':showBar&&fixHead,'fix-header':fixHead}">
		<div class="nv-toolbar">
			<div class="toolbar-nav" @click="openMenu"></div>
			<span v-text="pageType"></span>
			<i class="iconfont add-icon" v-link="{name:'publish'}">&#xe60f;</i>
		</div>	
	</header>
	<nv-menu :show-bar="showBar" v-if="fixHead"></nv-menu>
</template>

<script>
export default{
	props:["pageType","showBar","fixHead"],
	methods:{
		openMenu(){
			console.log("已点击")
			this.showBar=!this.showBar
		},
		closeMenu(){
            this.showBar=!this.showBar
		},
	},
	components:{
		"nvMenu":require("./menu.vue")
	}
}
</script>

<style lang="scss">
    .page-cover{
        background-color:rgba(0,0,0,0.4);
        position: fixed;
        z-index:5;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
	#hd{
		transition:all .3s ease;
		border-bottom:1px solid #e8e8e8;
		.nv-toolbar{
			width:100%;
			height:44px;
			position: relative;
			.toolbar-nav{
				width:49px;
				height:44px;
				background:url("../assets/images/components/nav_icon.png") no-repeat center center;
				background-size: 19px 16px;
                margin: 0;
                z-index: 1;
                position: absolute;
                top: 0;
                left: 0;
			}
			span{
				width:100%;
				height:100%;
				display:block;
				font-size:16px;
				line-height:44px;
				text-align:center;
				position: absolute;
				z-index:0;
				top:0;
				left:0;
				font-size:16px;
			}
			.add-icon{
				color:#42b983;
				position: absolute;
                right: 10px;
                top: 10px;
                z-index: 10;
                padding: 5px 15px;
                border-radius: 5px;
			}
		}
	}
	.fix-header{
		width:100%;
		transition:all .3s ease;
		position:fixed;
		top:0;
		left:0;
		background-color:#fff;

	}
	.no-fix{
		width:100%;
		background-color:#fff;
		overflow:hidden;
	}
	.show{
			transform:translateX(200px);
		}
</style>