var TYPE = "log";

var logControler = function(){
	var that = new Sink.controler.interface();
	
	that.type = "log";
	
	that.init = function(){
		
	};
	
	that.update = function(){
	
	};
	
	return that;
};

Sink.controler.provider.add(TYPE, new logControler());