var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');





var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret : 'someRandomSecretValue',
    cookie : {maxAge: 1000 * 60 * 60 * 24 * 30 }
}));

var config = {
   user     : 'dgovindarao',
   database :  'dgovindarao',
   host     :  'db.imad.hasura-app.io',
   port     :  '5432',
   password :   process.env.DB_PASSWORD
   
};
  
  
  var articles={
   'Article-one':{
      title:'Article-one',
      heading:'Article-one',
      date:'5  sep 2017',
      content:`<p>this is the content for the first articlethis is the content for the first articlethis is the content for the first articlethis is the content for the first article
        </p>
        <p>this is the content for the first article.this is the content for the first article.this is the content for the first article.this is the content for the first article.this is the content for the first article.this is the content for the first article.
        </p>`
  },
  'Article-two':{title:'Article-two',
      heading:'Article-two',
      date:'10  sep 2017',
      content:`<p>this is my second article
        </p>`},
  'Article-three':{title:'Article-three',
      heading:'Article-three',
      date:'15  sep 2017',
      content:`<p>this is my third article
        </p>`},
  };
 
 function createTemplate (data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
    var htmlTemplate = `
        <html>
    <head>
        <title>
            ${title}
         </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
        
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">home</a>
        </div>
        <hr>
        <h3>
            ${heading}
            </h3>
        <hr>
        <div>
            ${date}
        </div>
        <hr>
        <div>
       ${content}
        </div>
        </div>
    </body>
</html> 
 `;
    return htmlTemplate;
     
 }
     
     
     
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});



function hash(input,salt)
{
    //how do we create the hash
    var hashed = crypto.pbkdf2Sync(input, salt,10000, 512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
   var hashedString = hash(req.params.input,'this-is-some-random-string');
   res.send(hashedString);
});

app.post('/create-user',function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   var salt  = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt);
   pool.query('INSERT INTO "user_1" (username,password) VALUES ($1,$2)', [username,dbString],function(err,result){
       if (err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('user successfully created',+username);
        }
   });
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return a responsewith the reuslts
    pool.query('SELECT * FROM test',function (err,result){
        if (err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});

 
 var counter=0;
 app.get('/counter',function(req,res) {
 counter = counter + 1;
 res.send(counter.toString());
 });
 
 

  var names = [];
 app.get('/submit-name',function (req,res)
 { 
      var name = req.query.name;
      names.push(name);
      res.send(JSON.stringify(names));
 });

 

app.get('/:articleName',function(req,res)
{
    var articleName=req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});





 
app.get('/articles/:articleName',function(req,res){
   // var articleName=req.params.articleName;
     
   pool.query(" SELECT * FROM name1 WHERE title = $1" ,[ req.params.articleName],function (err,result){
       if(err){
            res.status(500).send(err.toString());
      }
   else
       {
      if( result.rows.length === 0)
         {
             res.status(404).send('Article not found');
        }
         else
         {
           var articleData = result.rows[0];
           res.send(createTemplate(articleData));
           }
           }
      });
 });


        
   
   //res.send(createTemplate(articledata));


 
 

//app.get('/Article-three',function(req,res)
//{
// res.sendFile(path.join(__dirname, 'ui', 'Article-three.html'));
//});

//app.get('/Article-two',function(req,res)
//{
 //res.sendFile(path.join(__dirname, 'ui', 'Article-two.html'));
//});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80


var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
