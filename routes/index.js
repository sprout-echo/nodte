var express = require('express');
var router = express.Router();

var Note = require('../models/note.js');

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


module.exports = router;