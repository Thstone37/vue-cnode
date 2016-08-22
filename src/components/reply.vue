	<template>
	  <section class="reply">
		<textarea placeholder='回复支持Markdown语法,请注意标记代码' rows="8" v-model="content"></textarea>
        <input type="button" value="确定" @click="addReply">
        <section>
	</template>
	<script>
	    var utils=require("../libs/utils.js"),
	        markdown=require("markdown").markdown;
		export default{
			props:["replyId","topicId","replyTo","topicData"],
		   data(){
		   	 return{
		   	 	content:"",
		   	 	signHTML:"<br/><br/><a>来自优雅的vue-app</a>",
		   	 	hasErr:false,
         
		   	 }
		   },
       ready(){
         if(this.replyTo){
          this.content="@"+this.replyTo;
         }
       },
           methods:{
           	addReply(){
           		  let _self=this;
                if(!_self.content){
                   _self.hasErr=true;
                }else{
                     let time=new Date();                     
                     var user=utils.linkUser(_self.content);
                     var htmlText=markdown.toHTML(user)+_self.signHTML;
                     let reply_content=$("<div class='markdown'></div>").append(htmlText)[0].outerHTML;
                     let postData={accesstoken:localStorage.token,content:_self.content+_self.signHTML}
                     if(_self.replyId){
                     	postData.reply_id=_self.replyId;
                     } 
                                      
                     $.ajax({
                     	type:'post',
                     	url:"https://cnodejs.org/api/v1/topic/"+_self.topicId+"/replies",
                     	data:postData,
                     	dataType:"json",                    
                     	success:function(res){
                              if(res.success){
                                console.log(time);
                                _self.topicData.replies.push({
                                  id:res.reply_id,
                                  author:{
                                    loginname:localStorage.loginname,
                                    avatar_url:localStorage.avatar_url
                                  },
                                  create_at:time,
                                  content:reply_content,
                                  ups:[]
                                })
                              }
                     	}
                     });
                }
           	}
           }
		}
	</script>
	<style lang="scss">
	.reply{
		margin:0 15px;
	    textarea{
           display:block;
           width:100%;
           border: 1px solid #d5dbdb;
           padding:15px;
           font-size:14px;
	    }
		input{
           width:100%;
           display:block;
           background-color:#42b983;
           color:#fff;
           height:42px;
           line-height:42px;
           outline:none;
           margin:15px 0px;
           font-size:18px;
           border:0;
		}
	}
	</style>