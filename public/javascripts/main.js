$(document).ready(function(){
	$.ajax({
		type:'post',
		url:'/datalist',
		success:function(data){
			for(var i=0;i<data.length;i++){
				var newNotes = $("<div class='notes'></div>").append("<p class='note_title'>"+data[i]['title']+"</p><p class='brief'>"+data[i]['concrete']+"</p><div><span class='noteDel'><i class='fa fa-trash' aria-hidden='true'></i></span> <span class='noteTime'>" + data[i]['flag']+"</span></div><div class='collect'></div>");
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
	}).done(function(){
		$('.notes').click(function(){
			$(this).css({'background':'#f5f5f5'});
			$(this).siblings().css({'background':'transparent'});
			$('#face').fadeOut();
			$('#noteContent').fadeIn();

			var flag = $(this).children().eq(2).children().eq(1).text();
			$.ajax({
				type:'post',
				url:'/content',
				data:{flag:flag},
				success:function(data){
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
		});

		$('#pswBtn').click(function(){
			$('#pswMask').show();
			$('#pswContent').show();
		});
		$('#pswCancel').click(function(){
			var flag = $('#contentText .indexTime').html();
			$.ajax({
				type:'post',
				url:'/pswcancel',
				data:{flag:flag },
				success:function(data){
					if(data[0]['password'] == '0'){
						$('#pswMask').hide();
						$('#pswContent').hide();
					}else{
						alert('请输入密码');
					}
					
				},
				error:function(data){
					console.log(data);
				}
			});
			
		});
		$('#pswOK').click(function(){
			var flag = $('#contentText .indexTime').html();
			var pass = $('#pswText').val();
			console.log(flag);
			$.ajax({
				type:'post',
				url:'/password',
				data:{flag:flag,pass:pass},
				success:function(data){
					if(data.success == true){
						$('#pswMask').hide();
						$('#pswContent').hide();
						alert('密码正确');
					}else if(data.pass){
						alert('加密成功');
					}else{
						alert('密码错误');
					}
					console.log(data);
					
				},
				error:function(data){
					console.log('error');
				}
			}); 
		});

		$('.noteDel').click(function(){
			var flag = $(this).siblings().text();
			if(confirm('确定要删除该笔记?')){
				$.ajax({
				type:'post',
				url:'/noteDel',
				data:{flag:flag},
				success:function(data){
					if(data.success == true){
						alert('删除成功');
					}
					window.location.reload();
				},
				error:function(data){
					console.log(data);
				}
			});
			}
			
		});
		$('.collect').click(function(){
			var flag = $(this).siblings().children().eq(1).text();
			var _that = $(this);
			$.ajax({
				type:'post',
				url:'/collect',
				data:{flag:flag},
				success:function(data){
					if(data.success == true){
						_that.html('<i class="fa fa-heart" aria-hidden="true"></i>');
						$('.indexCollect').html('<i class="fa fa-heart" aria-hidden="true"></i>');
					}if(data.success == false){
						_that.html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
						$('.indexCollect').html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
					}
				},
				error:function(data){
					console.log('error');
				}
			});
		});

		$('#delLock').click(function(){
			var flag = $('#contentText .indexTime').html();
			if(confirm('确定要删除加密锁？')){
				$.ajax({
					type:'post',
					url:'delLock',
					data:{flag:flag},
					success:function(data){
						if(data.success == true){
							alert('加密锁已经删除');
						}
					},
					error:function(data){

					}
				})
			}
		});


	});
});

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
