var palette1 = ["#1866b4","#cc4300","#03734d","#596468", "#945ECF"];
var palette2 = ["#b2d4f5","#fcc3a7","#8fd1bb","#d5dadc", "#945ECF"];

var main = function(){
	var draw = SVG('drawing').size("100%", "100%");
	var data = [{name:"China",value:180},{name:"US",value:60},{name:"Germany",value:45},{name:"India",value:39}];
	BarChart(data, draw);
	var draw2 = SVG('drawing2').size("100%", "100%");
	var data1 = [0.75, 0.74, 0.95];
	DonutChart(data1,draw2, 100, 100, 50);
	var draw3 = SVG('drawing3').size("100%", "100%");
	var data3= [{start:"UVI",end:"",percentage:0.2, value:3.6},{start:"52",end:"89",percentage:0.2, value:"68"},{start:"",end:"",percentage: "", value:"4 Minutes"},{start:"AQI",end:"",percentage:0.3, value:32}];
	
	Clock(data3,draw3);
	//var nested = draw3.nested();
	//var rect = nested.rect(200, 200);
	
	
}

var BarChart = function(data, draw){
	var yStart = 10, xStart = 100, height = 20;
	var sizeX = 800, sizeY = 300;
	//get max value
	var max = 0;
	for(var i=0;i<data.length;i++){
		if(data[i].value > max){
			max = data[i].value;
		}
	}
	//grid
	var count = 5;
	for(var i=0;i<count;i++){
		 draw.line(xStart + i * sizeX / count, yStart - 5, xStart + i * sizeX / count, yStart + height * 1.5 * data.length - 0.5 * height + 5 ).stroke({ color: '#ccc', width: 1 });
		 draw.text((max/count * i).toString()).font({anchor:'middle',size: 12, color:'#ccc'}).move(xStart + i * sizeX / count, yStart + height * 1.5 * data.length - 0.5 * height + 15);
	}
	for(var i=0;i<data.length;i++){
		var width = data[i].value / max * sizeX * 0.8
		draw.rect(width, height).move(xStart, height * i * 1.5 + yStart).fill('rgb(88, 153, 218)').radius(0);
		draw.text(data[i].value.toString()).move(width + xStart + 5, height * i * 1.5 + yStart);
		var text = draw.text(data[i].name.toString()).font({anchor:   'right'});		
		text.move(xStart - 10 -text.length(), height * i * 1.5 + yStart);	
	}
	
	
}

//up to 3 numbers
var DonutChart = function(data, draw, cX, cY, size){
	//path: M: x,y, A: rx,ry 0 0 1/0, L: x, y  z
	//draw.circle(100).fill('#fff').move(20, 20).stroke({ width: 10,color:'#5899DA' })
	//draw.circle(70).fill('#fff').move(20 + 15, 20 + 15).stroke({ width: 10,color:'#5899DA' })
	//var path = draw.path('M131,-59 A144,144 0 0 1 108,95 L54,47 A72,72 0 0,0 65,-29Z')
	//var path = draw.path('M30,0 A30,30 0 0 1 30,60 L30,50 A20,20 0 0,0 30,10Z')
	//var cX = 100, cY=100;	//center
	
	var sX=50,sY=0,r0 = size, r1, r2, w = r0/5, off = r0/4, rad, tX1,tY1, tX2, tY2;
	for(var i = 0; i < data.length; i++){
		var p =  data[i]; //percentage
		r1 = r0 - i * off;
		r2 = r1 - w;
		rad = p * 2 * Math.PI;
		tX1 = Math.sin(rad) * r1 + cX;
		tY1 = cY - Math.cos(rad) * r1 ;
		tX2 = Math.sin(rad) * r2 + cX;
		tY2 = cY - Math.cos(rad) * r2 ;
		var sPath = 'M' + cX +',' + (cY - r1).toString() + " ";
		if(p > 0.5){
			sPath += 'A' + r1 + " " + r1 + " 0 0 1 " + cX + " " + (cY + r1).toString() + " "; 
		}
		sPath += 'A' + r1 + "," + r1 + " 0 0 1 " + tX1 + "," + tY1+ " A 5 5 0 0 1 " + tX2 +',' + tY2;
		if(p > 0.5){
			sPath += 'A' + r2 + " " + r2 + " 0 0 0 " + cX + " " + (cY + r2).toString() + " "; 
		}
		sPath +=  "A" + r2 + " " + r2 + " 0 0, 0 "+ cX + "," + (cY-r2).toString() + " A 5 5 0 0 1 " + cX +',' + (cY - r1).toString();
		//console.log(sPath);
		var path = draw.path(sPath);
		var gradient = draw.gradient('linear', function(stop) {
			  stop.at(0, palette1[i])
			  stop.at(1, palette2[i])
			})
		var radial = draw.gradient('radial', function(stop) {
			stop.at(0, palette1[i])
			stop.at(1, palette2[i])
		})
		path.fill(palette1[i]).stroke({ width: '0px', color: '#ccc', opacity:1})
		//path.fill(gradient).stroke({ width: '0px', color: '#ccc', opacity:1})
	}
	//draw.text(data[0].toString()).font({anchor:'middle'}).move(cX,cY -7);
	
}

