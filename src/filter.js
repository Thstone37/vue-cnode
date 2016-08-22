/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-12 17:30:27
 * @version $Id$
 */
import utils from "./libs/utils.js"

exports.getLastTimeStr=function(time,is){
   if(is){
   	return utils.Millisecondstodate(new Date()-new Date(time));
   }else{
   	return utils.fmtDate(new Date(time));
   }
}
exports.getTitleStr=function(tab){
	var str=""
	switch(tab){
		case "share":
		    str="分享";
		    break;
		case "ask":
		    str="问答";
		    break;
		case "good":
		    str="精华";
		    break;
		case "job":
		    str="招聘";
		    break;
		default:
		    str="全部";
		    break;
	}
	return str;
}

exports.getTabClassName=function(tab,good,top){
	var className="";
	if(good){
		className="good";
	}else if(top){
		className="top"
	}else{
		switch(tab){
			case "share":
			  className="share";
			  break;
			case "ask":
			  className="ask";
			  break;
			case "job":
			  className="job";
			  break;
            default:
              className="default";
              break;
		}
	}
	return className;
}