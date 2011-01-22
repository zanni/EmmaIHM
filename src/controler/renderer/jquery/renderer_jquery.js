var jqueryRenderer = function(){
	var that = {};
	
	that.appendHTML = function(selector, html){		
		$(selector).append(html);
	};
	
	that.removeHTML = function(selector){};
	
	that.addClass = function(selector,cls){};
	
	that.removeClass = function(selector, cls){};
	
	return that;
};

Sink.renderer.provider.add("jquery",new jqueryRenderer());