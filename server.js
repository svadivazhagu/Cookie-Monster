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
        case '/dashboard.html':
          sendFile(res, 'public/dashboard.html')
          break;
        case '/dashboard':
          sendFile(res, 'public/dashboard.html')
          break;
        case '/results.html':
          sendFile(res,'public/results.html');
        case '/css/style.css':
          sendFile(res, 'public/css/style.css', 'text/css');
          break;
        case '/css/mdb.min.css':
          sendFile(res, 'public/css/mdb.min.css', 'text/css');
          break;
        case '/js/scripts.js':
          sendFile(res, 'public/js/scripts.js', 'text/javascript');
          break;
        case '/js/analyze.js':
          sendFile(res, 'public/js/analyze.js', 'text/javascript');
          break;
        case '/js/heatmap.min.js':
          sendFile(res, 'public/js/heatmap.min.js', 'text/javascript');
          break;
        case '/img/favicon.png':
          sendFile(res,'public/img/favicon.png','img/png');
          break;
        case '/503.html':
          send503(res,'public/503.html');
          break;
        case 'img/cookieLogo.png':
          sendFile(res, 'public/img/cookieLogo.png', 'img/png')
          break;
        case 'img/cookieBackground.jpg':
          sendFile(res, 'public/img/cookieBackground.jpg', 'img/jpg')
          break;
        case '/css/landingpage.min.css':
          sendFile(res, 'public/css/landingpage.min.css','text/css')
          break;
        default:
          send404(res, 'public/404.html');
          //res.end('404 not found')
      }
    }
    else if(req.method === "POST") {
      switch(uri.pathname){
        case '/static':
          updatestatic(req,res);
          break;
        case '/session':
          updatesession(req,res)
          break;
        case '/getIndexes':
          getIndexes(req, res)
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
  dbo  = db.db("userinfo");
   dbo.createCollection("userdata", function(err, res) {
     if (err) throw err;
     console.log("Collection userdata created!");
   });


});


// subroutines
// NOTE: this is an ideal place to add your data functionality



function updatestatic(req, res) {
  var parse = '';
  var id;

  //on get data
  req.on('data', function(d) {
    parse = JSON.parse(d); //parse the data
    //console.log(parse);
    //console.log(parse);
    //get the link
     //on done in the on data due to async
       res.writeHead(200, {'Content-Type': 'text/html'});

       //check if link already exists in the DB and addit if it doesnt
        try {
             dbo.collection("userdata").updateOne(
                { "id" : parse.id },
                { $set: parse.userinfo},
                { upsert: true }
             );
             console.log("User "+parse.id+" Static data saved!");
          } catch (e) {
             print(e);
          }

        res.end();
  });
}


function updatesession(req, res) {
  var parse = '';
  var id;

  //on get data
  req.on('data', function(d) {
    parse = JSON.parse(d); //parse the data
    //console.log(parse);
    //console.log(parse);
    //get the link

       //on done in the on data due to async
       res.writeHead(200, {'Content-Type': 'text/html'});

       //check if link already exists in the DB and addit if it doesnt
        try {
             dbo.collection("userdata").updateOne(
                { "id" : parse.id },
                { $set: parse.session},
                { upsert: true }
             );
             console.log("User "+parse.id+" session data saved!");
          } catch (e) {
           //  print(e);
          }

        res.end();
  });
}


 function getIndexes(req, res) {
  console.log("FJEKFHNSDKFSDKLFHSDL")
var parse = {};
var id;
var results;
//on get data

  //  res.writeHead(200, {'Content-Type': 'text/html'});
  let AuthUser = function(parse) {
    return dbo.collection("userdata").find({}).toArray().then(token => { return token } )
  }
  let userToken = AuthUser();
  userToken.then(function(result) {
  parse = {"response":result};
  res.write( JSON.stringify(parse));
  //console.log(parse);
  res.end();
  });



    //var results = await getresults();

    //res.end();
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
