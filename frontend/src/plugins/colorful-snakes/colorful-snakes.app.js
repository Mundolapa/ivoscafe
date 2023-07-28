$(function() {
	$(window).resize(Resize);
	
	function Resize() {
		$(".bg").height($(window).height());
		$(".startmessage ").css("padding-top", ($(window).height() / 2 - 200) + "px");
	}
	
	Resize();
	
	$("#canvas3").createSnake({
			  
			  count: 150,
			  variation: 1.3,
			  baseLife: 1500,
			  addedLife: 100,
			  
			  bgR: 21,
			  bgG: 28,
			  bgB: 47,
			  
			  repaintAlpha: .3,
			  
			  fps: 25,
			  
			  sizeGain: 5,
			  
			  saturation: "80%",
			  lightness: "50%",
			  positionHorizontal: 'right',
			  positionVertical: 'bottom',
			  
			  fixedColor: true,
			  fixedColorHue: 150
			  
	});

});