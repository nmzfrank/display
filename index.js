$(document).ready(function(){
	var start_x
	var start_y
	var status = 0
	var current_pos_x
	var current_pos_y
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
		$('#info').text(event.screenX+','+event.screenY+'status='+status)
		delta_x = present_x - start_x
		delta_y = present_y - start_y
		if(status == 1){
			new_pos_x = (current_pos_x + delta_x)
			new_pos_y = (current_pos_y + delta_y)
			if(new_pos_y != 0){
				new_pos_y = 0
			}
			if(new_pos_x > 0){
				new_pos_x = 0;
			}
			if(new_pos_x < -1663){
				new_pos_x = -1663
			}
			new_pos = new_pos_x + 'px ' + new_pos_y + 'px'
			$(this).css("background-position",new_pos)
		}
	})
	$("#3dDisplay").on("mouseup",function(event){
		status = 0
	})
});