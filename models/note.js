var mongoose = require('mongoose');
//调试模式
mongoose.set('debug',true);
var db = mongoose.connect('mongodb://localhost/db');

db.connection.on('error',function(req,res){
	console.log('Mongodb连接失败');
});

db.connection.on('open',function(req,res){
	console.log('MongoDB连接成功');
});
//创建schema对象
var noteSchema = new mongoose.Schema({
	title:String,
	content:String,
	concrete:String,  //没有样式的文本内容
	markdown:String,  //markdown操作样式的文本
	flag:String,     //笔记标识
	collect:Number,     //收藏
	notebook:String,        //笔记本	
	password:Number
});
//创建模型
module.exports = mongoose.model('Note',noteSchema);
