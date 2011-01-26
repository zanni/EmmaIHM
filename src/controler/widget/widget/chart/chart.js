
var chart = function(){
	
	var that = new Emma.WIDGET.interface();
	
	that.html = "";
	//require dependance - chart lib
	var url = Emma.WIDGET.uri+"chart/resource/"+"jquery.flot.js";
	$.getScript(url);
	
	that.bindEvent = function(host, resource){
	
	};
	
	
	that.init = function(host, resource){
		var cardSelector = "#card-"+host.id+"-"+resource.name;
		var linkSelector = "#link-"+host.id+"-"+resource.name;	
		var time_series = [];
		for(var i in resource.log){
			var log = resource.log[i];
			var temp = log.date;
			var year = temp.split("T")[0].split("-")[0];
			var month = temp.split("T")[0].split("-")[1];
			var day = temp.split("T")[0].split("-")[2];
			
			var hour = temp.split("T")[1].split(".")[0].split(":")[0];
			var min = temp.split("T")[1].split(".")[0].split(":")[1];
			var sec = temp.split("T")[1].split(".")[0].split(":")[2];
			
			var date = new Date(year, month, day, hour, min, sec);
			
			var point = [date.getTime(), log.value];
			time_series.push(point);
		}
		
		time_series.sort(function(date_a, date_b){
			if(date_a[0] < date_b[0]) return -1;
			else if (date_a[0] === date_b[0]) return 0;
			else return 1;
			
			return 1;
		});
		
		 $.plot(cardSelector+" div.graph", [time_series], { xaxis: { mode: "time" } });
		
		
		
	};
	
	that.render = function(host, resource){
		return that.html;
	}
	
	that.renderLink = function(component){
		var html = "";
		return html;
	}
	
	that.update = function(host, resource){
		
	};
	
	
	return that;
	
};
Emma.WIDGET.provider.addService("chart",new chart());
