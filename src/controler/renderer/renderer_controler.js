Sink.renderer = {};

Sink.renderer.uri = "src/controler/renderer/";



/***********************************************
/*
	input :
		spec : {
			send : {callback},
			init : {callback},
		}
	need implementation of onMessage on server event
*/

Sink.renderer.interface = function(){

	var that = {};
	
	that.appendHTML = null;
	
	that.removeHTML = null;
	
	that.addClass = null;
	
	that.removeClass = null;
	
	that.hasClass = null;
	
	return that;
	
};
/**********************************************/

Sink.renderer.provider = IoC.makeProvider(Sink.renderer.interface);

Sink.renderer.selected = null;


