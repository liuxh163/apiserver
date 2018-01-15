var File = require('../../models').File,
    https = require('https'),
    fs = require('fs');

exports.download = function(req,res,next){
	var url = "https://127.0.0.1:10115/"+req.getPath().split('/').pop()+'?'+req.getQuery();
  https.get(url, function (ires) {
        var datas = [];
        var size = 0;
        ires.on('data', function (data) {
            datas.push(data);
            size += data.length;
        //process.stdout.write(data);
        });
        ires.on("end", function () {
          var buff = Buffer.concat(datas, size);
          res.send(datas);
        });
    }).on("error", function (err) {
       console.log(err);
    });
};

exports.fetch = function(req,res,next){
	var url = "https://127.0.0.1:10115/"+req.getPath().split('/').pop()+'?'+req.getQuery();
  https.get(url, function (ires) {
        var datas = [];
        var size = 0;
        ires.on('data', function (data) {
            datas.push(data);
            size += data.length;
        //process.stdout.write(data);
        });
        ires.on("end", function () {

          var buff = Buffer.concat(datas, size);
          res.end(buff);
            // var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring
            // console.log(result);
        });
    }).on("error", function (err) {
       console.log(err);
    });
};

exports.upload = function(req,res,next){
	var options={
		hostname:"127.0.0.1",
		port:10115,
		path:'/upload',
		method:"POST",
		headers:{
			"Connection":req.header("Connection"),
			"Content-Type": req.header("Content-Type")
		}
	}

	var reqt = https.request(options, function(ires) {
		ires.pipe(res);
		ires.on('data',(chunk)=>{
      console.log('response:'+chunk);
    });
		ires.on('end',()=>{
      console.log('res end.');
    });
	});

	req.pipe(reqt);

	reqt.on("error",function(err){
      console.log(err.message);
  });

  // res.end('upload is done');
  res.on('end', (data)=>{
  	console.log(data);
  });
};
