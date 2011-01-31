Sink.comm = {};

Sink.comm.interface = function(){
	var that = {};
	
	that.init = null;
	
	that.send = null;
	
	return that;
};

Sink.comm.provider = IoC.makeProvider(Sink.comm.interface);

