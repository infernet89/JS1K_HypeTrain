var tmp,tmp1;
train=new Object();
train.px=rand(0,750);
train.py=rand(100,550);
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
		train.py=rand(100,550);	
	}
}
function omino() {
  this.speed=Math.random()*8+2;
  //every man has 6 colors (can be reduced)
  this.testa=randColor();
  this.corpo=randColor();
  this.gambadx=randColor();
  this.gambasx=randColor();
  this.bracciodx=randColor();
  this.bracciosx=randColor();
  this.px=rand(0,750);
  this.py=rand(0,550);
  //TODO aggiungi 3d-like
  this.draw = function () {
  	//first, we move it
  	if(Kpressed[68] || Kpressed[39]) this.px+=this.speed;
  	if(Kpressed[65] || Kpressed[37]) this.px-=this.speed;
  	if(Kpressed[87] || Kpressed[38]) this.py-=this.speed;
  	if(Kpressed[83] || Kpressed[40]) this.py+=this.speed;

  	//then, we draw
    c.save();
	c.translate(this.px,this.py);
	//body
	c.fillStyle=this.corpo;
	c.fillRect(15,10,15,20);
	//head
	c.fillStyle=this.testa;
	c.beginPath();
	c.arc(22,5,5,0,2*Math.PI);
	c.fill()
	//arms
	c.fillStyle=this.bracciosx;
	c.fillRect(10,15,5,10);
	c.fillStyle=this.bracciodx;
	c.fillRect(30,15,5,10);
	//legs (OMG, he skipped leg day)
	c.fillStyle=this.gambasx;
	c.fillRect(15,28,5,15);
	c.fillStyle=this.gambadx;
	c.fillRect(25,28,5,15);

	c.restore();
  }
}
protagonista=new omino();
protagonista.speed/=2;
var passanti=[];
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());
passanti.push(new omino());

passanti.push(protagonista);
passanti.push(train);
setInterval(run, 33);

//keyboard controls
var Kpressed=[];
window.addEventListener('keydown',keyDown,false);
window.addEventListener('keyup',keyUp,false);
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
    c.scale(0.7,0.7);
    c.translate(-protagonista.px+9,-protagonista.py+9);
    c.globalAlpha=0.9;
    protagonista.draw();
    c.restore();
    c.fillStyle="Black";
    c.font = "30px Arial";
    c.fillText("Take me to the train!",40,35);

    if(protagonista.px>train.px && protagonista.px<train.px+20 && protagonista.py>train.py && protagonista.py<train.py+20)
    {
    	c.fillStyle="Green";
    	c.fillRect(200,200,400,200);
    	c.fillStyle="Black";
    	c.font = "70px Arial";
    	c.fillText("Well done!",240,320);
    }
}
//TODO magari fare a meno di queste
function keyDown(e) {
	Kpressed[e.keyCode]=true;
	//alert(e.keyCode);
}
function keyUp(e) {
	Kpressed[e.keyCode]=false;
}
function randColor()
{
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}
function rand(da, a)
{
    if(da>a) return rand(a,da);
    a=a+1;
    return Math.floor(Math.random()*(a-da)+da);
}