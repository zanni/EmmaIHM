/*
*
*	UIComponent.slideshow
*	input : 
*		{
*			it:"id",
*			slide :[
				{
					title:"title",
					description:"description",
					content:"content",
				},
*			],
*		}
*
*/

UIComponent.slideshow = function(spec){

	var that = {};
	
	that.id = spec.id;
	
	that.slide = spec.slide;
	
	that.init = spec.init;
	
	
	
	that.render = function(){
		var render = "";
		render += "<div class='slideshow-wrapper'>";
		//render slideshow 
		render += "<div id="+that.id+" class='dragdealer slideshow'>";
		render += "<div class='handle'>";
		//insert slideshow slide
		for(var i =1; i< that.slide.length+1; i++){
			render += "<div class='slide'>"+that.slide[i-1].content;
			render += "</div>";
			
		}
		render += "</div>";
		render += "</div>";
		
		//render slideshow menu
		render += "<div id="+that.id+"-menu-wrapper"+" class='top-spaced right-float'>";
		render += "<div id="+that.id+"-menu-cursor"+" class='cursor'></div>";
		render += "<ul id="+that.id+"-menu"+">";
		//inser slideshow menu items
		
		for(var i =1; i< that.slide.length+1; i++){
			render += "<li>";
			render += "<a id="+that.id+"-menu-slide-"+i+" class='slideshow-link'>";
			render += "<span class='title'>"+that.slide[i-1].title;
			render += "</span>";
			render += "<span class='description'>"+that.slide[i-1].description;
			render += "</span>";
			render += "</a>";
			render += "</li>";
		}
		
		render += "</ul>"
		render += "</div>";
		render += "</div>";
		return render;
	};
	
	
	//init dragdealer lib on slideshow element
	$.elementReady(that.id,function(){
	
		var menuWrapper = document.getElementById(that.id+"-menu-wrapper");
    	var cursor = document.getElementById(that.id+'-menu-cursor');
    	var slideshow = null;
		slideshow = new Dragdealer(that.id,
		{
			steps: that.slide.length,
	        animationCallback: function(x, y)
	        {
	        	//alert("mouai c cool");
	            var top = x * (menuWrapper.offsetHeight - cursor.offsetHeight);
	            cursor.style.top = String(top) + 'px';
	        },
	     
	      
        });
        
        
        $(".slideshow-link").tap( function()
		    {
		    	var id = $(this).attr("id").replace(that.id+"-menu-slide-","");
		    	slideshow.setStep(Number(id));
		    });
         
	});
	
   	
		
	return that;
};

/*
<div id="slideshow-menu-wrapper" class="top-spaced right-float">
	<div id="slideshow-menu-cursor" class="cursor" style="top: 198px; "></div>
	<ul id="slideshow-menu">
		<li>
			<a id="slideshow-photo-1" href="#photo1">
				<span class="title">Lorem</span>
				<span class="description">Lorem ipsum dolor sit.</span>
			</a>
		</li>
		<li>
			<a id="slideshow-photo-2" href="#photo2">
				<span class="title">Ipsum</span>
				<span class="description">Lorem ipsum dolor sit.</span>
			</a>
		</li>
		<li>
			<a id="slideshow-photo-3" href="#photo3">
				<span class="title">Dolor</span>
				<span class="description">Lorem ipsum dolor sit.</span>
			</a>
		</li>
		<li>
			<a id="slideshow-photo-4" href="#photo4">
				<span class="title">Sit amet</span>
				<span class="description">Lorem ipsum dolor sit.</span>
			</a>
		</li>
	</ul>
</div>
					
					

<div id="slideshow" class="dragdealer">
	<div class="handle" style="left: -1200px; ">
		<div class="slide img1"></div>
		<div class="slide img2"></div>
		<div class="slide img3"></div>
		<div class="slide img4"></div>
	</div>
</div>
	
	
	
    var menuWrapper = document.getElementById('slideshow-menu-wrapper');
    var cursor = document.getElementById('slideshow-menu-cursor');
    
    var slideshow = new Dragdealer('slideshow',
    {
        steps: 4,
        loose: true,
        animationCallback: function(x, y)
        {
            var top = x * (menuWrapper.offsetHeight - cursor.offsetHeight);
            cursor.style.top = String(top) + 'px';
        }
    });
    
    document.getElementById('slideshow-photo-1').onclick = function()
    {
        slideshow.setStep(1);
        return false;
    }
    document.getElementById('slideshow-photo-2').onclick = function()
    {
        slideshow.setStep(2);
        return false;
    }
    document.getElementById('slideshow-photo-3').onclick = function()
    {
        slideshow.setStep(3);
        return false;
    }
    document.getElementById('slideshow-photo-4').onclick = function()
    {
        slideshow.setStep(4);
        return false;
    }
    
	*/