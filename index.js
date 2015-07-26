$(document).ready(function(){
	var radio = 4
	var start_x = 0
	var start_y = 0
	var status = 0
	var current_pos_x=0
	var current_pos_y=0
	var img_width = 10655
	var img_height = 2400
	var background_width = 2666
	var background_height = 600
	var bios_limit_x = -1666
	var bios_limit_y = 0


	$("#larger").on("click",function(){
		if(radio > 1){
			radio = radio - 1
			background_width = img_width / radio
			background_height = img_height / radio
			background_size = background_width + 'px '+background_height + 'px'
			bios_limit_x = 1000 - background_width
			bios_limit_y = 600 - background_height
			$("#3dDisplay").css("background-size",background_size)
			current_pos_x = current_pos_x * ( 1.0 + 1.0 / radio )
			current_pos_y = current_pos_y * ( 1.0 + 1.0 / radio )
			if(current_pos_y > 0 ){
				current_pos_y = 0;
			}
			if(current_pos_y < bios_limit_y){
				current_pos_y = bios_limit_y;
			}
			if(current_pos_x > 0){
				current_pos_x = 0;
			}
			if(current_pos_x < bios_limit_x){
				current_pos_x = bios_limit_x;
			}
			new_pos = current_pos_x + 'px ' + current_pos_y + 'px'
			$("#3dDisplay").css("background-position",new_pos)
		}
	})
	$("#smaller").on("click",function(){
		if(radio < 4){
			radio = radio + 1				
			background_width = img_width / radio
			background_height = img_height / radio
			background_size = background_width + 'px '+background_height + 'px'
			bios_limit_x = 1000 - background_width
			bios_limit_y = 600 - background_height 
			$("#3dDisplay").css("background-size",background_size)

			current_pos_x = current_pos_x * ( 1.0 - 1.0 / radio )
			current_pos_y = current_pos_y * ( 1.0 - 1.0 / radio )
			if(current_pos_y > 0 ){
				current_pos_y = 0;
			}
			if(current_pos_y < bios_limit_y){
				current_pos_y = bios_limit_y;
			}
			if(current_pos_x > 0){
				current_pos_x = 0;
			}
			if(current_pos_x < bios_limit_x){
				current_pos_x = bios_limit_x;
			}
			new_pos = current_pos_x + 'px ' + current_pos_y + 'px'
			$("#3dDisplay").css("background-position",new_pos)		
		}
	})
	$("#3dDisplay").on("mousedown",function(event){
		start_x = event.screenX
		start_y = event.screenY
		status = 1
		current_pos = $(this).css("background-position").split(' ')
		current_pos_x = parseInt(current_pos[0])
		current_pos_y = parseInt(current_pos[1])
	})
	$("#3dDisplay").on("mousemove",function(event){
		
		present_x = event.screenX
		present_y = event.screenY
		
		delta_x = present_x - start_x
		delta_y = present_y - start_y
		if(status == 1){
			new_pos_x = (current_pos_x + delta_x)
			new_pos_y = (current_pos_y + delta_y)
			if(new_pos_y > 0 ){
				new_pos_y = 0;
			}
			if(new_pos_y < bios_limit_y){
				new_pos_y = bios_limit_y;
			}
			if(new_pos_x > 0){
				new_pos_x = 0;
			}
			if(new_pos_x < bios_limit_x){
				new_pos_x = bios_limit_x;
			}
			new_pos = new_pos_x + 'px ' + new_pos_y + 'px'
			$(this).css("background-position",new_pos)
		} else{

			x_offset = $(this).offset().left
			y_offset = $(this).offset().top
			if(typeof window.pageYOffset != 'undefined') {
				px = window.pageXOffset;
				py = window.pageYOffset;
			}
			// 如果浏览器支持 compatMode, 并且指定了 DOCTYPE, 通过 documentElement 获取滚动距离作为页面和视窗间的距离
			// IE 中, 当页面指定 DOCTYPE, compatMode 的值是 CSS1Compat, 否则 compatMode 的值是 BackCompat
			else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
				px = document.documentElement.scrollLeft;
				py = document.documentElement.scrollTop;
			}
			// 如果浏览器支持 document.body, 可以通过 document.body 来获取滚动高度
			else if(typeof document.body != 'undefined') {
				px = document.body.scrollLeft;
				py = document.body.scrollTop;
			}
 
			true_x = ((event.clientX + px - x_offset) - current_pos_x) * radio
			true_y = ((event.clientY + py - y_offset) - current_pos_y) * radio
			$('#info').text(event.clientX+','+event.clientY+' '+x_offset+','+y_offset)
			if (true_x > 4800 && true_x < 5500 && true_y > 1500 && true_y < 2000){
				$("#details").show()
			} else{
				$("#details").hide()
			}
		}
	})
	$("#3dDisplay").on("mouseup",function(event){
		status = 0
		current_pos = $(this).css("background-position").split(' ')
		current_pos_x = parseInt(current_pos[0])
		current_pos_y = parseInt(current_pos[1])	
	})

	$("#3dDisplay").on("click",function(event){
		x_offset = $(this).offset().left
		y_offset = $(this).offset().top
		if(typeof window.pageYOffset != 'undefined') {
			px = window.pageXOffset;
			py = window.pageYOffset;
		}
		// 如果浏览器支持 compatMode, 并且指定了 DOCTYPE, 通过 documentElement 获取滚动距离作为页面和视窗间的距离
		// IE 中, 当页面指定 DOCTYPE, compatMode 的值是 CSS1Compat, 否则 compatMode 的值是 BackCompat
		else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
			px = document.documentElement.scrollLeft;
			py = document.documentElement.scrollTop;
		}
		// 如果浏览器支持 document.body, 可以通过 document.body 来获取滚动高度
		else if(typeof document.body != 'undefined') {
			px = document.body.scrollLeft;
			py = document.body.scrollTop;
		}

		true_x = ((event.clientX + px - x_offset) - current_pos_x) * radio
		true_y = ((event.clientY + py - y_offset) - current_pos_y) * radio
		$('#info').text(event.clientX+','+event.clientY+' '+x_offset+','+y_offset)
		if (true_x > 0 && true_x < 800 && true_y > 400 && true_y < 1000){
			window.location="movie.html"
		}
	})
});