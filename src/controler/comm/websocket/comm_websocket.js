var Websocket = function(){

	var that = new Sink.comm.interface();
	that.uri = null;
	that.port = null;
	that.socket = null;

	that.init = function(spec){
		that.uri = spec.uri;
		that.port = spec.port;
		that.socket = new io.Socket(that.uri ,{port: that.port});
		that.socket.connect();
		
		that.socket.on('message', function(messagej){
			//alert(message);
		  	that.onMessage(message);
		});
	};
	
	that.send = function(request){
		
		that.socket.send(request);
		//alert("request : "+request);
	};
	
	
	
	return that;	
};

Sink.comm.provider.add("Websocket", new Websocket());