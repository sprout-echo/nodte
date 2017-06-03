$(document).ready(function(){
	$.ajax({
		type:'post',
		url:'/datalist',
		success:function(data){
			for(var i=0;i<data.length;i++){
				var newNotes = $("<div class='notes'></div>").append("<p class='note_title'>"+data[i]['title']+"</p><p class='brief'>"+data[i]['concrete'].substring(0,50)+'...'+"</p><div><span class='noteDel' title='delete'><i class='fa fa-trash' aria-hidden='true'> </i> </span> <i class='fa fa-download' aria-hidden='true' title='download' onclick=\"downloadNote('"+data[i]['flag']+"');\"></i><span class='noteTime'>" + data[i]['flag']+"</span></div><div class='collect'></div>");
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
			var _that = $(this);
			noteClick(_that);
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
			var _that = $(this);
			delNotes(_that);
			
		});
		$('.collect').click(function(){
			var _that = $(this);
			var flag = $(this).siblings().children().eq(2).text();
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
						$('.indexCollect').html('<i d class="fa fa-heart-o" aria-hidden="true"></i>');
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
						console.log('error');
					}
				})
			}
		});
		//导航栏按钮
		//所有笔记本
		$('#allNote').click(function(){
			$('nav').animate({left:'-25%'});
			$('#mask').hide();
			$('#titleController').children().remove();
			$.ajax({
				type:'post',
				url:'/datalist',
				success:function(data){
					for(var i=0;i<data.length;i++){
						var newNotes = $("<div class='notes'></div>").append("<p class='note_title'>"+data[i]['title']+"</p><p class='brief'>"+data[i]['concrete'].substring(0,50)+'...'+"</p><div><span class='noteDel' title='delete'><i class='fa fa-trash' aria-hidden='true'> </i> </span> <i class='fa fa-download' aria-hidden='true' title='download' onclick=\"downloadNote('"+data[i]['flag']+"');\"></i><span class='noteTime'>" + data[i]['flag']+"</span></div><div class='collect'></div>");
						var finalNote = $("#titleController").append(newNotes);
						if(data[i]['collect'] == 0){
							$('.collect').eq(i).html("<i class='fa fa-heart-o' aria-hidden='true'></i>");
						}else{
							$('.collect').eq(i).html("<i class='fa fa-heart' aria-hidden='true'></i>"); 
						}           
					}

					$('.notes').click(function(){
						var _that = $(this);
						noteClick(_that);
					});   /*click --end*/
					$('.noteDel').click(function(){
						var _that = $(this);
						delNotes(_that);			
					});

				},
				error:function(data){
					console.log(data);
				}
			});
			
		});
		//收藏夹
		$('#collectNav').click(function(){
			$('nav').animate({left:'-25%'});
			$('#mask').hide();
			$('#titleController').children().remove();
			$.ajax({
				type:'post',
				url:'collectlist',
				success:function(data){
					for(var i=0;i<data.length;i++){
						var newNotes = $("<div class='notes'></div>").append("<p class='note_title'>"+data[i]['title']+"</p><p class='brief'>"+data[i]['concrete'].substring(0,50)+'...'+"</p><div><span class='noteDel'><i class='fa fa-trash' aria-hidden='true'></i></span> <i class='fa fa-download' aria-hidden='true' title='download' onclick=\"downloadNote('"+data[i]['flag']+"');\"></i><span class='noteTime'>" + data[i]['flag']+"</span></div><div class='collect'></div>");
						var finalNote = $("#titleController").append(newNotes);
						if(data[i]['collect'] == 0){
							$('.collect').eq(i).html("<i class='fa fa-heart-o' aria-hidden='true'></i>");
						}else{
							$('.collect').eq(i).html("<i class='fa fa-heart' aria-hidden='true'></i>"); 
						}
					}
				},
				error:function(data){
					console.log('error');
				}
			}).done(function(){
				$('.notes').click(function(){
					var _that = $(this);
					noteClick(_that);
				});   /*click --end*/
				$('.noteDel').click(function(){
					var _that = $(this);
					delNotes(_that);			
				});
				
			});  /*done --end*/

		});
		$('#allBook').click(function(){
			$('nav').animate({left:'-25%'});
			$('#mask').hide();
			$('#titleController').children().remove();
			$.ajax({
				type:'post',
				url:'/book',
				success:function(data){
					for(var i=0;i<data.length;i++){
						var booklist = $('<ul></ul>').append("<li>" + data[i]+"</li>");
						$('#titleController').append(booklist);
					}

					//显示笔记本标签下的分类笔记
					$('#titleController ul li').on('click',function(){
						var book = $(this).text();
						$.ajax({
							type:'post',
							url:'booklist',
							data:{book:book},
							success:function(data){
								$('#titleController').children().remove();
								for(var i=0;i<data.length;i++){
									var newNotes = $("<div class='notes'></div>").append("<p class='note_title'>"+data[i]['title']+"</p><p class='brief'>"+data[i]['concrete'].substring(0,50)+'...'+"</p><div><span class='noteDel' title='delete'><i class='fa fa-trash' aria-hidden='true'> </i> </span> <i class='fa fa-download' aria-hidden='true' title='download' onclick=\"downloadNote('"+data[i]['flag']+"');\"></i><span class='noteTime'>" + data[i]['flag']+"</span></div><div class='collect'></div>");
									var finalNote = $("#titleController").append(newNotes);
									if(data[i]['collect'] == 0){
										$('.collect').eq(i).html("<i class='fa fa-heart-o' aria-hidden='true'></i>");
									}else{
										$('.collect').eq(i).html("<i class='fa fa-heart' aria-hidden='true'></i>"); 
									}           
								}
								$('.notes').click(function(){
									var _that = $(this);
									noteClick(_that);
								});

								$('.noteDel').click(function(){
									var _that = $(this);
									delNotes(_that);
									
								});
							},
							error:function(data){
								console.log('error');
							}
						})
					});					
				},
				error:function(data){
					console.log('error');
				}
			});
		});
	});  
});  /*ready --end*/

