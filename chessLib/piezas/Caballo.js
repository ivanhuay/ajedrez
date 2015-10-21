/*Module Dependencies*/
var Pieza = require('./Pieza'),
	Analizer = require('../sec/Analizer');

var Caballo=function(posicion,color){
	var pieza = new Pieza(['2,1','2,-1','-2,1','-2,-1','1,2','1,-2','-1,2','-1,-2'],posicion,color,"Caballo");
	$.extend(this,pieza)

	if(color=='blanco'){
		this.img='url("imagenes/caballoblanco.png")';
	}else if(color=='negro'){
		this.img='url("imagenes/caballonegro.png")';	
	}else{
		alert('Error al elejir color');
	}
}

module.exports = Caballo;
