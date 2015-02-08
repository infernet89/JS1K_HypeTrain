train=new Object();
train.px=rand(0,750);
train.py=rand(0,550);
train.draw=function () {
	c.save();
	c.translate(this.px,this.py);
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
}
function omino() {
  //every man has 6 colors (can be reduced)
  this.testa=randColor();
  this.corpo=randColor();
  this.gambadx=randColor();
  this.gambasx=randColor();
  this.bracciodx=randColor();
  this.bracciosx=randColor();
  this.px=rand(0,750);
  this.py=rand(0,550);
  this.draw = function () {
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
setInterval(run, 33);
function run()
{
	//draw the background
	c.fillStyle="Silver";
	c.fillRect(0,0,800,600);
	//draw the train
	train.draw();
	//draw the main pg
	protagonista.draw();
	//draw the pollution characters
	passanti.forEach(function(entry) {
    entry.draw();
    //overlay with information
    c.save();
    c.fillStyle="Gray";
    c.fillRect(0,0,400,50);
    c.scale(0.7,0.7);
    c.translate(-protagonista.px+9,-protagonista.py+9);
    protagonista.draw();
    c.restore();
    c.fillStyle="Black";
    c.font = "30px Arial";
    c.fillText("Take me to the train!",40,35);
});
}
//TODO magari fare a meno di queste
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