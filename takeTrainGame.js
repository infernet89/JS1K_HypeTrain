/*
Refactor manuale variabili:
speedx=sx
speedy=sy
2 * Math.PI=6.3=7
train = t
*/
function omino() {
  var o=new Object();
  o.sx=(5*Math.random()+2)*Math.pow(-1,Math.ceil(5*Math.random()));
  o.sy=(5*Math.random()+2)*Math.pow(-1,Math.ceil(5*Math.random()));
  //o.sx=(5*Math.random()+2); //-20B
  //o.sy=(5*Math.random()+2); //
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

  	//first, we draw
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
    c.arc(22,5,5,0,7);
    c.fill();
  	c.restore();

    //then, we move it
    /*if(Kpressed[68] || Kpressed[39]) o.px+=o.sx;
    if(Kpressed[65] || Kpressed[37]) o.px-=o.sx;
    if(Kpressed[87] || Kpressed[38]) o.py-=o.sy;
    if(Kpressed[83] || Kpressed[40]) o.py+=o.sy;*/
    if(Kpressed[39]) o.px+=o.sx;
    if(Kpressed[37]) o.px-=o.sx;
    if(Kpressed[38]) o.py-=o.sy;
    if(Kpressed[40]) o.py+=o.sy;
  }
  return o;
}
t=new Object();
t.px=800;
t.py=Math.random()*450+100;
//TODO aggiungi 3d-like
t.draw=function () {
	c.save();

	c.translate(t.px,t.py);
	c.fillStyle="Black";
	//structure
	c.fillRect(0,15,50,23);
	c.fillRect(5,0,5,15);
	c.fillRect(35,5,15,10);
	//wheels
	c.beginPath();
	c.arc(12,43,7,0,7);
	c.arc(40,43,7,0,7);
	c.fill();
  c.restore();

	//TODO si risparmia togliendo il movimento
	//move it
	if((t.px-=3)<-50)
	{
		t.px=800;
		t.py=Math.random()*450+100;
	}
}
var passanti=[];
pg=omino();
pg.sx/=2;
pg.sy/=2;
//for(i=0;i<30;i++) passanti.push(omino());
for(i=30;i--;) passanti.push(omino());

passanti.push(pg);
passanti.push(t);

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
    //COSTA 30B
    passanti.sort(function(a, b){return a.py-b.py});
  
    //overlay with information
    c.save();
    //c.globalAlpha=0.6;
    c.fillStyle="Gray";
    c.fillRect(0,0,330,50);
    c.fillRect(700,0,100,50);
    c.scale(0.7,0.7);
    c.translate(9-pg.px,9-pg.py);
    //c.globalAlpha=0.9;
    pg.draw();
    c.restore();
    c.font = "30px Serif";
    c.fillStyle="Black";
    c.fillText("Take me to the train!",40,35);
    //COSTA 53B (complessivo)
    totaltime+=0.033;
    c.fillText(totaltime.toFixed(1)+"s",710,35);

    //collision check
    //console.log(pg.px+" "+pg.py+" Treno:"+t.px+" "+t.py);
    if(t.px<pg.px && t.py<pg.py && pg.px<t.px+20 && pg.py<t.py+20)
    //if(pg.px>t.px && pg.px<t.px+20 && pg.py>t.py && pg.py<t.py+20)
    //if(Math.abs(pg.px-t.px+10)<10 && Math.abs(pg.py-t.py+10)<10) BIGGER :O
    {
    	c.fillStyle="Green";
    	/*c.fillRect(300,270,80,40);
    	c.fillStyle="Black";*/
    	//c.font = "30px Serif";
    	c.fillText("NICE!",300,300);
    	clearInterval(activeTask);
    }
    if(pg.px>800 || pg.px<-50 || pg.py>600 || pg.py<-50)
    //else if((pg.px+100)%900<50 || (pg.py+100)%700<50) //BIGGER, apparently
    {
    	c.fillStyle="Red";
    	/*c.fillRect(300,270,80,40);
    	c.fillStyle="Black";*/
    	//c.font = "30px Serif";
    	c.fillText("FAIL!",300,300);
    	clearInterval(activeTask);
    } 
}