var Clock = function(data,draw){		
	var c1 = 12, c2 = 4, l1=5, l2 =3, x1,y1,x2,y2, cX=150,cY=150, rad, p1, p2, r1 =80,r2=70, r0=110;
	draw.rect(r0*2, r0*2).move(cX -r0,cY -r0).fill("#000").stroke({ width: 1, color: '#ccc' }).radius(20);	//background
	//markers
	for(var i=0;i<c1;i++){
		p1 = i / c1;
		rad = p1 * 2 * Math.PI;
		x1 = Math.sin(rad) * r1 + cX;
		y1 =  cY - Math.cos(rad) * r1 ;
		x2 = Math.sin(rad) * r2 + cX;
		y2 = cY - Math.cos(rad) * r2 ;
		draw.line(x1,y1,x2,y2).stroke({ color: '#cc4300', width: 2 });
		for(var j=1;j<c2;j++){
			p2 = p1 + (j / c2) * 1 / c1;			
			rad = p2 * 2 * Math.PI;
			x1 = Math.sin(rad) * (r1 -5) + cX;
			y1 =  cY - Math.cos(rad) * (r1 -5) ;
			x2 = Math.sin(rad) * r2 + cX;
			y2 = cY - Math.cos(rad) * r2 ;
			draw.line(x1,y1,x2,y2).stroke({ color: '#cc4300', width: 1 });
		}
	}
	
	var data1 = [0.75, 0.74, 0.95];
	DonutChart(data1,draw, 115, 150, 20);
	var data1 = [0.97, 0.9, 0.85];
	DonutChart(data1,draw, 190, 150, 20);
	
	//pointers	
	var pointerSecond = draw.line(cX, cY + 20, cX, cY - r1 - 2).stroke({ color: '#cc4300', width: 2 });
	var pointerMinute = draw.line(cX, cY + 15, cX, cY - r1 + 10).stroke({ color: '#fff', width: 4 });	
	var pointerHour = draw.line(cX, cY + 10, cX, cY - r2 +10 ).stroke({ color: '#fff', width: 6 });	
	draw.circle(10).fill("#cc4300").stroke({ color: '#fff', width: 2}).move(cX - 5,cY - 5);
	//set pointers initial status
	var now = new Date();
	pointerSecond.animate(1).rotate(6 * now.getSeconds(), cX, cY);
	pointerMinute.animate(1).rotate(6 * now.getMinutes(), cX, cY);
	pointerHour.animate(1).rotate(360/12 * (now.getHours() % 12), cX, cY);
	
	counterSecond = now.getSeconds();
	setInterval(function(){
		pointerSecond.animate(1).rotate(6 * counterSecond, cX, cY);
		counterSecond++;
	},1000);	
	
	counterMinute = now.getMinutes();
	setInterval(function(){
		pointerMinute.animate(1).rotate(6 * counterMinute, cX, cY);
		counterMinute++;
	},1000*60);
	
	counterHour = now.getHours() % 12;
	setInterval(function(){
		pointerHour.animate(1).rotate(360/12 * counterHour, cX, cY);
		counterHour++;
	},1000*60*60);	
	
	//corner KPI
	for(var i=0;i<=3;i++){
		clockCorner(i, data[i],draw);
	}	
}

