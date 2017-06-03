var express = require('express');
var router = express.Router();
var fs = require("fs");

var Note = require('../models/note.js');
var Manager = require('../models/manager.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/main',function(req,res,next){
	res.render('main');
});

router.post('/datalist',function(req,res){
	Note.find({},function(err,doc){
		if(err){
			res.send(err);
		}else{
			res.send(doc);
		}
	});
});

router.get('/edit',function(req,res,next){
	res.render('edit');
});

router.post('/save',function(req,res){
	var newNote = new Note({
		title:req.body.titleText,
		content:req.body.outText,
		concrete:req.body.concreteText,
		flag:req.body.flags,
		markdown:req.body.markdown,
		notebook:req.body.notebook,
		password:'0',
		collect:0
	})
	newNote.save();
	res.send({success:true});
});

router.post('/editSave',function(req,res){
	var editNote = new Note({
		title:req.body.titleText,
		content:req.body.outText,
		concrete:req.body.concreteText,
		flag:req.body.flag,
		markdown:req.body.markdown,
		notebook:req.body.notebook,
		password:'0',
		collect:0
	});
	Note.update({flag:editNote.flag},{title:editNote.title,content:editNote.content,concrete:editNote.concrete,markdown:editNote.markdown,notebook:editNote.notebook},function(err){
		if(err){
			res.send(err);
		}else{
			res.send({success:true});
		}
	});
});

router.post('/content',function(req,res){
	var flag = req.body.flag;
	Note.find({flag:flag},function(err,doc){
		if(err){
			res.send(err);
		}else{
			res.send(doc);
		}
	});
});

router.post('/password',function(req,res){
	var flag = req.body.flag;
	var pass = req.body.pass;
	Note.find({flag:flag},function(err,data){
		if(err){
			res.send(err);
		}else{		
			//没有加密
			if(data[0]['password'] == '0'){
				Note.update({flag:flag},{password:pass},function(err,doc){
					if(err){
						res.send(err);
					}else{
						res.send({pass:true});
					}
				});
			//已经加密（密码是否正确）
			}else{
				if(data[0]['password'] == pass){
					res.send({success:true});
				}else{
					res.send({success:false});
				}
			}
		}
	});
	
});

router.post('/pswcancel',function(req,res){
	var flag = req.body.flag;
	Note.find({flag:flag},function(err,doc){
		if(err){
			res.send(err);
		}else{
			res.send(doc);
		}
	});
});

router.post('/noteDel',function(req,res){
	var flag = req.body.flag;
	Note.remove({flag:flag},function(err){
		if(err){
			res.send(err);
		}else{
			res.send({success:true});
		}
	})
});

router.post('/collect',function(req,res){
	var flag = req.body.flag;
	Note.find({flag:flag},function(err,doc){
		if(err){
			res.send(err);
		}else{			
			//没有收藏
			if(doc[0]['collect'] == 0){
				Note.update({flag:flag},{collect:1},function(err,data){
					if(err){
						res.send(err);
					}else{
						res.send({success:true});
					}
				});
			}else{
				//已经收藏
				Note.update({flag:flag},{collect:0},function(err,data){
					if(err){
						res.send(err);
					}else{
						res.send({success:false});
					}
				});
			}
		}
	});
});

router.post('/delLock',function(req,res){
	var flag = req.body.flag;
	Note.update({flag:flag},{password:0},function(err,doc){
		if(err){
			res.send(err);
		}else{
			res.send({success:true});
		}
	});
});

router.post('/editNote',function(req,res){
	var flag = req.body.flag;
	Note.find({flag:flag},function(err,doc){
		if(err){
			res.send(err);
		}else{
			res.send(doc);
		}
	});
});

router.post('/collectlist',function(req,res){
	Note.find({collect:1},function(err,doc){
		if(err){
			res.send(err);
		}else{
			res.send(doc);
		}
	});
});

router.post('/book',function(req,res){
	Note.distinct('notebook',function(err,doc){
		if(err){
			res.send(err);
		}else{
			res.send(doc);
		}
	});
});

router.post('/booklist',function(req,res){
	var book = req.body.book;
	Note.find({notebook:book},function(err,doc){
		if(err){
			res.send(err);
		}else{
			res.send(doc);
		}
	})
});

router.get('/download',function(req,res){
	var flag = req.query.flag;
	Note.find({flag:flag},function(err,doc){
		if(err){
			res.send(err);
		}else{
			fs.writeFile('download/'+flag+'.md',doc[0]['title']+doc[0]['markdown'],function(err){
				if(err){
					res.send(err);
				}else{
					res.send({success:true});
				}
			});
		}
	});
});
//查询
router.post('/search',function(req,res){
	var keywords = req.body.keywords;
	var reg = new RegExp(keywords,'i');
	Note.find({title:reg},function(err,doc){
		if(err){
			res.send(err);
		}else{
			res.send(doc);
		}
	});
});


//注册
router.post('/register',function(req,res){
	var newManager = new Manager({
		username:req.body.user,
		password:req.body.pass,
		email:req.body.email,
		remember:1
	});

	Manager.find({username:newManager.username},function(err,doc){
		if(err){
			res.send(err);
		}else{
			if(doc.length == 0){
				newManager.save();
				res.send({success:true});
			}else{
				res.send({exist:true});
			}
		}
		
	});

});
//登录
router.post('/login',function(req,res){
	var name = req.body.names;
	var psw = req.body.psw;
	Manager.find({username:name},function(err,doc){
		if(err){
			res.send(err);
		}else{
			if(doc[0]['password'] == psw){
				res.send({success:true});
			}else{
				res.send({success:false});
			}
		}
	})
});

//上传
router.post('/upload',function(req,res,next){
	res.send(req.body);
});







module.exports = router;