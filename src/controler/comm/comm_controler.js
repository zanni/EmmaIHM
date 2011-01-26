Sink.comm = {};

Sink.comm.uri = "src/controler/comm/";


Sink.comm.parseMessage = function(json){
	var model = JSON.parse(json);
	if(model.message){
		return model.message[1];
	}
};

/***********************************************
/*
	input :
		spec : {
			send : {callback},
			init : {callback},
		}
	need implementation of onMessage on server event
*/

Sink.comm.interface = function(){

	var that = {};
	
	that.send = null;
	
	that.init = null;
	
	that.onMessage= function(json){
		
		var message = Sink.comm.parseMessage(json);
	  	if(message && message.type){
		  	if(Sink.controler.provider.has(message.type)){
		  		var controler = Sink.controler.provider.get(message.type);
		  		controler.update(message);
		  	}
	  	}
	};
	
	return that;
	
};
/**********************************************/

Sink.comm.provider = IoC.makeProvider(Sink.comm.interface);

Sink.comm.selected = null;


