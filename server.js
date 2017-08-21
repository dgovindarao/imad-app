var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
 
 var articles = {
   'Article-One' : {
      title:'Article-one',
      date:'5 sep 2017',
      heading:'Article-one',
      content:`
      <p>this is the content for the first articlethis is the content for the first articlethis is the content for the first articlethis is the content for the first article
        </p>
        <p>this is the content for the first article.this is the content for the first article.this is the content for the first article.this is the content for the first article.this is the content for the first article.this is the content for the first article.
        </p>`
      
      },
   'Article-Two' :{
      title:'Article-two',
      date:'10 sep 2017',
      heading:'Article-two',
      content:`
      
        <p> this is my second article
        </p>`},
   'Article-Three':{
      title:'Article-three',
      date:'15 sep 2017',
      heading:'Article-three',
      content:`
      <p>this is my third article
        </p>`}
 };
      function createTemplate (data){
          var title= data.title;
          var date =data.date;
          var heading =data.heading;
          var content=data.content;
     
       var htmlTemplate= `
       <html>
       <head>
        <title>
            ${title}
            </title>
        <meta name="viewpoint" content="width=device-width, initial-scale=1"/>
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


app.get('/:articleName ',function(req,res)
{
    //articleName=Article-one
    //articles[articleName]==[]contnet object for article one
    var articleName=req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});

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

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
