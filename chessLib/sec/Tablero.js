/*Module Dependencies*/
var Pieza = require('../piezas/Pieza'),
	Caballo = require('../piezas/Caballo'),
	Peon = require('../piezas/Peon'),
	Reina = require('../piezas/Reina'),
	Rey = require('../piezas/Rey'),
	Torre = require('../piezas/Torre'),
	Analizer = require('./Analizer');


/*
*==============================================================
*CLASE TABLERO PARA TENER TODAS LAS TAREAS EN UN SOLO OBJETO ==
*==============================================================
*/
var Tablero = function(){
	//variables
	//contiene una imagen para moverla
	var imagen='';
	//el index clickeado cuando la imagen esta vacia
	var anterior='';
	//
	var temp;

	this.turno;//save turn
	
	this.pgn = {};
	
	this.procesPgn = {};

	//para leer la partida ya procesada en fen
	this.allFen = [];
	this.currentFenIndex = 0;

	this.arrayPeones=[];
	this.arrayObjetos=[];
	this.contenedor;

	//para analisar todo solo en abstracto
	this.tablero = [];
	//for test
	for(var i = 1; i < 65 ; i++){	
		
	}

	this.init = function(container){
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

	}

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
	//TODO:no me queda claro que hace esta funcion, estaria faltando una mejor aclaracion comentada
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
	//devuelvo array con todas las posiciones posibles en texto
	this.comprovarPosibles = function (objeto){
		
		var arrayPosiblesTexto = [];//para cargar los movimientos en texto

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
									arrayPosiblesTexto.push(x+y);
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
							if (pieza.color==objeto.color){
								$('#cuadrado'+index).css('background-color','');
							}else{	
								arrayPosiblesTexto.push(x+y);
								console.log("Pieza especifica: "+x+y);
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
									arrayPosiblesTexto.push(x+y);

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
						
						//arrayPosiblesTexto.push(x+y);

						var index=Analizer.obtener_casillero(x,y);
						pieza=this.comprobarPieza(index);
						if(index && index>=1 && index <= 64){
							//arrayPosiblesTexto.push(index);
							if(pieza){
								colicion=true;	
								if (pieza.color==objeto.color){
									$('#cuadrado'+index).css('background-color','');
								}else{
									arrayPosiblesTexto.push(x+y);
									$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
									$('#cuadrado'+index).attr('rojo','true');
								}
							}else{
								arrayPosiblesTexto.push(x+y);
								$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
								$('#cuadrado'+index).attr('rojo','true');
							}
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
					//arrayPosiblesTexto.push(x+y);
					var index=Analizer.obtener_casillero(x,y);
					pieza=this.comprobarPieza(index);
					arrayPosiblesTexto.push(x+y);
					if(pieza){
						if (pieza.color==objeto.color){
							$('#cuadrado'+index).css('background-color','');
						}else{
							$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)'); $('#cuadrado'+index).attr('rojo','true');
						}
					}else{

						$('#cuadrado'+index).css('background-color','rgba(255,0,0,0.5)');
						$('#cuadrado'+index).attr('rojo','true');
					}
				}
			}
		}
		return arrayPosiblesTexto;
		
	}
	//TODO:comprobarposibles 2, para comprobar solo en analisis y mejorar la 1
	this.comprobarposibles2 = function(){

	},
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
	//estiro una posicion para alargar el movimiento por ejemplo para un alfil
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
				pasothis.readPgnMoves(pasothis.pgn.pgn);
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
		console.log(fullfen);
		//cargo turno
		var turno = fullfen[1];
		if(turno == "w"){
			this.turno = "w";
		}else{
			this.turno = "b";//revisar si es lo correcto
		}

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
 					
 						color = "negro";
 					
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
	},
	//TODO: funcion para procesar todos los datos a fen, primero uso la cadena principal luego lo voy a hacer con las variantes
	this.processToFen = function(){

		var allFen = [this.takeFen()],
			controlVar = true,
			thisPaso = this;

		for(var i = 0; i<10 ; i++){

			setTimeout(function(){
				
				controlVar = thisPaso.nextPgnMove();

				var fenLine = thisPaso.takeFen();
				
				allFen.push(fenLine);
				
				console.log("procesando...");

			},500);
		
		}
		
		console.log("finish----------------");

		this.allFen = allFen;

		this.readfen(this.allFen[0]);//cargo la posicion inicial

		return allFen;
	},
	this.nextMove = function(){
		if(this.currentFenIndex < this.allFen.length){
			this.currentFenIndex++;
			this.readfen(this.allFen[this.currentFenIndex]);
		}
	},
	this.prevMove = function(){
		if(this.currentFenIndex > 0){
			this.currentFenIndex--;
			this.readfen(this.allFen[this.currentFenIndex]);
		}	
	},
	this.takeFen = function(){
		
		var lines = [];
		
		for(var i = 0; i < 8 ; i++){
			
			var fenText = "",
				contFila = 0;

			for(var j = 1; j<9; j++){
				
				var index = i*8 + j,
					pieza = this.comprobarPieza(index);
					
				if(!pieza){
					contFila++
				}else{
					
					if(contFila!=0){
						fenText += contFila.toString();
						contFila = 0;
					}

					fenText += this.piezaTipoToFen(pieza.tipo);
				}
			}

			if(contFila!=0) fenText += contFila.toString();

			lines[i] = fenText;

		}
		return lines.join('/');
	},
	this.piezaTipoToFen = function(tipo){
		var letra = false;
		switch(tipo){
			case 'Rey'://rey-king
				letra = 'k';
				break;
			case 'Peon'://peon
				letra = 'p';
				break;
			case 'Reina'://reina-queen
				letra = 'q';
				break;
			case 'Caballo'://caballo
				letra = 'n';
				break;
			case 'Alfil'://alfil-bishop
				letra = 'b';
				break;
			case 'Torre'://torre
				letra = "r";
				break;
		}
		return letra;
	},
	this.readPgnMoves = function(onlypgn){
		
		//TODO: mapear pgn
		//guardar comentarios y reemplazar en la cadena por un item
		//guardar variaciones y reemplazar en la cadena por un item
		//identificar los movimientos y reepresantarlos ordenadamente
		
		var orderPgn = onlypgn; //guardo la cadena para modificarla despues

		var comentarios = onlypgn.match(/\{.*?\}/g);//guardo los comentarios
		//remplazo comentarios
		for(var i = 0 ; i < comentarios.length ; i ++){
			orderPgn = orderPgn.replace(comentarios[i],"_ca_"+i);
		}

		//var variaciones = orderPgn.match(/\(.*?\)/g);//guardo variaciones
		var variaciones = orderPgn.match(/(\([^()]*)*(\s*\([^()]*\)\s*)+([^()]*\))*/g);
		for( var m = 0; m < variaciones.length ; m++){
			variaciones[m] = variaciones[m].trim();
		}
		console.log("variaciones");
		console.log(variaciones[4]);
		//TODO: algunas variaciones son tomadas mal		
		//remplazo variaciones
		for(var i = 0 ; i < variaciones.length ; i ++){
			orderPgn = orderPgn.replace(variaciones[i],"_va_"+i);
		}
		var arrayOrderPgn = orderPgn.split(" ");
		
		var resultado = arrayOrderPgn[arrayOrderPgn.length-1];
		console.log("RESULTADO: "+resultado);
		
		if(!/[a-z]|[A-Z]/.test(resultado) ){
			resultado = arrayOrderPgn[arrayOrderPgn.length-1];
			arrayOrderPgn.splice(arrayOrderPgn.length-1,1);
		}


		console.log(arrayOrderPgn);
		
		this.procesPgn = {
			orderPgn : arrayOrderPgn,
			comentarios: comentarios,
			variaciones:variaciones,
			result: resultado,
			indexMove : -1
		}
	}
	this.nextPgnMove = function(){
		this.procesPgn.indexMove++;
		console.log(this.procesPgn.indexMove+" from testPgn "+this.procesPgn.orderPgn.length);
		console.log("Move detail:"+this.procesPgn.orderPgn[this.procesPgn.indexMove])
		while(this.procesPgn.indexMove < this.procesPgn.orderPgn.length && this.testPgnMove(this.procesPgn.orderPgn[this.procesPgn.indexMove]) == false){
			this.procesPgn.indexMove++;
		}
		if(this.procesPgn.indexMove >= this.procesPgn.orderPgn.length){
			console.log("Fin de los movimientos");
			return 0;
		}

		var indexMove = this.procesPgn.indexMove;
		var move = 	this.procesPgn.orderPgn[indexMove];

		console.log(move);
		console.log(indexMove+" from :"+this.procesPgn.orderPgn.length);
		//compruebo si es mayucula para definir el color
		var color,casilla,numero,pieza;

		//color definido por el turno
		
		if(this.turno == "w"){
			color = "blanco";
			this.turno = "b";
		}else{
			color = "negro";
			this.turno = "w";
		}

		pieza = move[0];
		
		var casillaIndex = 1;
		
		if(!/[A-Z]/.test(pieza)){
			casillaIndex = 0;
			if(move[casillaIndex+1]=="x")casillaIndex++;//una solucion parcial para el problema con el f o g para los peones
			pieza = "P";
		}

		//para los de comer
		if(move[casillaIndex]=="x")casillaIndex++;

		if(/[a-h]/.test(move[casillaIndex])){
			casilla = move[casillaIndex].toUpperCase();
		}else{
			$.error("Error al identificar casilla: "+move[casillaIndex]+" move: "+move);
		}

		if(1<=move[casillaIndex+1]<=8){
			numero = move[casillaIndex+1];
		}else{
			$.error("Error al identificar casilla: "+move[casillaIndex+1]);	
		}
		var tipoPieza;
		switch(pieza){
			case "Q":
				tipoPieza = "Reina";
			break;
			case "K":
				tipoPieza = "Rey";
			break;
			case "R":
				tipoPieza = "Torre";
			break;
			case "B":
				tipoPieza = "Alfil";
			break;
			case "N":
				tipoPieza = "Caballo";
			break;
			case "P":
				tipoPieza = "Peon";
			break;
			case "all":
				tipoPieza = "all";
			break;
			default:

				$.error("Error al obtener pieza.");
			break;
		}
		console.log(tipoPieza+" color:"+color);
		var graficado  = false;//bandera
		for( var j = 0; j < this.arrayObjetos.length; j++){
			var piezaObj = this.arrayObjetos[j];
			if(!graficado && piezaObj.color== color && (piezaObj.tipo == tipoPieza || tipoPieza=="all")){
				var posibles = this.comprovarPosibles(piezaObj);
				console.log(posibles);
				for(var i in posibles){
					if(posibles[i] == casilla+numero){
						
						var index=Analizer.obtener_casillero(casilla,numero);
						
						piezaPaso=this.comprobarPieza(index);
						
						if(piezaPaso)piezaPaso.Morir();
						
						$('#cuadrado'+piezaObj.Index).css('background-image',"");
						
						piezaObj.Mover(casilla+","+numero);
						
						piezaObj.Dibujar();
						
						$('.casillero').css('background-color','');
						
						$('.casillero').attr('rojo','');
						
						//mejorar movimientos
						graficado = true;
						break;
					}
				}
			}
		}
		
	}
	this.testPgnMove = function(moveText){
		console.log("inside move: "+moveText);

		if(moveText.match(/\d+\./g)!= null){
			return false;
		}
		if(moveText.match(/_ca_\d+/)!=null){
			return false;
		}
		if(moveText.match(/_va_\d+/)!=null){
			return false;
		}
		if(moveText[0] == "$"){
			return false;
		}
		return true;
	}
}	

module.exports = new Tablero();