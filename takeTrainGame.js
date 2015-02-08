function omino() {
  var o=new Object();
  o.sx=(Math.random()*5+2)*Math.pow(-1,Math.ceil(9*Math.random()));
  o.sy=(Math.random()*5+2)*Math.pow(-1,Math.ceil(9*Math.random()));
  //every man has 6 colors (can be reduced)
  o.testa=randColor();
  o.corpo=randColor();
  o.gambadx=randColor();
  o.gambasx=randColor();
  o.bracciodx=randColor();
  o.bracciosx=randColor();
  o.px=Math.random()*750;
  o.py=Math.random()*550;
  //TODO aggiungi 3d-like
  o.draw = function () {
  	//first, we move it
  	if(Kpressed[68] || Kpressed[39]) o.px+=o.sx;
  	if(Kpressed[65] || Kpressed[37]) o.px-=o.sx;
  	if(Kpressed[87] || Kpressed[38]) o.py-=o.sy;
  	if(Kpressed[83] || Kpressed[40]) o.py+=o.sy;

  	//then, we draw
    c.save();
	c.translate(o.px,o.py);
	//body
	c.fillStyle=o.corpo;
	c.fillRect(15,10,15,20);
	//head
	c.fillStyle=o.testa;
	c.beginPath();
	c.arc(22,5,5,0,2*Math.PI);
	c.fill()
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
	c.restore();
	//move it
	train.px-=3;
	if(train.px<-50)
	{
		train.px=800;
		train.py=Math.random()*450+100;
	}
}

pg=omino();
pg.sx/=2;
pg.sy/=2;
var passanti=[];
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
    c.globalAlpha=0.6;
    c.fillStyle="Gray";
    c.fillRect(0,0,330,50);
    c.fillRect(700,0,100,50);
    c.scale(0.7,0.7);
    c.translate(-pg.px+9,-pg.py+9);
    c.globalAlpha=0.9;
    pg.draw();
    c.restore();
    c.fillStyle="Black";
    c.font = "30px Arial";
    c.fillText("Take me to the train!",40,35);
    totaltime+=0.033;
    c.fillText(totaltime.toFixed(1)+"s",710,35);

    //collision check
    if(pg.px>train.px && pg.px<train.px+20 && pg.py>train.py && pg.py<train.py+20)
    {
    	c.fillStyle="Green";
    	c.fillRect(200,200,400,200);
    	c.fillStyle="Black";
    	c.font = "70px Arial";
    	c.fillText("Well done!",240,320);
    	clearInterval(activeTask);
    }
    else if(pg.px>800 || pg.px<-50 || pg.py>600 || pg.py<-50)
    {
    	c.fillStyle="Red";
    	c.fillRect(200,200,400,200);
    	c.fillStyle="Black";
    	c.font = "70px Arial";
    	c.fillText("FAILED!",240,320);
    	clearInterval(activeTask);
    } 
}

//TODO magari fare a meno di queste
function randColor()
{
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}