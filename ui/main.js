console.log('Loaded!');
//change the text in main-text

var element=document.getElementbyId('main-text');

element.innerHTML='New value';


//move the image
var img=document.getElementbyId('madi');
function moveRight(){
    marginleft=marginleft+10;
    img.style.marginleft+px;
}
img.onclick=function(){
    var interval=setInterval(moveRight,100);
    //img.style.marginleft='100px';
};