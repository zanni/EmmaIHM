var jqueryRenderer = function(){
	var that = {};
	
	that.appendHTML = function(selector, html){		
		$(selector).append(html);
	};
	
	that.removeHTML = function(selector){
		$(selector).remove();
	};
	
	that.addClass = function(selector,cls){
		$(selector).addClass(cls);
	};
	
	that.removeClass = function(selector, cls){
		$(selector).removeClass(cls);
	};
	
	that.hasClass = function(selector, cls){
		return $(selector).hasClass(cls);
	};
	
	return that;
};

Sink.renderer.provider.add("jquery",new jqueryRenderer());