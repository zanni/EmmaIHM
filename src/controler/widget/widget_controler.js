Sink.widget = {};

Sink.widget.uri = "src/controler/widget/widget/";

Sink.widget.interface = function(){
	
	var that = {};
		
	that.init = null;
	
	that.render =  null;
	
	that.renderLink =  null;
	
	that.update =  null;
	
	return that;
	
};

Sink.widget.provider = IoC.makeProvider(Sink.widget.interface);

Sink.widget.load = function(name){
	
	var url = Sink.widget.uri+name+"/"+name;
	
	$.ajax({url:url+".js",async:false, success:function(){
		$.ajax({
			url:url+".css",
			success:function(data){
				 $("<style></style>").appendTo("head").html(data);
			}
		});

		//var widget = Sink.widget.provider.get(name);
		//widget.init();		
		
	}});
};

