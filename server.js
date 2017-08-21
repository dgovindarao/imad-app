var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
  
  
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
 
 
 var counter=0;
 app.get('/counter',function(req,res) {
 counter = counter + 1;
 res.send(counter.toString());
 });


app.get('/:articleName',function(req,res)
{
    var articleName=req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});
 
 
 

//app.get('/Article-three',function(req,res)
//{
  // res.sendFile(path.join(__dirname, 'ui', 'Article-three.html'));
//});
//app.get('/Article-two',function(req,res)
//{
 // res.sendFile(path.join(__dirname, 'ui', 'Article-two.html'));
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
var names = [];
 app.get('/submit-name/:name',function (req,res){
      var name=req.params.name;
      name.push(name);
      res.send(JSON.stringify(names));
 });

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
