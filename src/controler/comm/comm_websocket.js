Sink.comm.Websocket = function(spec){

	var that = Sink.comm.interface();
	
	that.uri = spec.uri;
	that.port = spec.port;
	that.socket = new io.Socket(that.uri ,{port: that.port});
	that.socket.connect();
	
	that.socket.on('message', function(message){
		//alert(message);
	  	spec.success(message);
	});
	
	that.send = function(request){
		
		that.socket.send(request);
		//alert("request : "+request);
	};
	return that;	
};

