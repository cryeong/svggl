# svggl
Svggl is a simple svg drawing library which imitates ActionScript drawing api. 

Sample usage:
```
var svggl = new SVGGL();
svggl.shouldPrint = false;

document.body.appendChild(svggl.svg);

var arrow = svggl.createArrow('triangle');
var arrow2 = svggl.createArrow('triangle2');
arrow2.path.clear();
arrow2.path.moveTo(10,0);
arrow2.path.lineTo(0,5);
arrow2.path.lineTo(10,10);
arrow2.path.close();

var fillColor = '#BDD8F3';
var lineColor = '#908F8F';

svggl.lineStyle(lineColor);


svggl.setFillColor(fillColor);
svggl.drawRect(10,10,150,100,5,5);

svggl.setTextSize('15px');
svggl.setTextColor('blue');
svggl.setTextWeight('bold');
svggl.print(20,40,"Define");

svggl.setTextSize('13px');
svggl.setTextColor('blue');
svggl.setTextWeight('normal');
svggl.print(20,60,"Application");

svggl.setTextSize('13px');
svggl.setTextColor('black');
svggl.print(20,100,"Manager");

svggl.drawImage(110,10, 'images/human.png', '50px','50px');

svggl.moveTo(10,85);
svggl.lineTo(160,85);

svggl.bindArrowEnd('triangle');
  svggl.moveTo(160,60);
  svggl.lineTo(170,60);
svggl.unbindArrowEnd('triangle');



var path = svggl.startPath();
path.moveTo(300,300);
path.lineTo(200,200);
path.lineTo(100,200);
path.curveTo(0,350,300,350);
path.end();
svggl.unbindArrowEnd();

```


