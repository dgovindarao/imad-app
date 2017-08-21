var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
 
 
  var articleOne = {
      title: 'Article-one',
      heading: 'Article-one',
      date:'sep 5,2017',
      content: ' <p> this is my first article-one </p> '
     
      };
      
       var htmlTemplate = \ <html>
               <head>
                 <title>
                  ${heading}
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
             $ {content}
                </div>
             </div>
         </body>
    </html> 
\ ;
         



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/Article-one',function(req,res)
{
   res.sendFile(path.join(__dirname, 'ui', 'Article-one.html'));
});

app.get('/Article-three',function(req,res)
{
   res.sendFile(path.join(__dirname, 'ui', 'Article-three.html'));
});
app.get('/Article-two',function(req,res)
{
  res.sendFile(path.join(__dirname, 'ui', 'Article-two.html'));
});

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
