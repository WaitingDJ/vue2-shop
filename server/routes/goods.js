var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('./../models/goods');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/vue_shop');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on('error', function () {
  console.log("MongoDB connected disconnected.")
});

mongoose.connection.on('disconected', function () {
  console.log("MongoDB connected disconnected.")
});


//查询商品列表
router.get('/', function(req, res, next) {
  let page = parseInt(req.parem("page"));
  let pageSize = paresInt(req.parem("pageSize"));
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  let params = {};
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':dort});
  goodsModel.exec(function (err, doc) {
    if(err){
      res.json({
        status: '1',
        msg: err.message
      })
    }else{
      res.json({
        status: '0',
        msg: '',
        result:{
          count: doc.length,
          list: doc
        }
      })
    }
  })
});

module.exports = router;
