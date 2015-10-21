/*
*==================================================================
*OBJETO PARA ANALIZAR POSICIONES Y DEMAS SITUACIONES DEL JUEGO ====
*==================================================================
*/
var PositionAnalisis = function(){
	//transformo x a letra
	this.LetraX =function (para){
		var letra;
		if(para==1){letra='A';}
		else if(para==2){letra='B';}
		else if(para==3){letra='C';}
		else if(para==4){letra='D';}
		else if(para==5){letra='E';}
		else if(para==6){letra='F';}
		else if(para==7){letra='G';}
		else if(para==8){letra='H';}
		else{
			letra=false;
		}
		return letra;
	}
	this.NumX = function (letra){
		var num;
		if(letra=='A'){num='1';}
		if(letra=='B'){num='2';}
		if(letra=='C'){num='3';}
		if(letra=='D'){num='4';}
		if(letra=='E'){num='5';}
		if(letra=='F'){num='6';}
		if(letra=='G'){num='7';}
		if(letra=='H'){num='8';}
		return num;
	}
	//obtengo la altura con el index del click como parametro
	this.obtener_altura = function (index){
		var altura;
		for(var i=0;i<8;i++){
			if(index >=(1+8*i) && index <=(8+8*i)){altura= 8-i;}
		}
		return altura;
	}
	//obtengo la letra con el index del click como parametro
	this.obtener_letra = function (index){
		var letra;
		for(var i=0;i<8;i++){

			if(((index+i)/8)-parseInt((index+i)/8)==0){

				if(i==7){letra='A';}
				if(i==6){letra='B';}
				if(i==5){letra='C';}
				if(i==4){letra='D';}
				if(i==3){letra='E';}
				if(i==2){letra='F';}
				if(i==1){letra='G';}
				if(i==0){letra='H';}
			}
		}
		return letra;
	}
	//con x e y como letra y numero obtengo el index del casillero
	this.obtener_casillero = function (x,y){
		var paso,resu;	
		paso = this.NumX(x);
		resu=parseInt(paso)+8*(8-y);
		return resu;
	}

	/*con el index del casillero clickeado obtengo la letra y el numero*/
	this.obtener_posicion = function (index){
		var x,y;
		//obtengo la letra con el index
		x=this.obtener_letra(index);
		//obtengo la altura con el index
		y=this.obtener_altura(index);
		var resp=x+','+y;
		return resp;
	}
	//devuelve el index aparentemente
	this.obtener_casilla = function (pos){
		var partes=pos.split(',');
		var fin=this.obtener_casillero(partes[0],partes[1]);
		return fin;
	}
}
Analizer = new PositionAnalisis();

module.exports = Analizer;