var clockCorner = function(position, data, draw){
	var c1 = 12, c2 = 4, l1=5, l2 =3, x1,y1,x2,y2, cX=150,cY=150, rad, p1, p2, r1 =95,r2=85, r0=100, r4=110;
	var rad1, rad2, rad3, rad4, p1, p2, p3;
	var or1 =1, or2=0;
	
	var t = 0.4;								//bar length percentage to 1/4 circle
	p1 = (1-t) / 2 * 0.25 + 0.25 * position; 	//bar start angle
	p2 = p1 + t * 0.25							//bar end angle
	p3 = p1 + (p2-p1) * data.percentage;		//bar value angle
	rad1 = p1 * 2 * Math.PI;
	rad2 = p2 * 2 * Math.PI;
	
	if(position == 1 || position == 2){
		rad3 = rad1;
		rad1 = rad2;
		rad2 = rad3;
		or1 = 0; or2 = 1;
	}
	if(data.percentage){
		
		rad3 = p3 * 2 * Math.PI;
		x1 = Math.sin(rad1) * r1 + cX;
		y1 = cY - Math.cos(rad1) * r1 ;
		x2 = Math.sin(rad2) * r1 + cX;	
		y2 = cY - Math.cos(rad2) * r1 ;
		x3 = Math.sin(rad2) * r2 + cX;
		y3 = cY - Math.cos(rad2) * r2 ;
		x4 = Math.sin(rad1) * r2 + cX;	
		y4 = cY - Math.cos(rad1) * r2 ;
		var sPath = 'M' + x1 +',' + y1 + " ";	
		
		sPath += ' A' + r1 + "," + r1 + " 0 0 " + or1 + " " + x2 + "," + y2+ " A 5 5 0,0," + or1 + x3 + "," + y3;
		sPath +=  " A" + r2 + " " + r2 + " 0 0, " + or2 + " " + x4 + "," + y4 + "A 5 5 0 0  " + or1 + x1 + "," + y1;
		//console.log(sPath);
		var path = draw.path(sPath);
		var gradient = draw.gradient('linear', function(stop) {
			  stop.at(0, palette1[0])
			  stop.at(data.percentage, palette1[1])
			  stop.at(1, palette1[2])
			})	
		//path.fill(palette[i]).stroke({ width: '0px', color: '#ccc', opacity:1})
		path.fill(gradient).stroke({ width: '0px', color: '#ccc', opacity:0.5});
		
		x5 = Math.sin(rad3) * (r1+r2)/2 + cX - (r1-r2-2) /2;
		y5 = cY -  Math.cos(rad3) * (r1+r2)/2 - (r1-r2-2)/2;
		draw.circle(r1-r2-2).fill("transparent").stroke({ width: '2px', color: '#fff', opacity:0.5}).move(x5,y5);		
		
		var text = draw.text(data.start.toString()).font({anchor:'right',size: 12, fill:'#fff'});
		var offX = 0, offY =0;
		switch (position){
			case 0: offX = text.length() * -1; offY = ((r1-r2)/2 + 8) *  -1; break;
			case 1: offX = text.length() * 1.3 * -1 ; offY = ((r1-r2)/2 + 5) *  -1; break;
			case 2: break;
			case 3: offX = (text.length() / 2 ) * -1; offY = (text.length() / 1.1 ) * 1; break;
			default: break;
		}
		sPath = 'M ' + (x1 + offX).toString() +',' + (y1 + offY).toString() + " A" + (r1+r2)/2 + " " + (r1+r2)/2 + " 0 0  " + or1 + " " + x2 + "," + y2;		
		text.path(sPath)
		if(data.end){
			var text = draw.text(data.end.toString()).font({anchor:'right',size: 12, fill:'#fff'});
			switch (position){
				case 0: offX = text.length() * -1; offY = ((r1-r2)/2 + 5) *  -1; break;
				case 1: offX = -8 ; offY = (text.length() / 1.3 ) * -1; break;
				case 2: break;
				case 3: offX = (text.length() / 2 ) * -1; offY = (text.length() / 1.1 ) * 1; break;
				default: break;
			}
			sPath = 'M ' + (x2 + offX).toString() +',' + (y2 + offY).toString() + " A" + (r1+r2)/2 + " " + (r1+r2)/2 + " 0 0  " + or1 + " " + (cX).toString() + "," + (cY-r0).toString();	
			text.path(sPath)
		}		
	}
	if(data.value){
		var text = draw.text(data.value.toString()).font({anchor:'left',size: 16, fill:'#fff'});
		rad4 = (0.125 + position * 0.25) * 2 * Math.PI;
		x1 = Math.sin(rad4) * r4 + cX;
		y1 = cY - Math.cos(rad4) * r4;
		offX =0; offY =0; f = 1
		switch (position){
			case 0: -8; offY = -12; f= -1; break;
			case 1: offX = -12 ; offY= -8;  break;
			case 2: offX = -5; offY= text.length() *0.75 * -1;  f= -1;break;
			case 3: offX = (text.length() / 2 ) * 1.7 * -1;offY= 0; break;
			default: break;
		}
		//text.move(x1+offX, y1+offY);
		sPath = 'M ' + (x1 + offX).toString() +',' + (y1 + offY).toString() + " A" + r4 + " " + r4 + " 0 0  " + or1 + " " + (cX).toString() + "," + (cY-r4 * f).toString();
		text.path(sPath);
		console.log(sPath);
	}
	
}


