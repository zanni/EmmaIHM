var TYPE = "data";

var dataControler = function(){
	var that = new Sink.controler.interface();
	
	that.type = "data";
	
	that.init = function(){
		
	};
	
	that.update = function(){
	
	};
	
	return that;
};

Sink.controler.provider.add(TYPE, new dataControler());