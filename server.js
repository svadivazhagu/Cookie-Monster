//Server.js by Surya Vadivashagu 9/30
var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , util = require('util')
  , port = 8080
  , mongo = require('mongodb')
  , formidable = require('formidable');

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)
  //console.log(req.url);
  if(req.method === "GET") {
      switch( uri.pathname ) {
        case '/':
          sendFile(res, 'public/index.html');
          break;
        case '/index.html':
          sendFile(res, 'public/index.html');
          break;
        case '/results.html':
          sendFile(res,'public/results.html');
        case '/css/style.css':
          sendFile(res, 'public/css/style.css', 'text/css');
          break;
        case '/js/scripts.js':
          sendFile(res, 'public/js/scripts.js', 'text/javascript');
          break;
        case '/js/heatmap.min.js':
          sendFile(res, 'public/js/heatmap.min.js', 'text/javascript');
          break;
      /*  case '/js/keypress.min.js':
          sendFile(res, 'public/js/keypress.min.js', 'text/javascript');
          break;*/
        case 'img/favicon.png':
          sendFile(res,'public/img/favicon.png','img/png');
          break;
        case '/503.html':
          send503(res,'public/503.html');
          break;
        default:
          send404(res, 'public/404.html');
          //res.end('404 not found')
      }
    }
    else if(req.method === "POST") {
      switch(uri.pathname){
        case '/flare':
          getdata(req,res);
          break;
        case '/update':
          update(req,res)
          break;

        default:
          send404(res, 'public/404.html');
          break;
        }
      }
      else{
        send404(res, 'public/404.html');
      }
  });

server.listen(process.env.PORT || port);
console.log('listening on 8080')

var MongoClient = require('mongodb').MongoClient;
//var Server = require('mongodb').Server;
var MDBuri = "mongodb+srv://Pokebase:testabc@cluster0-asxvd.mongodb.net";
//var client = new MongoClient(new Server(MDBuri), {useNewUrlParser: true});
var dbo;

MongoClient.connect(MDBuri,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
 console.log("Database Connected!");

  dbo  = db.db("occupationDb");
   dbo.createCollection("user", function(err, res) {
     if (err) throw err;
     console.log("Collection Occupation created!");
   });


});


// subroutines
// NOTE: this is an ideal place to add your data functionality

function getdata(req, res) {
  //contentType = contentType || 'text/html';

  dbo.collection("occupation").find("children").toArray(function(err, result){
      if (err) throw err;
      console.log(result);
      var obj = {};
      obj.result = result;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(JSON.stringify(obj));
    //  var query = result.length; //get the length of the results
      res.end();

    });
}

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html';
  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })
}

function send404(res, filename, contentType) {
  contentType = contentType || 'text/html';
  fs.readFile(filename, function(error, content) {
    res.writeHead(404, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })
}

function send503(res, filename, contentType) {
  contentType = contentType || 'text/html';
  fs.readFile(filename, function(error, content) {
    res.writeHead(503, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })
}
