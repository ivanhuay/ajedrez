/*Module Dependencies*/
var Pieza = require('./Pieza'),
	Analizer = require('../sec/Analizer'),
	Tablero = require('../sec/Tablero');


var Rey=function(posicion,color,enroque){
	var pieza = new Pieza(['0,1','0,-1','1,0','-1,0','1,1','-1,1','1,-1','-1,-1'],posicion,color,'Reina');
	$.extend(this,pieza)
	//esto es otra forma para hacer el enroque
	this.enroqueMov=['0,3','0,-4'];
	this.piezaEnroque=Array();
	this.solido=true;
	this.longMov=2;
	this.enroque=enroque;
	//esto es para diferenciar las piezas
	this.tipo='Rey';
	if(color=='blanco'){
		this.img='url("imagenes/reyblanco.png")';
		this.enroqueCorto='H,1';
		this.enroqueLargo='A,1';
		this.enroqueLargoPos='C,1';
		this.enroqueCortoPos='G,1';
		this.emptyLargo=['-3,0','-2,0','-1,0'];
		this.emptyCorto=['1,0','2,0'];

	}else if(color=='negro'){
		this.img='url("imagenes/reynegro.png")';
		this.enroqueCorto='H,8';
		this.enroqueLargo='A,8';
		this.enroqueLargoPos='C,8';
		this.enroqueCortoPos='G,8';
		this.emptyLargo=['-1,0','-2,0','-3,0'];
		this.emptyCorto=['1,0','2,0'];
	}else{
		alert('Error al elejir color');
	}
	this.Mover=function(posicion2){
		if(posicion2==this.enroqueLargoPos)
		{
			console.log('enroque largo!');
			
			var pasotorre=this.piezaEnroque[1];
			var posicion=pasotorre.pos.split(',');
			var anterior=Analizer.obtener_casilla(pasotorre.pos);
			var movi=[3,0];
			var x= Analizer.LetraX(parseInt(Analizer.NumX(posicion[0]))+parseInt(movi[0]));
			var y=parseInt(posicion[1])+parseInt(movi[1]);
				//obtengo el index con el x e i
			var lugar=x+','+y;

			$('#cuadrado'+anterior).css('background-image','');
			pasotorre.Mover(lugar);
			
			pasotorre.Dibujar();

		}else if(posicion2==this.enroqueCortoPos)
		{
			console.log('enroque corto!');
			var pasotorre=this.piezaEnroque[0];
			var posicion=pasotorre.pos.split(',');
			var anterior=obtener_casilla(pasotorre.pos);
			var movi=[-2,0];
			var x= Analizer.LetraX(parseInt(Analizer.NumX(posicion[0]))+parseInt(movi[0]));
			var y=parseInt(posicion[1])+parseInt(movi[1]);
				//obtengo el index con el x e i
			var lugar=x+','+y;

			$('#cuadrado'+anterior).css('background-image','');
			pasotorre.Mover(lugar);
			
			pasotorre.Dibujar();
		}else
		{
			console.log('diff:'+posicion2);
		}
		this.pos=posicion2;
		this.Index=Analizer.obtener_casilla(this.pos);
		this.enroque=false;

		
	}
	this.Morir=function(){
		this.estado='muerto';
		this.Index='0';
		this.pos='';
	}
	this.Jaque=function(paramIndex){
		var jaque=false;
		for(var i=0;i<arrayObjetos.length;i++)
		{
			comprovarPosibles(Tablero.arrayObjetos[i]);
		}
		if($('#cuadrado'+paramIndex).attr('rojo')=='true'){
			alert('jaque');
			jaque=true;
		}
		return jaque;

	}	
}

module.exports = Rey;

