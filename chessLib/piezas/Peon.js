/*Module Dependencies*/
var Pieza = require('./Pieza'),
	Analizer = require('../sec/Analizer'),
	Tablero = require('../sec/Tablero');


var Peon=function(posicion,color){
	this.longMov=3;
	this.peon=true;
	if(color=='blanco'){
		this.img='url("imagenes/peonblanco.png")';
		this.mov=['0,1','1,1','-1,1','0,2'];
	}else if(color=='negro'){
		this.img='url("imagenes/peonnegro.png")';
		this.mov=['0,-1','-1,-1','1,-1','0,-2'];	
	}else{
		alert('Error al elejir color');
	}
	var pieza = new Pieza(this.mov,posicion,color,'Peon');
	$.extend(this,pieza)

	this.Mover=function(posicion2){
		if (this.movposibles==4){
			this.intPeon(posicion2);
		}else{
			this.pospaso="";
		}
		this.movposibles=3;
		this.longMov=2;
		this.pos=posicion2;
		this.Index=Analizer.obtener_casilla(this.pos);
		var temporal=$('#cuadrado'+this.Index).attr('peonpaso');
		if( temporal!=undefined){
			
			var temporal2=Analizer.obtener_casilla(temporal);
			var temalt=Analizer.obtener_altura(temporal2);
			var temal2;
			if(temalt==3){temal2=4;}else{temal2=5;}
			var letratemp = Analizer.obtener_letra(temporal2);
			var postemp= Analizer.obtener_casilla(letratemp+","+temal2)
			
			var obj=Tablero.comprobarPieza(postemp);
			$('#cuadrado'+(obj.Index)).css('background-image','');
			obj.Morir();
		}
		
	}
	this.intPeon= function(para){
		var indexp=Analizer.obtener_casilla(para);
		var alturap=Analizer.obtener_altura(indexp);
		var letrap=Analizer.obtener_letra(indexp);
		var alturatemp;
		if(this.color=="blanco"){alturatemp=3}else{
			alturatemp=6;
		}
		if (alturap==4 || alturap==5){
			this.pospaso=letrap+","+alturatemp;
		}
	}
}

module.exports = Peon;
