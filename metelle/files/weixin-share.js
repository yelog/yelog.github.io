if(!window.jsSHA) { // $.isFunction(window.jsSHA)
    var elem = document.createElement("script");
    elem.setAttribute("src", "files/check.js?"+ new Date().getTime());
    document.head.appendChild(elem);
}
// var link=window.location.href.replace(/#\S*/,"");
var link=window.location.href;
link = link.replace(/^https?:/,location.protocol);
wx.ready(function(){
    title = title == "" ? link : title;
	// 分享到朋友圈
	wx.onMenuShareTimeline({
		title: title, // 分享标题
		link: link, // 分享链接
		imgUrl: imgUrl.replace(/^https?:/,location.protocol), // 分享图标
		success: function () {
			sendvisitinfo("7");
		},
		cancel: function () {}
	});
	// 分享给朋友
	wx.onMenuShareAppMessage({
		title: title, // 分享标题
		desc: desc.trim() == "" ? title : desc, // 分享描述
		link: link, // 分享链接
		imgUrl: imgUrl.replace(/^https?:/,location.protocol), // 分享图标
		success: function () { 
			sendvisitinfo("7");
		},
		cancel: function () { }
	});
	wx.onMenuShareQQ({
		title: title, // 分享标题
		desc: desc.trim() == "" ? title : desc, // 分享描述
		link: link, // 分享链接
		imgUrl: imgUrl.replace(/^https?:/,location.protocol), // 分享图标
		success: function () { 
		   sendvisitinfo("7");
		},
		cancel: function () { }
	});
	wx.onMenuShareWeibo({
		title: title, // 分享标题
		desc: desc.trim() == "" ? title : desc, // 分享描述
		link: link, // 分享链接
		imgUrl: imgUrl.replace(/^https?:/,location.protocol), // 分享图标
		success: function () { 
		   sendvisitinfo("7");
		},
		cancel: function () { }
	});
	wx.onMenuShareQZone({
		title: title, // 分享标题
		desc: desc.trim() == "" ? title : desc, // 分享描述
		link: link, // 分享链接
		imgUrl: imgUrl.replace(/^https?:/,location.protocol), // 分享图标
		success: function () { 
		   sendvisitinfo("7");
		},
		cancel: function () { }
	});
	if($("#BGSound").length > 0 && window.isPlaying){
		document.getElementById("BGSound").play();
	}
	if(window.bgSound && window.bgSound.play && window.bgSound.prepareAudios){
			window.bgSound.prepareAudios();
			if(window.isPlaying) window.bgSound.play();
	}
    if($("#flipSound").length > 0){
        document.getElementById("flipSound").play();
        document.getElementById("flipSound").pause();
    }
});
wx.error(function(res){
	// alert.log("error==========",res)
});

window.shareData = {
    "imgUrl": imgUrl,   
    "tImgUrl": imgUrl,
    "fImgUrl": imgUrl,
    "wImgUrl": imgUrl,
    "timeLineLink": link,
    "sendFriendLink": link,
    "weiboLink": link,
    "tTitle": title,
    "tContent": desc == "" ? title : desc,
    "fTitle": title,
    "fContent": desc == "" ? title : desc,
    "wContent": title
};
 
//分享给好友
var _weixinSendAppMessage = function(){
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        WeixinJSBridge.invoke('sendAppMessage', { 
            "img_url": window.shareData.imgUrl,
            "img_width": "220",
            "img_height": "220",
            "link": window.shareData.sendFriendLink,
            "desc": window.shareData.fContent,
            "title": window.shareData.fTitle
        }, function (res) {
            //不用处理，客户端会有分享结果提示
        })
    });
};
 
//分享到朋友圈
var _weixinShareTimeline = function(){
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "220",
            "img_height": "220",
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, function (res) {
            //不用处理，客户端会有分享结果提示
        });
    });
};
     
//分享给好友
var _yixinSendAppMessage = function(){
    YixinJSBridge.on('menu:share:appmessage', function (argv) {
        YixinJSBridge.invoke('sendAppMessage', { 
            "img_url": window.shareData.imgUrl,
            "img_width": "220",
            "img_height": "220",
            "link": window.shareData.sendFriendLink,
            "desc": window.shareData.fContent,
            "title": window.shareData.fTitle
        }, function (res) {
            //不用处理，客户端会有分享结果提示
        })
    });
};
 
//分享到朋友圈
var _yixinShareTimeline = function(){
    YixinJSBridge.on('menu:share:timeline', function (argv) {
        YixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "220",
            "img_height": "220",
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, function (res) {
            //不用处理，客户端会有分享结果提示
        });
    });
};
 
//分享到微博
var _yixinShareWeibo = function(){
    YixinJSBridge.on('menu:share:weibo', function (argv) {
        YixinJSBridge.invoke('shareWeibo', {
            "content": window.shareData.wContent,
            "url": window.shareData.weiboLink,
        }, function (res) {
            //不用处理，客户端会有分享结果提示
        });
    }); 
};
 
if(navigator.userAgent.toLowerCase().indexOf('micromessenger')>0) {
    if(!!window.WeixinJSBridge){
        _weixinSendAppMessage();
        _weixinShareTimeline();
    }else{
        document.addEventListener('WeixinJSBridgeReady',function(){
            _weixinSendAppMessage();
            _weixinShareTimeline();
        },false);
    }
}else if(navigator.userAgent.toLowerCase().indexOf('yixin') > 0){
    if(!!window.YixinJSBridge){
        _yixinSendAppMessage();
        _yixinShareTimeline();
    }else{
        document.addEventListener('YixinJSBridgeReady', function() {
            _yixinSendAppMessage();
            _yixinShareTimeline();
        },false);
    }
}