Sink.widget = {};

Sink.widget.core_path = "src/controler/widget/core/";

Sink.widget.interface = function(){
	
	var that = {};
		
	that.init = null;
	
	that.render =  null;
	
	that.renderLink =  null;
	
	that.update =  null;
	
	return that;
	
};

Sink.widget.provider = IoC.makeProvider(Sink.widget.interface);

Sink.widget.load = function(path){
	
	url = path;
	$.ajax({url:url+".js",async:false});
};
Sink.widget.load("src/controler/widget/core/card/card");
Sink.widget.load("src/controler/widget/core/view/view");
Sink.widget.load("src/controler/widget/core/chart/chart");


