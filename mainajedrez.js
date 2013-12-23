//variables globales
var imagen='';
var anterior='';
var temp,turno;



//objetos globales
var Caballo=function(posicion,color){
	this.movposibles=8;
	this.mov=['2,1','2,-1','-2,1','-2,-1','1,2','1,-2','-1,2','-1,-2'];
	this.pos=posicion;
	this.pospaso="";
	this.estado='vivo';
	this.Index=obtener_casilla(this.pos);
	this.color=color;
	if(color=='blanco'){
		this.img='url("imagenes/caballoblanco.png")';
	}else if(color=='negro'){
		this.img='url("imagenes/caballonegro.png")';	
	}else{
		alert('Error al elejir color');
	}

	this.Dibujar= function(){
		
		$('#cuadrado'+this.Index).css('background-image',this.img);
		
	}
	this.Mover=function(posicion2){
		this.pos=posicion2;
		this.Index=obtener_casilla(this.pos);
		rey1.Jaque();
		
	}
	this.Morir=function(){
		this.estado='muerto';
		this.Index='0';
		this.pos='';
	}
}
var Alfil=function(posicion,color){
	this.movposibles=4;
	this.mov=['1,1','-1,1','1,-1','-1,-1'];
	this.pos=posicion;
	this.pospaso="";
	this.estado='vivo';
	this.solido=true;
	this.longMov=8;
	this.Index=obtener_casilla(this.pos);
	this.color=color;
	if(color=='blanco'){
		this.img='url("imagenes/alfilblanco.png")';
	}else if(color=='negro'){
		this.img='url("imagenes/alfilnegro.png")';	
	}else{
		alert('Error al elejir color');
	}

	this.Dibujar= function(){
		
		$('#cuadrado'+this.Index).css('background-image',this.img);
		
	}
	this.Mover=function(posicion2){
		this.pos=posicion2;
		this.Index=obtener_casilla(this.pos);
		rey1.Jaque();
		
	}
	this.Morir=function(){
		this.estado='muerto';
		this.Index='0';
		this.pos='';
	}
}
var Peon=function(posicion,color){
	this.movposibles=4;
	
	this.pos=posicion;
	this.pospaso="";
	this.longMov=3;
	this.estado='vivo';
	this.peon=true;
	this.Index=obtener_casilla(this.pos);
	this.color=color;
	if(color=='blanco'){
		this.img='url("imagenes/peonblanco.png")';
		this.mov=['0,1','1,1','-1,1','0,2'];
	}else if(color=='negro'){
		this.img='url("imagenes/peonnegro.png")';
		this.mov=['0,-1','-1,-1','1,-1','0,-2'];	
	}else{
		alert('Error al elejir color');
	}

	this.Dibujar= function(){
		
		$('#cuadrado'+this.Index).css('background-image',this.img);
		
	}
	this.Mover=function(posicion2){
		if (this.movposibles==4){
			this.intPeon(posicion2);
		}else{
			this.pospaso="";
		}
		
		this.movposibles=3;
		this.longMov=2;
		this.pos=posicion2;
		this.Index=obtener_casilla(this.pos);
		var temporal=$('#cuadrado'+this.Index).attr('peonpaso');
		if( temporal!=undefined){
			
			var temporal2=obtener_casilla(temporal);
			var temalt=obtener_altura(temporal2);
			var temal2;
			if(temalt==3){temal2=4;}else{temal2=5;}
			var letratemp =obtener_letra(temporal2);
			var postemp= obtener_casilla(letratemp+","+temal2)
			
			var obj=comprobarPieza(postemp);
			$('#cuadrado'+(obj.Index)).css('background-image','');
			obj.Morir();
			
			
		}
		
	}
	this.Morir=function(){
		this.estado='muerto';
		this.Index='0';
		this.pos='';
	}
	 this.intPeon= function(para){
		var indexp=obtener_casilla(para);
		var alturap=obtener_altura(indexp);
		var letrap=obtener_letra(indexp);
		var alturatemp;
		if(this.color=="blanco"){alturatemp=3}else{
			alturatemp=6;
		}
		if (alturap==4 || alturap==5){
			this.pospaso=letrap+","+alturatemp;
			
		}
	}
}
var Torre=function(posicion,color){
	this.movposibles=4;
	this.mov=['0,1','0,-1','1,0','-1,0',];
	this.pos=posicion;
	this.estado='vivo';
	this.pospaso="";
	this.solido=true;
	this.longMov=8;
	this.Index=obtener_casilla(this.pos);
	this.color=color;
	if(color=='blanco'){
		this.img='url("imagenes/torreblanca.png")';
	}else if(color=='negro'){
		this.img='url("imagenes/torrenegra.png")';	
	}else{
		alert('Error al elejir color');
	}

	this.Dibujar= function(){
		
		$('#cuadrado'+this.Index).css('background-image',this.img);
		
	}
	this.Mover=function(posicion2){
		this.pos=posicion2;
		this.Index=obtener_casilla(this.pos);

		rey1.Jaque();
		
	}
	this.Morir=function(){
		this.estado='muerto';
		this.Index='0';
		this.pos='';
	}
}
var Reina=function(posicion,color){
	this.movposibles=8;
	this.mov=['0,1','0,-1','1,0','-1,0','1,1','-1,1','1,-1','-1,-1'];
	this.pos=posicion;
	this.estado='vivo';
	this.pospaso="";
	this.solido=true;
	this.longMov=8;
	this.Index=obtener_casilla(this.pos);
	this.color=color;
	if(color=='blanco'){
		this.img='url("imagenes/reinablanca.png")';
	}else if(color=='negro'){
		this.img='url("imagenes/reinanegra.png")';	
	}else{
		alert('Error al elejir color');
	}

	this.Dibujar= function(){
		
		$('#cuadrado'+this.Index).css('background-image',this.img);
		
	}
	this.Mover=function(posicion2){
		this.pos=posicion2;
		this.Index=obtener_casilla(this.pos);

		
	}
	this.Morir=function(){
		this.estado='muerto';
		this.Index='0';
		this.pos='';
	}
}
var Rey=function(posicion,color,enroque){
	this.movposibles=8;
	this.mov=['0,1','0,-1','1,0','-1,0','1,1','-1,1','1,-1','-1,-1'];
	this.pos=posicion;
	this.estado='vivo';
	this.pospaso="";
	this.solido=true;
	this.longMov=2;
	this.Index=obtener_casilla(this.pos);
	this.color=color;
	this.enroque=enroque;
	if(color=='blanco'){
		this.img='url("imagenes/reyblanco.png")';
	}else if(color=='negro'){
		this.img='url("imagenes/reynegro.png")';	
	}else{
		alert('Error al elejir color');
	}

	this.Dibujar= function(){
		
		$('#cuadrado'+this.Index).css('background-image',this.img);
		
	}
	this.Mover=function(posicion2){
		this.pos=posicion2;
		this.Index=obtener_casilla(this.pos);


		
	}
	this.Morir=function(){
		this.estado='muerto';
		this.Index='0';
		this.pos='';
	}
	this.Jaque=function(){
		for(var i=0;i<arrayObjetos.length;i++)
		{
			comprovarPosibles(arrayObjetos[i]);
		}
		if($('#cuadrado'+this.Index).attr('rojo')=='true'){
			alert('jaque');
		}
	}	
}
//creo los caballos
var caballo3=new Caballo('B,8','negro');
var caballo4=new Caballo('G,8','negro');
var caballo1=new Caballo('B,1','blanco');
var caballo2=new Caballo('G,1','blanco');
var alfil1=new Alfil('C,1','blanco');
var alfil2=new Alfil('F,1','blanco');
var alfil3=new Alfil('C,8','negro');
var alfil4=new Alfil('F,8','negro');
var peon1=new Peon('C,2','blanco');
var peon2=new Peon('D,7','negro');
var torre1=new Torre('A,8','negro');
var torre2=new Torre('H,1','blanco');

