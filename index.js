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
		}
	})
	$("#3dDisplay").on("mouseup",function(event){
		status = 0
		current_pos = $(this).css("background-position").split(' ')
		current_pos_x = parseInt(current_pos[0])
		current_pos_y = parseInt(current_pos[1])	
	})
});