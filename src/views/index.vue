	<template>
		<div>
			<img class="index" src="../assets/images/index.png">
		</div>
	</template>
	<script>
		import main from "../assets/scss/main.scss"
		export default{
			ready(){
				setTimeout(()=> {
                   this.$route.router.go({name:"list"})
				},2000)
			}
		}
	</script>
	<style lang="scss">
		.index{
			width:100%;
			background-color:100%;
			margin-top:40%;
		}
	</style>
