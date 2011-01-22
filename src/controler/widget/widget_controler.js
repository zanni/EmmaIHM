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

Sink.widget.load = function(name, callback_success){
	
	var url = Sink.widget.uri+name+"/"+name;
	$.ajax({
		url:url+".html",
		success:function(html){
			
			

			//load css file
			$.ajax({
				url:url+".css",
				success:function(data){
					 $("<style></style>").appendTo("head").html(data);
				}
			});
			//load js file
			$.getScript(url+".js", function(){
				
				var widget = Sink.widget.provider.get(name);
				widget.init();
				
				callback_success();
				
			});
		},
	});
};

Sink.widget.select = null;
