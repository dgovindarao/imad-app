console.log('Loaded!');
//change the text in main-text

var element=document.getElementbyId('main-text');

element.innerHTML='New value';


//move the image
var img=document.getElementbyId('madi');
img.onclick=function(){
    var interval=setInterval(moveRight,100);
    //img.style.marginleft='100px';
};