var reina1=new Reina('D,1','blanco');
var rey1=new Rey('E,1','blanco',true);

var arrayPeones=[peon1,peon2];
var arrayObjetos=[caballo1,caballo2,caballo3,caballo4,alfil1,
alfil2,alfil3,alfil4,peon1,peon2,torre1,reina1,rey1,torre2];

function mover(index,entrada){

	if(imagen=='' || imagen=='none'){
		imagen=entrada;
		anterior=index;
		if(imagen!='none'){
			temp=comprobarPieza(index);
			comprovarPosibles(temp);
			$('#cuadrado'+anterior).css('background-color','rgba(0,255,0,0.5)');
			
		}
		
	}else if($('#cuadrado'+index).attr('rojo')=='true'){
		
		$('#cuadrado'+anterior).css('background-image','');
		temp2=comprobarPieza(index);
		//aca tengo q introducir la diferenciacion para los pones 
		if(temp2){
		temp2.Morir();
		}
		temp.Mover(obtener_posicion(index));	
		$('.casillero').css('background-color','');
		$('.casillero').attr('rojo','');
		imagen='';
		temp.Dibujar();
	}else{
		$('.casillero').css('background-color','');
		$('.casillero').attr('rojo','');
		imagen='';
	}
}

//funcion para comprobar que ficha se clickea
function comprobarPieza(index){
	var ficha;
	for(var i=0;i<arrayObjetos.length;i++){
		if(index==arrayObjetos[i].Index){ficha=arrayObjetos[i];}
	}
	
	return ficha;
}
//coloreo los movimientos posibles
function comprovarPosibles(objeto){
	var color=objeto.color;
	$('.casillero').css('background-color','');
	var limite= objeto.movposibles;
	var ubi=objeto.Index;
	var posicion=objeto.pos.split(',');
	

	for(var i = 0;i<limite;i++){
		var movi=objeto.mov[i].split(',');
		var x= LetraX(parseInt(NumX(posicion[0]))+parseInt(movi[0]));
		var y=parseInt(posicion[1])+parseInt(movi[1]);
	
		if(x){
			if(objeto.peon){
				if(i==0||i==3){
					if(i==0){
						chequearSolido(x,y,objeto);
				var h=1;
				var colicion=false;
				while(h<objeto.longMov && colicion==false){
				
					x= LetraX(parseInt(NumX(posicion[0]))+h*parseInt(movi[0]));
					y=parseInt(posicion[1])+h*parseInt(movi[1]);
					var index=obtener_casillero(x,y);
					pieza=comprobarPieza(index);
					if(pieza){

					colicion=true;	
					$('#cuadrado'+index).css('background-color','');
					
					}else{
					$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
					$('#cuadrado'+index).attr('rojo','true');
					
					}
					h++;
				}
					}
				}else{
					var index=obtener_casillero(x,y);
					pieza=comprobarPieza(index);
					if(pieza)
					{

						if (pieza.color==objeto.color){$('#cuadrado'+index).css('background-color','');}
						else{

							
								
								$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
							 	$('#cuadrado'+index).attr('rojo','true');
							
							}
					}else
					{ 
						
						for(var k=0;k<arrayPeones.length;k++)
						{
							if(index==obtener_casilla(arrayPeones[k].pospaso))
							{
							$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
							 $('#cuadrado'+index).attr('rojo','true');
							 $('#cuadrado'+index).attr('peonpaso',arrayPeones[k].pospaso);
							}
						}
					}

				}
			}else if(objeto.solido){
				chequearSolido(x,y,objeto);
				var h=1;
				var colicion=false;
				while(h<objeto.longMov && colicion==false){
				
					x= LetraX(parseInt(NumX(posicion[0]))+h*parseInt(movi[0]));
					y=parseInt(posicion[1])+h*parseInt(movi[1]);
					var index=obtener_casillero(x,y);
					pieza=comprobarPieza(index);
					if(pieza){
					colicion=true;	
					if (pieza.color==objeto.color){$('#cuadrado'+index).css('background-color','');}
					else{$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)'); $('#cuadrado'+index).attr('rojo','true');}
					}else{
					$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
					$('#cuadrado'+index).attr('rojo','true');
					}
					h++;
				}

			}
			else{
				var index=obtener_casillero(x,y);
				pieza=comprobarPieza(index);
				if(pieza){
				if (pieza.color==objeto.color){$('#cuadrado'+index).css('background-color','');}
				else{$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)'); $('#cuadrado'+index).attr('rojo','true');}
				}else{
				$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
				$('#cuadrado'+index).attr('rojo','true');
				}
			}
		}
	}
	
}
function chequearSolido(x,y,objeto){
	for(var i=0;i<objeto.longMov;i++){
		var index=obtener_casillero(LetraX(NumX(x)+i),y+i);
		pieza=comprobarPieza(index);
		if(pieza){
		if (pieza.color==objeto.color){$('#cuadrado'+index).css('background-color','');}
		else{$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)'); $('#cuadrado'+index).attr('rojo','true');}
		}else{
		$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
		$('#cuadrado'+index).attr('rojo','true');
		}
	}
}
function LetraX(para){
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
function NumX(para){
	var num;
	if(para=='A'){num='1';}
	if(para=='B'){num='2';}
	if(para=='C'){num='3';}
	if(para=='D'){num='4';}
	if(para=='E'){num='5';}
	if(para=='F'){num='6';}
	if(para=='G'){num='7';}
	if(para=='H'){num='8';}
	return num;
}
function crear_divs(){

	for( var i=1; i<65;i++){
	$('#contenedor').append('<div id="cuadrado'+i+'" class="casillero"></div>')

	}
	 var estilo1={
	 	'height':(600/8)+'px',
	 	'width':(600/8)+'px',
	 	
	 	'display':'inline-block',
	 	'position':'relative',
	 	'background-size':'75px 75px'
	 };
	$('.casillero').css(estilo1);

}

function obtener_altura(para){
	var altura;
	for(var i=0;i<8;i++){
		if(para >=(1+8*i) && para <=(8+8*i)){altura= 8-i;}
	}
	return altura;
}
function obtener_letra(para){
	var letra;
	for(var i=0;i<8;i++){

		if(((para+i)/8)-parseInt((para+i)/8)==0){

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
function obtener_casillero(x,y){
	var paso,resu;
	if(x=='A'){paso='1';}
	if(x=='B'){paso='2';}
	if(x=='C'){paso='3';}
	if(x=='D'){paso='4';}
	if(x=='E'){paso='5';}
	if(x=='F'){paso='6';}
	if(x=='G'){paso='7';}
	if(x=='H'){paso='8';}
	resu=parseInt(paso)+8*(8-y);
	return resu;
}
function obtener_posicion(para){
	var x,y;
	x=obtener_letra(para);
	y=obtener_altura(para);
	var resp=x+','+y;
	return resp;
}

function obtener_casilla(pos){
	var partes=pos.split(',');
	var fin=obtener_casillero(partes[0],partes[1]);
	return fin;
}

function graficarFichas(){
	
	for( var i=0; i<arrayObjetos.length;i++){
		arrayObjetos[i].Dibujar();
	}
	
}

$(document).on('ready',function(){
crear_divs();
graficarFichas();

	$('.casillero').on('click',function(){
		
		var temp=obtener_posicion($(this).index()+1);

		$('#dialog p').html(temp);
		$( "#dialog" ).dialog();

			mover($(this).index()+1,$(this).css('background-image'));
		



	});


});

