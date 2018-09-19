var fun1 = function(){
	createBarChart();
}

var createBarChart = function(){
	createBar();
	createMarker();
	createMiddle();
}

var createRect = function(attributes){
	var rect = document.createElementNS( "http://www.w3.org/2000/svg", "rect" );
	for(attr in attributes){
		rect.setAttribute(attr, attributes[attr]);
	}
    return rect;
}
var createBar = function(){
	var main = document.getElementById( "main" );
	var g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
	g.setAttribute( "class", "bars" );	
	var attributes = {width: "100%", height:25, fill: "#3d5599"};
	var rect = createRect(attributes);
	g.appendChild(rect);    
	main.appendChild( g );
}

var createMarker = function(){
	var main = document.getElementById( "main" );
	var g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
	g.setAttribute( "class", "markers" );
	for(var i = 0; i < 5; i++){
		var att = {fill:'#001f3f', x: i * 25 + '%', y:'0', width:'2', height:'35'};
		var rect = createRect(att);
		g.appendChild(rect);    
	}
	main.appendChild( g );	
}
var createText = function(attributes){
	var text = document.createTextNode("text");
	for(attr in attributes){
		text.setAttribute(attr, attributes[attr]);
	}
    return text;
}
var createMiddle = function(){
	var main = document.getElementById( "main" );
	var g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
	g.setAttribute("text-anchor", "middle");
	var attributes = {"text-anchor":'start', fill:'#0074d9', x:'0', y:'60'};
	var text = createText(attributes);
	g.appendChild(text);
	for(var i = 1; i <= 3; i++){
		var attr = {fill:'#0074d9', x: i * 25 + '%', y:'60'};
		var text = createText(attr);
		text.setInnerText("abc");
		g.appendChild(text);
	}
	
	
	var att = {"text-anchor":'end', fill:'#0074d9', x:'100%', y:'60'};
	var text = createText(attributes);
	g.appendChild(text);
	main.appendChild( g );	
}