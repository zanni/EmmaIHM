RemoteService = {};

RemoteService.domain = "localhost";
RemoteService.port = 8182;

RemoteService.comm = Sink.comm.provider.get("CrossDomainAjax");

RemoteService.name = "RemoteService";
RemoteService.id = "remote_service";

RemoteService.widget_path = "src/controler/remoteservice/widget/";

Sink.widget.load(RemoteService.widget_path+"itunes/itunes");
Sink.widget.load(RemoteService.widget_path+"vlc/vlc");


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
////////////////////////////////////////////////
//
//TODO - usine ˆ gaz ...
//
//		- give automatic id for Sink.Component
//		- find an elegant way to retreive component path
//			(not using the name)
//		- format name 
//
////////////////////////////////////////////////

RemoteService.loadFile = function(component){

	var prefix = component.data.replace(RegExp(" ", "gi"), "%20");
	RemoteService.comm.send({
		url:"http://"+RemoteService.domain+":"+RemoteService.port+"/Media/path",
		method:"PUT",
		data:'{"path":"'+prefix+'"}',
		success:function(data){
			var file = data.split("::");
			
			
			for(var i in file){
				if(file[i] !== "" && file[i].indexOf("Icon")){
					var name = file[i];
					var id = name.split(".")[0];
					id = id.split("+")[0];
					id = id.replace(RegExp(" ", "gi"), "")
									.replace(RegExp("\"", "gi"), "")
									.replace(RegExp("\'", "gi"), "")
									.replace(RegExp(",", "gi"), "");
									
									
					var view = Sink.widget.provider.get("view");
					if(name.split(".avi").length == 1){
						
						var new_component = new Sink.component({
							"id":component.id+"-"+id,
							"name":name,
							"ico" : "resource/folder/green.png",
							"data": prefix+name+"/",
							"leaf":false,
							"load":RemoteService.loadFile,
							"renderView" : view.render,
							"renderLink" : view.renderLink, 
							"update" : view.update,
						});
					}
					else{
				
						var new_component = new Sink.component({
							"id":component.id+"-"+id,
							"name":name,
							"ico" : "resource/folder/yellow.png",
							"data": prefix+name,
							"leaf":true,
							"renderLink" : view.renderLink, 
							"renderCard":function(component){
								var prefix = component.data.replace(RegExp(" ", "gi"), "%20");
								var name = component.name.replace(RegExp(" ", "gi"), "%20");
								//alert("render card: "+prefix+"/"+component.name );
								//alert("url: "+"http://"+RemoteService.domain+":"+RemoteService.port+"/Media/path");
								RemoteService.comm.send({
									url:"http://"+RemoteService.domain+":"+RemoteService.port+"/Media/path",
									method:"PUT",
									data:'{"path":"'+prefix+'"}',
									success:function(data){
										//alert(prefix);
										
									},
								});
								var vlc = Sink.widget.provider.get("remoteservice_vlc");
								vlc.render(component);
								
							},
						});
					}
					
					
					//alert('{"path":"'+JSON.parse(component.data).path+name+'/"}');
					component.add(new_component);
					
				
				}	
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
		component.load = RemoteService.loadFile
		component.ico = "resource/folder/gris.png";
		component.data = "/";
	}
	
	else if(component.name == "vlc"){
		widget = Sink.widget.provider.get("remoteservice_vlc");
		component.renderCard = widget.render;
		component.renderLink = widget.renderLink;
		component.leaf = true;
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

