/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-12 16:23:52
 * @version $Id$
 */
let _=require("lodash");
const fmtDate=function(date){
	var str="";
    var o={
    	y:date.getFullYear(),
    	M:date.getMonth()+1,
    	d:date.getDate(),
    	h:date.getHours(),
    	min:date.getMinutes()
    }
    if(o.M<10){
    	o.M="0"+o.M;
    }
    if(o.d<10){
       o.d="0"+o.d;
    }
    if(o.h<10){
       o.h="0"+o.h;
    }
    if(o.min<10){
       o.min="0"+o.m;
    }
    str+=o.y+"-"+o.M+"-"+o.d+" "+o.h+":"+o.min;
    return str;
}

const Millisecondstodate=function(msd){
	var time=parseInt(msd/1000);
	var str="";
	if(time!=null&&time!=""){
		if(time>60&&time<3600){
             str=parseInt(time/60)+" 分钟前"
		}else if(time>=3600&&time<86400){
             str=parseInt(time/3600)+" 小时前"
		}else if(time>=86400&&time<86400*30){
             str=parseInt(time/86400)+" 天前"
		}else if(time>=86400*30&&time<86400*365){
             str=parseInt(time/(86400*30))+" 月前"
		}else if(time>=86400*365){
			str=parseInt(time/(86400*365))+" 年前"
		}else{
			str=time+" 秒前";
		}
	}
	return str;
}

const fetchUser=function(text){
   if(text==""){
    return [];
   }else{
     var ignore_regexps=[
      /```.+?```/g,           //去除单行的```
      /^```[\s\S]+?^```/gm,   //```里面的是pre标签内容
      /`[\s\S]+?`/g,          //同一行中`some code`内容也不能被解析
      /^    .*/gm,              //4个空格也是pre标签，不匹配换行符
      /\b\S*?@[^\s]*?\..+?\b/g,     //邮箱地址'name@gmail.com'
      /\[@.+?\]\(\/.+?\)/g      //已经link的 'username'，不能再次解析
     ];
   }
  ignore_regexps.forEach(function(regexp){
    text=text.replace(regexp,"");
  });
  var results=text.match(/@[0-9a-zA-Z_-]+\b/igm);
  var names=[];
  if(results){
    for(var i=0,l=results.length;i<l;i++){
        var s=results[i];
        s=s.slice(1);
        names.push(s);
    }
  }
  names=_.uniq(names);
  return names;
}

const linkUser=function(text){
   var user=fetchUser(text);
   for(var i=0;i<user.length;i++){
      var name=user[i];
      text=text.replace(new RegExp('@'+name+'\\b(?!\\])','g'),'[@'+name+'](/user/'+name+')');
   }
   return text;
}

const arry_unique=function(ary){
    var obj={};
    var newAry=[];
    for(var i=0;i<ary.length;i++){
        if(!obj.hasOwnProperty(ary[i])){
            obj[ary[i]]=ary[i];
            newAry.push(ary[i]);
        }
    }
}
exports.arry_unique=arry_unique;
exports.fmtDate=fmtDate;
exports.Millisecondstodate=Millisecondstodate;
exports.linkUser=linkUser;
