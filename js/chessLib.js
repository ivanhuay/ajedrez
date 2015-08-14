/*
*==================================
*Declaracion de objetos piezas ====
*==================================
*/
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
			
			var obj=tab.comprobarPieza(postemp);
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
			comprovarPosibles(tab.arrayObjetos[i]);
		}
		if($('#cuadrado'+paramIndex).attr('rojo')=='true'){
			alert('jaque');
			jaque=true;
		}
		return jaque;

	}	
}
/*FIN DE LA DECLARACION DE PIEZAS*/

/*
*==============================================================
*CLASE TABLERO PARA TENER TODAS LAS TAREAS EN UN SOLO OBJETO ==
*==============================================================
*/
var Tablero = function(container){
	//contiene una imagen para moverla
	var imagen='';
	//el index clickeado cuando la imagen esta vacia
	var anterior='';
	//
	var temp,turno;
	this.pgn = {};
	//datos anteriores para crear las fichas
	/* 
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
	var torre3=new Torre('A,1','blanco');
	var torre4=new Torre('H,8','negro')
	var reina1=new Reina('D,1','blanco');
	var rey1=new Rey('E,1','blanco',true);
	var rey2=new Rey('E,8','negro',true);
	this.arrayPeones=[peon1,peon2];

	this.arrayObjetos=[caballo1,caballo2,caballo3,caballo4,alfil1,
	alfil2,alfil3,alfil4,peon1,peon2,torre1,reina1,rey1,torre2,torre3,rey2,torre4];
	*/
	this.arrayPeones=[];
	this.arrayObjetos=[];
	this.contenedor = $(container);

	//CARGO EL EVENTO PARA LAS FICHAS 
	var conflictThis = this;
	$(document).on('click','.casillero',function(){
		
		//obtengo posiciones del casillero clickeado
		var temp=Analizer.obtener_posicion($(this).index()+1);

		//carga el casillero clickeado en el cuadro de dialogo
		$('#dialog p').html(temp);
		//abre el cuadro de dialogo
		$( "#dialog" ).dialog();

			conflictThis.mover($(this).index()+1,$(this).css('background-image'));
	});

	this.crear_divs = function (){

		for( var i=1; i<65;i++){
		this.contenedor.append('<div id="cuadrado'+i+'" class="chessbox casillero"></div>')

		}
		var estilo1={
		 	'height':(600/8)+'px',
		 	'width':(600/8)+'px',
		 	
		 	'display':'inline-block',
		 	'position':'relative',
		 	'background-size':'75px 75px'
		 };
		//$('.casillero').css(estilo1);
	}
	//para graficar las piezas
	this.graficarFichas = function(){
	
		for( var i=0; i<this.arrayObjetos.length;i++){
			if(typeof this.arrayObjetos[i].Dibujar == "undefined"){
				console.log(this.arrayObjetos[i]);
			}else{
				this.arrayObjetos[i].Dibujar();
			}
		}
		
	}
	//funciones para el movimiento dentro de el objeto tablero

	/*
	funcion desatada en el click, recibe el index del casillero clickeado y la imagen
	de fondo con background-image
	*/
	this.mover = function (index,entrada){
		//comprueba que la variable imagen este vacia o no
		if(this.imagen=='' || this.imagen=='none')
		{
			//guarda la this.imagen y el index clickeado
			this.imagen=entrada;
			anterior=index;
			//si la this.imagen no esta vacia
			if(this.imagen!='none'){
				//cargo temp con la pieza clickeada
				temp=this.comprobarPieza(index);

				this.comprovarPosibles(temp);
				$('#cuadrado'+anterior).css('background-color','rgba(0,255,0,0.5)');
				
			}
			
		}else if($('#cuadrado'+index).attr('rojo')=='true')
		{
			
			$('#cuadrado'+anterior).css('background-image','');
			temp2=this.comprobarPieza(index);
			
			if(temp2){
			temp2.Morir();
			}
			temp.Mover(Analizer.obtener_posicion(index));	
			$('.casillero').css('background-color','');
			$('.casillero').attr('rojo','');
			this.imagen='';
			temp.Dibujar();
		}else{
			$('.casillero').css('background-color','');
			$('.casillero').attr('rojo','');
			this.imagen='';
		}
	}

	/*
	comprueba que ficha o piesa esta en el casillero clickeado y 
	devuleve la ficha clickeada
	*/
	//comprueba que fichas hay en el index determinado
	this.comprobarPieza = function (index){
		var ficha;
		for(var i=0;i<this.arrayObjetos.length;i++){
			if(index==this.arrayObjetos[i].Index){ficha=this.arrayObjetos[i];}
		}
		return ficha;
	}
		
	//coloreo los movimientos posibles
	//recive como parametro lapieza clickeada
	this.comprovarPosibles = function (objeto){
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
			var x= Analizer.LetraX(parseInt(Analizer.NumX(posicion[0]))+parseInt(movi[0]));
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
							this.chequearSolido(x,y,objeto);
							var h=1;
							var colicion=false;
							//estira el movimiento hasta una colicion o hasta el longmov
							while(h<objeto.longMov && colicion==false){
									x= Analizer.LetraX(parseInt(Analizer.NumX(posicion[0]))+h*parseInt(movi[0]));
									y=parseInt(posicion[1])+h*parseInt(movi[1]);
									var index=Analizer.obtener_casillero(x,y);
									pieza=this.comprobarPieza(index);
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
					}else{// si el i es 2 o 1| son los movimientos de ataque
						//obtengo el index con el x e i
						var index=Analizer.obtener_casillero(x,y);
						//compruebo si existe una pieza en ese index
						pieza=this.comprobarPieza(index);
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
							for(var k=0;k<this.arrayPeones.length;k++)
							{
								if(index==Analizer.obtener_casilla(this.arrayPeones[k].pospaso))
								{
								$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
								 $('#cuadrado'+index).attr('rojo','true');
								 $('#cuadrado'+index).attr('peonpaso',this.arrayPeones[k].pospaso);
								}
							}
						}

					}
				}else if(objeto.solido){//si no es peon y es solido
					//comprueba y colorea las fichas
					this.chequearSolido(x,y,objeto);
					var h=1;
					var colicion=false;
					//estira el movimiento en caso de ser alfil
					while(h<objeto.longMov && colicion==false){
					
						x= Analizer.LetraX(parseInt(Analizer.NumX(posicion[0]))+h*parseInt(movi[0]));
						y=parseInt(posicion[1])+h*parseInt(movi[1]);
						var index=Analizer.obtener_casillero(x,y);
						pieza=this.comprobarPieza(index);
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
					if(objeto.enroque==true && objeto.tipo=='Rey')
					{
						//console.log( 'enroque posible');
						var enroque=this.enroquePosible(objeto);
						for(var m=0;m<enroque.piezas.length;m++)
						{
							if(enroque.piezas[m])
							{


								var index=enroque.Index[m];
								$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
								$('#cuadrado'+index).attr('rojo','true');
								
								console.log('enroque seudo posible');
							}
						}
							
						
					}

				}else{//si no hay ninguna pieza
					//colorea las posiciones de ataque
					var index=Analizer.obtener_casillero(x,y);
					pieza=this.comprobarPieza(index);
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
	/*
		para el enroque voy crear una funcion que devuelva el objeto torre y comprube
		que no hay piezas intermedias. 
	*/
	//como parametros pasa el rey y todos las fichas no peones son una variable global
	this.enroquePosible = function (rey){
		var retorno=Array(false,false);
		var enroque={};
		enroque.Index=Array();
		for(var i=0;i<this.arrayObjetos.length;i++)
		{
			//devuelve solo una pieza, primero la del enroque corto si esta no esta disponible
			//utiliza el largo
			var posicion=rey.pos.split(',');
			//primero compruebo el enroquecorto
			if(rey.enroqueCorto==this.arrayObjetos[i].pos)
			{
				//para devolver el index en el objeto Json
				var lugares=rey.emptyCorto;
				var pieza=false;
				//uso lugares[1] para el corto
				enroque.cortoPos=lugares[1];
				var paso=enroque.cortoPos.split(',');
				var x= Analizer.LetraX(parseInt(Analizer.NumX(posicion[0]))+parseInt(paso[0]));
				var y=parseInt(posicion[1])+parseInt(paso[1]);

				enroque.Index[0]=Analizer.obtener_casillero(x,y);
				for(var j=0;j<lugares.length;j++)
				{

					var movi=lugares[j].split(',');
					var x= Analizer.LetraX(parseInt(Analizer.NumX(posicion[0]))+parseInt(movi[0]));
					var y=parseInt(posicion[1])+parseInt(movi[1]);
					//obtengo el index con el x e i
					var index=Analizer.obtener_casillero(x,y);
					//compruebo si existe una pieza en ese index
					//uso este pasaje para que no ocurran errores con la variable pieza
					var pasoPieza=this.comprobarPieza(index);
					pieza=(pasoPieza)?pasoPieza:pieza;
				}

				retorno[0]=(this.arrayObjetos[i].enroque && !pieza)? this.arrayObjetos[i]:retorno[0];
				if(this.arrayObjetos[i].enroque && !pieza)
				{
					//var pasopos=this.arrayObjetos[i].pos;
					rey.piezaEnroque[0]=this.arrayObjetos[i];
				}		
			}else if(rey.enroqueLargo==this.arrayObjetos[i].pos)
			{
				var lugares=rey.emptyLargo;
				var pieza=false;

				//para devolver el index en el objeto Json
				//uso 
				enroque.largoPos=lugares[1];
				//console.log('lugares:'+lugares[1]);
				var paso=enroque.largoPos.split(',');
				var x= Analizer.LetraX(parseInt(Analizer.NumX(posicion[0]))+parseInt(paso[0]));
				var y=parseInt(posicion[1])+parseInt(paso[1]);
				enroque.Index[1]=Analizer.obtener_casillero(x,y);

				for(var j=0;j<lugares.length;j++)
				{

					var movi=lugares[j].split(',');
					var x= Analizer.LetraX(parseInt(Analizer.NumX(posicion[0]))+parseInt(movi[0]));
					var y=parseInt(posicion[1])+parseInt(movi[1]);
					//obtengo el index con el x e i
					var index=Analizer.obtener_casillero(x,y);
					//compruebo si existe una pieza en ese index
					var pasoPieza=this.comprobarPieza(index);
					pieza=(pasoPieza)?pasoPieza:pieza;
				}
				retorno[1]=(this.arrayObjetos[i].enroque && !pieza)? this.arrayObjetos[i]:retorno[1];
				if(this.arrayObjetos[i].enroque && !pieza)
				{
					//var pasopos=this.arrayObjetos[i].pos;
					rey.piezaEnroque[1]=this.arrayObjetos[i];
				}	
			}

		}
		//console.log('retorno:'+retorno);
		enroque.piezas=retorno;

		return enroque;
	}
	//recibo la posicion x, la "Y" y el objeto
	this.chequearSolido = function (x,y,objeto){
		//ejecuto hasta la cantidad de movimientos posibles
		for(var i=0;i<objeto.longMov;i++){
			//obtengo el index del casillero con posicion letra-numero
			var index=Analizer.obtener_casillero(Analizer.LetraX(Analizer.NumX(x)+i),y+i);
			//comprueba si hay una pieza en el index determinado
			pieza=this.comprobarPieza(index);
			//si la ficha y es del color contrario colorea el cuadrado
			//si la pieza no existe colorea rojo 
			if(pieza){
				if (pieza.color==objeto.color){
					$('#cuadrado'+index).css('background-color','');
				}else{
					$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)'); 
					$('#cuadrado'+index).attr('rojo','true');
				}
			}else{
				$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
				$('#cuadrado'+index).attr('rojo','true');
			}
		}
	}
	//example usage -> tab.getpgn("http://localhost/ajedrez/pgn.php");
	this.getpgn = function(url){
		var pasothis = this;
		$.ajax({
			url:url,
			success:function(resp){
				console.log("load pgn sucess");
				pasothis.pgn = resp;
				pasothis.readfen(pasothis.pgn.fen);
			},
			error:function(jqHXR,error,status){
				console.log(error);
				console.log(status);

			}
		});
	}
	//function to read and graph fen from pgn
	this.readfen = function(fullfen){
		if( typeof fen == "undefined"){
			fullfen = this.pgn.fen;
		}
		
		fullfen = fullfen.split(" ");
		
		var fen = fullfen[0];

		var filas = fen.split("/");
		console.log(filas);
		var piezaIndex = 1 ; 
		for(var i = 0; i <filas.length ; i++){
			var linea = filas[i];
			for(j = 0 ; j < linea.length; j++){

 				var character = linea[j];
 				
 				if(/[0-9]/.test(linea[j])){
 				
 					piezaIndex+=parseInt(linea[j]);
 				
 				}else{
 				

 					if(/[A-Z]/.test(linea[j])){
 					
 						color = "blanco";
 					
 					}else{
 					
 						color = "negro"
 					
 					}

 					var pos = Analizer.obtener_posicion(piezaIndex);
 					
 					tipo = false;

 					switch(linea[j].toLowerCase()){
 						case 'k'://rey-king
 							tipo = "Rey";
 							break;
 						case 'p'://peon
 							tipo = "Peon"
 							break;
 						case 'q'://reina-queen
 							tipo = "Reina";
 							break;
 						case 'n'://caballo
 							tipo = "Caballo";
 							break;
 						case 'b'://alfil-bishop
 							tipo = "Alfil";
 							break;
 						case 'r'://torre
 							tipo = "Torre";
 							break;
 					}
 					console.log("index: "+piezaIndex+" nueva pieza: "+tipo+" pos --> "+pos );
 					
 					var pieza = new window[tipo](pos,color);
 					
 					if(tipo == "Peon"){
 					
 						this.arrayPeones.push(pieza);
 					
 					}
 					
 					this.arrayObjetos.push(pieza);

 					piezaIndex++;

 				}
 				this.graficarFichas();
			}
		}
	}
}	


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
	this.NumX = function (para){
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
	//obtengo la altura con el index del click como parametro
	this.obtener_altura = function (para){
		var altura;
		for(var i=0;i<8;i++){
			if(para >=(1+8*i) && para <=(8+8*i)){altura= 8-i;}
		}
		return altura;
	}
	//obtengo la letra con el index del click como parametro
	this.obtener_letra = function (para){
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
	this.obtener_casillero = function (x,y){
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
	this.obtener_posicion = function (para){
		var x,y;
		//obtengo la letra con el index
		x=this.obtener_letra(para);
		//obtengo la altura con el index
		y=this.obtener_altura(para);
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


//parte de prueba
var tab;
$(document).on("ready",function (e){
	tab = new Tablero('#contenedor');
	tab.crear_divs();
	tab.graficarFichas();

});