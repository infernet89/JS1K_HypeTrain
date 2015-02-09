/*
Refactor manuale variabili:
speedx=sx
speedy=sy
*/
function omino() {
  var o=new Object();
  o.sx=(5*Math.random()+2)*Math.pow(-1,Math.ceil(5*Math.random()));
  o.sy=(5*Math.random()+2)*Math.pow(-1,Math.ceil(5*Math.random()));
  //o.sx=(5*Math.random()+2);
  //o.sy=(5*Math.random()+2);
  //every man has 6 colors (can be reduced)
  o.testa='#'+(Math.random()*0xFFFFFF<<0).toString(16);
  o.corpo='#'+(Math.random()*0xFFFFFF<<0).toString(16);
  o.gambadx='#'+(Math.random()*0xFFFFFF<<0).toString(16);
  o.gambasx='#'+(Math.random()*0xFFFFFF<<0).toString(16);
  o.bracciodx='#'+(Math.random()*0xFFFFFF<<0).toString(16);
  o.bracciosx='#'+(Math.random()*0xFFFFFF<<0).toString(16);
  o.px=Math.random()*750;
  o.py=Math.random()*550;
  //TODO aggiungi 3d-like
  o.draw = function () {
    c.save();
  	//first, we move it
  	/*if(Kpressed[68] || Kpressed[39]) o.px+=o.sx;
  	if(Kpressed[65] || Kpressed[37]) o.px-=o.sx;
  	if(Kpressed[87] || Kpressed[38]) o.py-=o.sy;
  	if(Kpressed[83] || Kpressed[40]) o.py+=o.sy;*/
  	if(Kpressed[39]) o.px+=o.sx;
  	if(Kpressed[37]) o.px-=o.sx;
  	if(Kpressed[38]) o.py-=o.sy;
  	if(Kpressed[40]) o.py+=o.sy;

  	//then, we draw
  	c.translate(o.px,o.py);
  	//body
  	c.fillStyle=o.corpo;
  	c.fillRect(15,10,15,20);
  	//arms
  	c.fillStyle=o.bracciosx;
  	c.fillRect(10,15,5,10);
  	c.fillStyle=o.bracciodx;
  	c.fillRect(30,15,5,10);
  	//legs (OMG, he skipped leg day)
  	c.fillStyle=o.gambasx;
  	c.fillRect(15,28,5,15);
  	c.fillStyle=o.gambadx;
  	c.fillRect(25,28,5,15);
    //head
    c.fillStyle=o.testa;
    c.beginPath();
    c.arc(22,5,5,0,2*Math.PI);
    c.fill();

  	c.restore();
  }
  return o;
}
train=new Object();
train.px=Math.random()*750;
train.py=Math.random()*450+100;
//TODO aggiungi 3d-like
train.draw=function () {
	c.save();

	c.translate(train.px,train.py);
	c.fillStyle="black";
	//structure
	c.fillRect(0,15,50,23);
	c.fillRect(5,0,5,15);
	c.fillRect(35,5,15,10);
	//wheels
	c.beginPath();
	c.arc(12,43,7,0,2*Math.PI);
	c.arc(40,43,7,0,2*Math.PI);
	c.fill()
	//TODO si risparmia togliendo il movimento
	//move it
	train.px-=3;
	if(train.px<-50)
	{
		train.px=800;
		train.py=Math.random()*450+100;
	}
  c.restore();
}
var passanti=[];
pg=omino();
pg.sx/=2;
pg.sy/=2;
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());
passanti.push(omino());

passanti.push(pg);
passanti.push(train);

//keyboard controls
var Kpressed=[];
onkeydown=function (e) { Kpressed[e.keyCode]=true; }
onkeyup=function (e) { Kpressed[e.keyCode]=false; }
//window.addEventListener('keydown',keyDown,false);
//window.addEventListener('keyup',keyUp,false);

var activeTask=setInterval(run, 33);
var totaltime=0;


function run()
{
	//draw the background
	c.fillStyle="Silver";
	c.fillRect(0,0,800,600);

	//draw characters
	passanti.forEach(function(entry) {
    entry.draw();
    });
    passanti.sort(function(a, b){return a.py-b.py});
  
    //overlay with information
    c.save();
    //c.globalAlpha=0.6;
    c.fillStyle="Gray";
    c.fillRect(0,0,330,50);
    c.fillRect(700,0,100,50);
    c.scale(0.7,0.7);
    c.translate(-pg.px+9,-pg.py+9);
    //c.globalAlpha=0.9;
    pg.draw();
    c.restore();
    c.fillStyle="Black";
    c.font = "30px Serif";
    c.fillText("Take me to the train!",40,35);
    totaltime+=0.033;
    c.fillText(totaltime.toFixed(1)+"s",710,35);

    //collision check
    //console.log(pg.px+" "+pg.py+" Treno:"+train.px+" "+train.py);
    if(train.px<pg.px && pg.px<train.px+20 && train.py<pg.py && pg.py<train.py+20)
    //if(pg.px>train.px && pg.px<train.px+20 && pg.py>train.py && pg.py<train.py+20)
    //if(Math.abs(pg.px-train.px+10)<10 && Math.abs(pg.py-train.py+10)<10) BIGGER :O
    {
    	c.fillStyle="Green";
    	c.fillRect(300,270,80,40);
    	c.fillStyle="Black";
    	c.font = "30px Serif";
    	c.fillText("NICE!",300,300);
    	clearInterval(activeTask);
    }
    else if(pg.px>800 || pg.px<-50 || pg.py>600 || pg.py<-50)
    //else if((pg.px+100)%900<50 || (pg.py+100)%700<50) //BIGGER, apparently
    {
    	c.fillStyle="Red";
    	c.fillRect(300,270,80,40);
    	c.fillStyle="Black";
    	c.font = "30px Serif";
    	c.fillText("FAIL!",300,300);
    	clearInterval(activeTask);
    } 
}