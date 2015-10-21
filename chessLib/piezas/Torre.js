/*Module Dependencies*/
var Pieza = require('./Pieza'),
	Analizer = require('../sec/Analizer');

var Torre=function(posicion,color){
	
	var pieza = new Pieza(['0,1','0,-1','1,0','-1,0'],posicion,color,'Torre');
	$.extend(this,pieza)

	//para el enroque
	this.solido=true;
	this.enroque=true;
	this.longMov=8;
	
	if(color=='blanco'){
		this.img='url("imagenes/torreblanca.png")';
	}else if(color=='negro'){
		this.img='url("imagenes/torrenegra.png")';	
	}else{
		alert('Error al elejir color');
	}
	this.Mover=function(posicion2){
		this.pos=posicion2;
		this.Index=Analizer.obtener_casilla(this.pos);
		this.enroque=false;
	}
}
module.exports = Torre;
