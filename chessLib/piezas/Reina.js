/*Module Dependencies*/
var Pieza = require('./Pieza'),
	Analizer = require('../sec/Analizer');

var Reina=function(posicion,color){
	var pieza = new Pieza(['0,1','0,-1','1,0','-1,0','1,1','-1,1','1,-1','-1,-1'],posicion,color,'Reina');
	$.extend(this,pieza)
	this.solido=true;
	this.longMov=8;
	if(color=='blanco'){
		this.img='url("imagenes/reinablanca.png")';
	}else if(color=='negro'){
		this.img='url("imagenes/reinanegra.png")';	
	}else{
		alert('Error al elejir color');
	}
}

module.exports = Reina;