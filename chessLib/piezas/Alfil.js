/*Module Dependencies*/
var Pieza = require('./Pieza'),
	Analizer = require('../sec/Analizer');

var Alfil=function(posicion,color){
	var pieza = new Pieza(['1,1','-1,1','1,-1','-1,-1'],posicion,color,'Alfil');
	$.extend(this,pieza)

	this.solido=true;
	this.longMov=8;
	
	if(color=='blanco'){
		this.img='url("imagenes/alfilblanco.png")';
	}else if(color=='negro'){
		this.img='url("imagenes/alfilnegro.png")';	
	}else{
		alert('Error al elejir color');
	}
}

module.exports = Alfil;