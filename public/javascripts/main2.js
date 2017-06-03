$(document).ready(function(){
	allNote();
});

function allNote(){
	$('nav').animate({left:'-25%'});
	$('#mask').hide();
	$('#titleController').children().remove();
	$.ajax({
		type:'post',
		url:'/datalist',
		success:function(data){
			for(var i=0;i<data.length;i++){
				var newNotes = $("<div class='notes' onclick='noteShow();'></div>").append("<p class='note_title'>"+data[i]['title']+"</p><p class='brief'>"+data[i]['concrete'].substring(0,50)+'...'+"</p><div><span class='noteDel' title='delete'><i class='fa fa-trash' aria-hidden='true'> </i> </span> <i class='fa fa-download' aria-hidden='true' title='download'></i><span class='noteTime'>" + data[i]['flag']+"</span></div><div class='collect'></div>");
				var finalNote = $("#titleController").append(newNotes);
				if(data[i]['collect'] == 0){
					$('.collect').eq(i).html("<i class='fa fa-heart-o' aria-hidden='true'></i>");
				}else{
					$('.collect').eq(i).html("<i class='fa fa-heart' aria-hidden='true'></i>"); 
				}           
			}

		},
		error:function(data){
			console.log(data);
		}
	});
}

function noteShow(){
	$(this).css({'background':'#f5f5f5'});
	$(this).siblings().css({'background':'transparent'});
	$('#face').fadeOut();
	$('#noteContent').fadeIn();

	var flag = $(this).children().eq(2).children().eq(2).text();

	$.ajax({
		type:'post',
		url:'/content',
		data:{flag:flag},
		success:function(data){
			console.log(data);
			if(data[0]['password']){
				//已经加密
				$('#pswMask').show();
				$('#pswContent').show();
				$('#pswText').val('');
				$('.indexTitle').html(data[0]['title']);
				$('.contentDetail').html(data[0]['content']);
				$('.indexTime').html(data[0]['flag']);

				if(data[0]['collect'] == 0){
					$('.indexCollect').html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
				}else if(data[0]['collect'] == 1){
					$('.indexCollect').html('<i class="fa fa-heart" aria-hidden="true"></i>');
				}
				
			}else{
				//没设置密码
				$('#pswMask').hide();
				$('#pswContent').hide();
				$('.indexTitle').html(data[0]['title']);
				$('.contentDetail').html(data[0]['content']);
				$('.indexTime').html(data[0]['flag']);

				if(data[0]['collect'] == 0){
					$('.indexCollect').html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
				}else if(data[0]['collect'] == 1){
					$('.indexCollect').html('<i class="fa fa-heart" aria-hidden="true"></i>');
				}
			}	
			$('#editPath').attr('href','edit?'+flag);				
			
		},
		error:function(data){
			console.log('error');
		}
	});
}

			














$('#open').click(function(){
	$('nav').animate({left:0});
	$('#mask').fadeIn();
});

$('#close').click(function(){
	$('nav').animate({left:'-25%'});
	$('#mask').fadeOut();
});

$('#mask').click(function(){
	$('#close').click();
	$('#configContent').animate({bottom:'-100%'});
});

$('.search').focus(function(){
	$('.search').addClass('active');
	$('#searchBtn').css({'zIndex':'4','position':'absolute','top':'10px'});
});

$('.search').blur(function(){
	$('.search').removeClass('active');
});

$('#configBtn').click(function(){
	$('nav').animate({left:'-25%'});
	$('#configContent').animate({bottom:'0px'}).animate({bottom:'0px'});
});

$('#config_Close').click(function(){
	$('#configContent').animate({bottom:'0px'}).animate({bottom:'-100%'});
	$('#mask').fadeOut(1500);
});

$('#theme').click(function(){
	$(this).attr('src','images/light.png');
	$('#left').css({'background':'#222','color':'#f5f5f5'});
	$('#right').css({'background':'#555'});
});

