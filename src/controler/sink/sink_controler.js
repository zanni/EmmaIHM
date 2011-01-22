Sink.controler = {};

Sink.controler.uri = "src/controler/sink/";
/***********************************************
/*
	input :
		spec : {
			type : {type},
			init : {callback},
			update : {callback},
		}
*/
Sink.controler.interface = function(spec){
	var that = {};
			
	that.type = null;
	
	that.init = null;

	that.update = null;
	
	return that;
};
/***********************************************/


Sink.controler.provider = IoC.makeProvider(Sink.controler.interface);

Sink.controler.load = function(name){};
