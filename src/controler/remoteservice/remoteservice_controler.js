RemoteService = {};

RemoteService.domain = "192.168.0.13";
RemoteService.port = 8182;

RemoteService.comm = Sink.comm.provider.get("CrossDomainAjax");

RemoteService.name = "RemoteService";
RemoteService.id = "remote_service";

RemoteService.widget_path = "src/controler/remoteservice/widget/";

Sink.widget.load(RemoteService.widget_path+"itunes/itunes");


RemoteService.helper = {};

RemoteService.helper.getId = function(host_data){
	var result = host_data.ip.split("/");
	result.pop();
	result = result.pop();
	return result;
};

RemoteService.update = function(message){
	var hosts = Emma.parser.parseHost(message);
	var controler_root = Sink.find(RemoteService.id);
	var new_host = false;
	var new_resource = false;
	for(var i in hosts){
		var host_data = hosts[i];
		
		host_component = new Sink.component({
			"id":RemoteService.helper.getId(host_data),
			"name":RemoteService.helper.getId(host_data),
			"data":{
				uri:host_data.ip,
				resource:host_data.resource,
			},
			
			"ico" : "resource/folder/blue.png",
		});
		RemoteService.selectWidget(host_component);

		controler_root.add(host_component);
			
		
		controler_root.update();
	}

};

RemoteService.loadFile = function(component){
	RemoteService.comm.send({
		url:"http://"+RemoteService.domain+":"+RemoteService.port+"/Media/path",
		method:"PUT",
		data:'{"path":"/"}',
		success:function(data){
			var file = data.split("::");
			
			for(var i in file){
				var name = file[i].replace(" ","").replace("Ž", "e");
				var new_component = new Sink.component({
					"id":component.id+"-"+name,
					"name":component.name+name,
					"ico" : "resource/folder/green.png",
					"data":'{"path":"/'+component.name+name+'"}',
				});

				component.add(new_component);
				var widget = Sink.widget.provider.get("view");
				new_component.renderView = widget.render;
				new_component.renderLink = widget.renderLink;
				new_component.update = widget.update;
				new_component.load = RemoteService.loadFile;
				
				
				
			}
			component.update(component);
			
		},
	});
};
RemoteService.selectWidget = function(component, action){
	var widget = null;
	if(component.name == "itunes"){
		widget = Sink.widget.provider.get("remoteservice_itunes");
		component.renderCard = widget.render;
		component.renderLink = widget.renderLink;
		component.leaf = true;
	}
	else if(component.name == "Media"){
		widget = Sink.widget.provider.get("view");
		component.renderView = widget.render;
		component.renderLink = widget.renderLink;
		component.update = widget.update;
		component.data = '{"path":"/"}';
		component.load = RemoteService.loadFile
		
		
		
		
		
	}
	
	else{
		
	}
	

	

	
};
RemoteService.get = function(){	
	RemoteService.comm.send({
		url : "http://"+RemoteService.domain+":"+RemoteService.port+"/discover/all",
		method:"GET",
		success: function(json){
			var model = JSON.parse(json);
			if(model.message){
				var message = model.message[1];
				RemoteService.update(message);
			}
		},
	});
};


var remoteService = function(){
	var component = new Sink.component({
		id : RemoteService.id,
		name : RemoteService.name,
		ico : "resource/folder/blue.png",
		load : RemoteService.get,
		"renderView":Sink.widget.provider.get("view").render,
		"renderLink":Sink.widget.provider.get("view").renderLink,
		//"renderCard":,
		"update":Sink.widget.provider.get("view").update,
	});
	component.load();	
	Sink.root.add(component);
};

