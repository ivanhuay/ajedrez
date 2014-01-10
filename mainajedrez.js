//variables globales
//
//contiene una imagen para moverla
var imagen='';
//el index clickeado cuando la imagen esta vacia
var anterior='';
//
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
	this.enroqueMov=['0,3','0,-4'];
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
		this.enroque=false;

		
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

/*
funcion desatada en el click, recibe el index del casillero clickeado y la imagen
de fondo con background-image
*/
function mover(index,entrada){
	//comprueba que la variable imagen este vacia o no
	if(imagen=='' || imagen=='none'){
		//guarda la imagen y el index clickeado
		imagen=entrada;
		anterior=index;
		//si la imagen no esta vacia
		if(imagen!='none'){
			//cargo temp con la pieza clickeada
			temp=comprobarPieza(index);

			comprovarPosibles(temp);
			$('#cuadrado'+anterior).css('background-color','rgba(0,255,0,0.5)');
			
		}
		
	}else if($('#cuadrado'+index).attr('rojo')=='true')
	{
		
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

/*
comprueba que ficha o piesa esta en el casillero clickeado y 
devuleve la ficha clickeada
*/
//comprueba que fichas hay en el index determinado
function comprobarPieza(index){
	var ficha;
	for(var i=0;i<arrayObjetos.length;i++){
		if(index==arrayObjetos[i].Index){ficha=arrayObjetos[i];}
	}
	
	return ficha;
}
//coloreo los movimientos posibles
//recive como parametro lapieza clickeada
function comprovarPosibles(objeto){
	//guardo el color de la ficha
	var color=objeto.color;
	//pongo todos los casilleros en blanco
	$('.casillero').css('background-color','');
	//guardo el numero de movimientos posibles
	var limite= objeto.movposibles;
	//la ubicacion o index del objeto o fucha
	var ubi=objeto.Index;
	//separa la posicion en letra y altura
	var posicion=objeto.pos.split(',');
	
	//inicio un for para cada movimiento de la pieza
	for(var i = 0;i<limite;i++){
		//seaparo los movimientos posibles en x e y
		var movi=objeto.mov[i].split(',');
		var x= LetraX(parseInt(NumX(posicion[0]))+parseInt(movi[0]));
		var y=parseInt(posicion[1])+parseInt(movi[1]);
	
		if(x){
			//separa al peon al inicio
			if(objeto.peon){
				if(i==0||i==3){
					//el movimiento 0 es el de avanzar
					if(i==0){
						//paso x, y ỳ el objeto
						//chequeo si hay alguna ficha del miso color
						//y lo colorea
						chequearSolido(x,y,objeto);
						var h=1;
						var colicion=false;
						//estira el movimiento hasta una colicion o hasta el longmov
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
				}else// si el i es 2 o 1| son los movimientos de ataque
				{
					//obtengo el index con el x e i
					var index=obtener_casillero(x,y);
					//compruebo si existe una pieza en ese index
					pieza=comprobarPieza(index);
					//si hay una piez lo colorea
					if(pieza)
					{

						if (pieza.color==objeto.color){$('#cuadrado'+index).css('background-color','');}
						else{

							
								
								$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
							 	$('#cuadrado'+index).attr('rojo','true');
							
							}
					}else
					{ 
						//si no hay una ficha compruebo para todos los peones
						//si la posicion de paso es igual al index colorea la posicion
						//esto es para el PEON AL PASO
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
			}else if(objeto.solido) //si no es peon y es solido
			{
				//comprueba y colorea las fichas
				chequearSolido(x,y,objeto);
				var h=1;
				var colicion=false;
				//estira el movimiento en caso de ser alfil
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
				//esto es de prueba para el enroque
				if(objeto.enroque==true)
				{
					console.log( 'enroque posible');
					/*
					for(i=0;i<2;i++)
					{
						console.log(objeto.enroqueMov[i]);
					}
					*/
				}

			}
			else//si no hay ninguna pieza 
			{
				//colorea las posiciones de ataque
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
//recibo la posicion x, la "Y" y el objeto
function chequearSolido(x,y,objeto){
	//ejecuto hasta la cantidad de movimientos posibles
	for(var i=0;i<objeto.longMov;i++){
		//obtengo el index del casillero con posicion letra-numero
		var index=obtener_casillero(LetraX(NumX(x)+i),y+i);
		//comprueba si hay una pieza en el index determinado
		pieza=comprobarPieza(index);
		//si la ficha y es del color contrario colorea el cuadrado
		//si la pieza no existe colorea rojo 
		if(pieza){
		if (pieza.color==objeto.color){$('#cuadrado'+index).css('background-color','');}
		else{$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)'); $('#cuadrado'+index).attr('rojo','true');}
		}else{
		$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
		$('#cuadrado'+index).attr('rojo','true');
		}
	}
}
//transformo x a letra
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
//creo los divs que se colorean
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
//obtengo la altura con el index del click como parametro
function obtener_altura(para){
	var altura;
	for(var i=0;i<8;i++){
		if(para >=(1+8*i) && para <=(8+8*i)){altura= 8-i;}
	}
	return altura;
}
//obtengo la letra con el index del click como parametro
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
//con x e y como letra y numero obtengo el index del casillero
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

/*con el index del casillero clickeado obtengo la letra y el numero*/
function obtener_posicion(para){
	var x,y;
	//obtengo la letra con el index
	x=obtener_letra(para);
	//obtengo la altura con el index
	y=obtener_altura(para);
	var resp=x+','+y;
	return resp;
}

function obtener_casilla(pos){
	var partes=pos.split(',');
	var fin=obtener_casillero(partes[0],partes[1]);
	return fin;
}

//dibuja todas las piezas
function graficarFichas(){
	
	for( var i=0; i<arrayObjetos.length;i++){
		arrayObjetos[i].Dibujar();
	}
	
}

//inicio de todo
$(document).on('ready',function(){
	//creo los divs que se colorean
	crear_divs();
	//dibujo todas las piezas
	graficarFichas();

	//click de los casilleros
	$('.casillero').on('click',function(){
		
		//obtengo posiciones del casillero clickeado
		var temp=obtener_posicion($(this).index()+1);

		//carga el casillero clickeado en el cuadro de dialogo
		$('#dialog p').html(temp);
		//abre el cuadro de dialogo
		$( "#dialog" ).dialog();

			mover($(this).index()+1,$(this).css('background-image'));
		



	});


});

