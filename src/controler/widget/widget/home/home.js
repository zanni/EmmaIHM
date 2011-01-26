
var home = function(){
	
	var that = new Emma.WIDGET.interface();
	
	that.html = "";
	
	that.bindEvent = function(host, resource){
		
	};
	that.init = function(host, resource){
	
	};
	
	that.render = function(host, resource){
		return "<p><strong>Bienvenue sur Emma</strong></p><img src='resource/emma/theme/logo_emma.png'><p>EmmaDynamicIHM v0.4</p>";
	}
	
	that.renderLink = function(component){
		resource = component.data;
		var html = UIComponent.list_link({
					id:component.id,
					name:component.name,
					leaf:component.leaf,
					style:component.link_style+" home",
					ico:Emma.WIDGET.uri+"temperature/resource/temperature.png",
					//item:['<span class="toggle"><p>'+resource.data.value+' '+resource.data.unit+'</p></span>'],
				});	
		return html;
	}
	
	that.update = function(host, resource){
		
	};
	
	
	return that;
	
};
Emma.WIDGET.provider.addService("home",new home());