var test = function(){
	var draw = SVG('drawing').size("100%", "100%");
	//var rect = draw.rect(100, 100).attr({ fill: '#f06' })
	var rect = draw.rect(100, 100).move(10, 20).fill('#f06').radius(10);
	var circle = draw.circle(200).move(100,100).fill("green");
	var path = draw.path('M0 0 H50 A20 20 0 1 0 100 50 v25 C50 125 0 85 0 85 z')
	path.fill('none').move(70, 400)
	path.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' })
	var text = draw.text("line1\nline2").move(0,700)
	var gradient = draw.gradient('linear', function(stop) {
	  stop.at(0, '#333')
	  stop.at(0.5, '#ddd')
	  stop.at(1, '#333')
	}).from(0, 0).to(1, 1)
	
	rect.fill(gradient)
	
	
	
	
	var text = draw.text(function(add) {
		add.tspan( "dragon ------>" )
	})
	
	text.path('M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80')
		.animate(1000, '<>')
		.plot('M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80')
		.loop(true, true)
	
	
	function updateText(textPath) {
		return function() {
			textPath.tspan(this.value)
		}				
	}
	
	var path = draw.path('M0 0 A50 50 0 0 1 50 50 A50 50 0 0 0 100 100')

	path.fill('none').move(20, 20).stroke({ width: 1, color: '#ccc' })

	path.marker('start', 10, 10, function(add) {
	  add.circle(10).fill('#f06')
	})
	path.marker('mid', 10, 10, function(add) {
	  add.rect(5, 10).cx(5).fill('#ccc')
	})
	path.marker('end', 20, 20, function(add) {
	  add.circle(6).center(4, 5)
	  add.circle(6).center(4, 15)
	  add.circle(6).center(12, 10)

	  this.fill('#0f9')
	})
	
}