//note点击函数
function noteClick(_that){
	_that.css({'background':'#f5f5f5'});
	_that.siblings().css({'background':'transparent'});
	$('#face').fadeOut();
	$('#noteContent').fadeIn();

	var flag = _that.children().eq(2).children().eq(2).text();

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
				$('.indexBook').html('<i class="fa fa-book" aria-hidden="true"></i> '+data[0]['notebook']);
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
				$('.indexBook').html('<i class="fa fa-book" aria-hidden="true"></i> '+ data[0]['notebook']);
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
	}); /* ajax--end*/			
}

//删除笔记函数
function delNotes(_that){
	var flag = _that.siblings().text();
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

//夜间模式

$('#configBtn').click(function(){
	if($('#configBtn').children().eq(1).text() )
	$('#left').css({'background':'#222','color':'#f5f5f5'});
	$('#right').css({'background':'#555'});
});


//查询
$('#searchBtn').click(function(){
	var keywords = $('.search').val();
	$.ajax({
		type:'post',
		url:'/search',
		data:{keywords:keywords},
		success:function(data){
			$('#titleController').children().remove();
			for(var i=0;i<data.length;i++){
				var newNotes = $("<div class='notes'></div>").append("<p class='note_title'>"+data[i]['title']+"</p><p class='brief'>"+data[i]['concrete'].substring(0,50)+'...'+"</p><div><span class='noteDel'><i class='fa fa-trash' aria-hidden='true'></i></span> <i class='fa fa-download' aria-hidden='true' title='download' onclick=\"downloadNote('"+data[i]['flag']+"');\"></i><span class='noteTime'>" + data[i]['flag']+"</span></div><div class='collect'></div>");
				var finalNote = $("#titleController").append(newNotes);
				if(data[i]['collect'] == 0){
					$('.collect').eq(i).html("<i class='fa fa-heart-o' aria-hidden='true'></i>");
				}else{
					$('.collect').eq(i).html("<i class='fa fa-heart' aria-hidden='true'></i>"); 
				}
			}

			$('.notes').click(function(){
				var _that = $(this);
				noteClick(_that);
			});

		},error:function(data){
			console.log('error');
		}
	})
});


//文件下载
function downloadNote(obj){
	$.ajax({
		type:'get',
		url:'/download',
		data:{flag:obj},
		success:function(data){
			if(data.success == true){
				$('#prompt').fadeIn();
				$('#prompt').html('下载成功 ☺');
				setTimeout("$('#prompt').fadeOut()",3000);
			}else{
				$('#prompt').fadeIn();
				$('#prompt').html('下载失败，请重新下载 ☹');
			}
		},
		error:function(data){
			console.log('error');
		}
	})
}

//文件上传
$('#uploadBtn').click(function(){
	$('nav').animate({left:'-25%'});
	$('#mask').hide();
	$('#fileBtn').click();
});

$('#formBtn').click(function(){
	
});