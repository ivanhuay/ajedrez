/*Module Dependencies*/
var Analizer = require('../sec/Analizer');
//PIEZA BASE

var Pieza = function (movimientos,posicion,color, tipo){
	this.movposibles=movimientos.length;
	this.mov=movimientos;
	this.pos=posicion;
	this.pospaso="";
	this.estado='vivo';
	this.Index=Analizer.obtener_casilla(this.pos);
	this.color=color;
	this.tipo=tipo;
	this.Dibujar= function(){
		
		$('#cuadrado'+this.Index).css('background-image',this.img);
		
	}
	this.Mover=function(posicion2){
		this.pos=posicion2;
		this.Index=Analizer.obtener_casilla(this.pos);
	}
	this.Morir=function(){
		this.estado='muerto';
		this.Index='0';
		this.pos='';
	}
}

module.exports = Pieza;